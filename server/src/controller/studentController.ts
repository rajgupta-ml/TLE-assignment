import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/apiError";
import { DbErrorCodes, DbErrorMessages, GenericMessage } from "../constants/error.constants";
import { HttpStatusCode } from "../constants/httpStatusCode.constants";
import type { IStudent } from "../model/student"; // Assuming you have a student model defined
import type DbService from "../service/dbService";
import mongoose, { Mongoose, MongooseError, type PipelineStage, type SortOrder , type ValidateFn, isValidObjectId } from "mongoose";
import { DbError } from "../error/dbError";
import type { IStudentAnalyticsDocument } from "../model/studentAnalystics";
import type { StatsService } from "../service/statsService";
import type { CodeforcesSubmission, IContestData, studentAnalytics } from "../types/analytics";
import { handleError } from "../error/handleError";


interface IUserMetricsResult {
    userId : mongoose.Types.ObjectId;
    number : number;
}

interface IAggregatedResult {
    highestRatingUser : IUserMetricsResult[]
    bestImprovementUser : IUserMetricsResult[]
    highestConsistencyUser : IUserMetricsResult[]

}


interface IHighestAchiever {
    key : string;
    userName : string;
    _id : string;
    number : number
}

export class StudentController { 

    constructor (private studentModel : DbService<IStudent>, private statModel : DbService<IStudentAnalyticsDocument>, private statsService : StatsService) {
        this.studentModel = studentModel
        this.statModel = statModel
        this.statsService = statsService
    }


    
    getStudents = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { page, limit, sort, ...filter } = req.query; // Extract page, limit, sort, and remaining as filter
            const pageNum = parseInt(page as string) || 1;
            const limitNum = parseInt(limit as string) || 10;

            let sortOptions: Record<string, SortOrder> = {};
            if (sort && typeof sort === 'string') {
                const [field, order] = sort.split('_');
                if (field && order) {
                    sortOptions[field] = (order === 'desc' ? -1 : 1);
                }
            } else {
                sortOptions = { createdAt: -1 };
            }


            const queryFilter: Record<string, any> = filter as Record<string, any>;


            const paginatedStudents = await this.studentModel.getAll(
                queryFilter,
                {}, // projection (empty for all fields)
                pageNum,
                limitNum,
                sortOptions
            );

            const studentIds = paginatedStudents.data.map((student : IStudent) => {
                // Type assertion to handle the unknown _id type
                const id = student._id as mongoose.Types.ObjectId;
                return id.toString();
            });

            let analyticsMap = new Map<string, IStudentAnalyticsDocument>();
            if (studentIds.length > 0) {
                const studentAnalyticsDocs = await this.statModel.getAll(
                    { _id: { $in: studentIds } }, 
                    {}, 
                    1,
                    studentIds.length,
                    {}
                );
                studentAnalyticsDocs.data.forEach(doc => {
                    analyticsMap.set(doc._id.toString(), doc);
                });
            }

            const studentsWithUserMetrics = paginatedStudents.data.map(student => {
                const analyticsDoc = analyticsMap.get((student._id as mongoose.Types.ObjectId).toString());
                return {
                    ...student, // Convert Mongoose Document to plain JS object
                    userMetrics: analyticsDoc ? analyticsDoc.userMetrics : null // Embed only userMetrics
                };
            });

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                ...paginatedStudents,
                data: studentsWithUserMetrics, // Override 'data' with combined array
            });
        } catch (error) {
            // console.log(error);
            handleError(error, next);
        }
    }

    getStudentAnalyticsById = async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            const { id } = req.params; // This ID is expected to be the Student's _id

            if (!id) {
                return next(new ApiError({
                    message: "Student ID is required to fetch analytics.",
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                }));
            }
            if(!isValidObjectId(id)){
                return next(new ApiError({
                    message: "Student ID is not valid to fetch analytics.",
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                }));
            }
            
            const analyticsDoc = await this.statModel.getById((new mongoose.Types.ObjectId(id)));
            if (!analyticsDoc) {
                return next(new ApiError({
                    message: "Student analytics not found for this ID. The student might exist, but no analytics are recorded.",
                    statusCode: Number(HttpStatusCode.NOT_FOUND),
                    errorCode: DbErrorCodes.NOT_FOUND,
                }));
            }

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                data: analyticsDoc, // Return the full analytics document
            });

        } catch (error) {
            handleError(error, next);
        }
    }

    
    getHighestAchievers = async (req : Request, res : Response, next : NextFunction) => {

    
        try{
            const pipeline : PipelineStage[] = [
                {
                    $facet: {
                      "highestRatingUser": [
                        { $sort: { "userMetrics.currentRating": -1 } },
                        { $limit: 1 },
                        { 
                          $project: { 
                            _id: 0, 
                            userId: "$_id", 
                            number: "$userMetrics.currentRating" 
                          } 
                        }
                      ],
                      "bestImprovementUser": [
                        { $sort: { "userMetrics.highestImporovement": -1 } },
                        { $limit: 1 },
                        { 
                          $project: { 
                            _id: 0, 
                            userId: "$_id", 
                            number: "$userMetrics.highestImporovement" 
                          } 
                        }
                      ],
                      "highestConsistencyUser": [
                        { $sort: { "userMetrics.consitency": -1 } },
                        { $limit: 1 },
                        { 
                          $project: { 
                            _id: 0, 
                            userId: "$_id", 
                            number: "$userMetrics.consitency" 
                          } 
                        }
                      ]
                    }
                  }
            ]
            const highestAchievers = await this.statModel.aggregate(pipeline) as IAggregatedResult[];
    
            if(highestAchievers.length === 0){
                return next(new ApiError({message : "No Data Found", statusCode : Number(HttpStatusCode.NOT_FOUND)}))
            }

            const highestAchieversWithUserData : IHighestAchiever[] = [];

            const result = highestAchievers[0];
            if(!result){
                return next(new ApiError({message : "No Data Found", statusCode : Number(HttpStatusCode.NOT_FOUND)}))
            }


            for(const [key, value] of Object.entries(result)){


                if(Array.isArray(value) && value.length > 0) {
                    const achieversData = value[0];
                    const userId = achieversData.userId;
                    const metricsNumber = achieversData.number;

                    if(!userId) {
                        return next(new ApiError({message : "User's not found", statusCode : Number(HttpStatusCode.NOT_FOUND)})); 
                    }
                    const result = await this.studentModel.getById(userId) as IStudent;
                    const temp :IHighestAchiever = {
                        key,
                        userName : result.name,
                        _id : result._id as string ,
                        number : metricsNumber
                    }
                    highestAchieversWithUserData.push(temp); 
                }
            }
                    

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                highestAchieversWithUserData
            })
        }catch(error){
            
            handleError(error, next);
        }
    }
    
    addStudents = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const {name, email, phone_number, codeforceHandle, duration} = req.body;
            console.log(req.body)
            const missingFields = this.getMissingFields({
                name,
                email,
                phone_number,
                codeforceHandle,
              });

              if (missingFields.length > 0) {
                const message = `Missing required fields: ${missingFields.join(", ")}`;
                return next(
                  new ApiError({
                    message,
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                  })
                );
            }

            const codeforcesData = await this.statsService.getData(codeforceHandle);

            if (codeforcesData.error) {
                return next(
                    new ApiError({
                        message: `Codeforces API error for handle ${codeforceHandle}: ${codeforcesData.error}`,
                        statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    })
                );
            }

            if (!codeforcesData || (codeforcesData.contestData?.length === 0 && codeforcesData.problemData?.length === 0)) {
                return next(
                    new ApiError({
                        message: `Could not fetch Codeforces data for handle: ${codeforceHandle}`,
                        statusCode: Number(HttpStatusCode.BAD_REQUEST),
                        errorCode: DbErrorCodes.VALIDATION_ERROR,
                    })
                );
           }
          
    
            const student = await this.studentModel.create({
                name,
                email,
                phone_number,
                codeforceHandle
            });

            const stats = await this.statsService.getStats(duration, codeforcesData.contestData, codeforcesData.problemData);
            // console.log(stats);
           await this.statModel.create({_id: student._id as mongoose.Types.ObjectId, userMetrics : stats.userMetrics, contestMetrics : stats.contenstData, problemMetrics : stats.formatedProblemData})
            res.status(Number(HttpStatusCode.CREATED)).json({ 
                success:true,
                studentData : student,
                studentStats : stats,
            });
        } catch(error) {
            handleError(error, next);

        }
    }

    
    deleteStudents = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { id } = req.params;

            if (!id) {
                return next(new ApiError({
                    message: "Student ID is required for deletion.",
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                }));
            }

            const deletedStudent = await this.studentModel.delete(id);
            const deleteStats = await this.statModel.delete(id);

            if (!deletedStudent || !deleteStats) {
                return next(new ApiError({
                    message: "Student not found.",
                    statusCode: Number(HttpStatusCode.NOT_FOUND),
                    errorCode: DbErrorCodes.NOT_FOUND,
                }));
            }

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                message: "Student deleted successfully.",
                data: deletedStudent,
            });
        } catch (error) {
            handleError(error, next);
        }
    }

    
    updateStudents = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params; 
            const updateData = req.body; 
            
            if (!id) {
                return next(new ApiError({
                    message: "Student ID is required for update.",
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                }));
            }

            if (Object.keys(updateData).length === 0) {
                return next(new ApiError({
                    message: "No update data provided.",
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                }));
            }

            if(!isValidObjectId(id)){
                return next(new ApiError({
                    message: "Student ID is not valid to fetch analytics.",
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                }));
            }

            const existingStudent = await this.studentModel.getById(new mongoose.Types.ObjectId(id));
            if (!existingStudent) {
                return next(new ApiError({
                    message: "Student not found.",
                    statusCode: Number(HttpStatusCode.NOT_FOUND),
                    errorCode: DbErrorCodes.NOT_FOUND,
                }));
            }

            const updatedStudent = await this.studentModel.update(id, updateData);
            if(!updatedStudent){
                return next(new ApiError({
                    message : "Student not found",
                    statusCode : Number(HttpStatusCode.BAD_REQUEST)
                }));
            }

            const newCodeforceHandle = updateData.codeforceHandle;

            if(newCodeforceHandle && newCodeforceHandle === existingStudent.codeforceHandle) {
                res.status(Number(HttpStatusCode.OK)).json({
                    success: true,
                    message: "Student updated successfully.",
                    data: updatedStudent,
                });
                return;
            }


            const durations = req.body.duration || [7, 30, 365];
            const durationsArray = Array.isArray(durations) ? durations : [durations];

            try {
                const codeforcesRawData = await this.statsService.getData(newCodeforceHandle);
                if (codeforcesRawData.error) {
                    return next(
                        new ApiError({
                            message: `Codeforces API error for handle ${newCodeforceHandle}: ${codeforcesRawData.error}`,
                            statusCode: Number(HttpStatusCode.BAD_REQUEST),
                        })
                    );
                } else {
                    const updatedAnalyticsResult = await this.statsService.getStats(
                        durationsArray,
                        codeforcesRawData.contestData as IContestData[],
                        codeforcesRawData.problemData as CodeforcesSubmission[]
                    );

                    const updatedAnalytics = await this.statModel.update(id, updatedAnalyticsResult);

                    if(!updatedAnalytics) {
                        await this.statModel.create({ _id: updatedStudent._id as mongoose.Types.ObjectId, ...codeforcesRawData});
                        console.log(`Student analytics created for ID ${id} after handle change (was missing).`);
                    }
                }

            } catch (statsError) {
                console.error(`Unexpected error during analytics refresh for student ${id}:`, statsError);
            }
    

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                message: "Student and Analytics updated successfully.",
                updateStundent: updatedStudent,
            });

        } catch (error) {
            handleError(error, next);
        }
    }

    private getMissingFields(data: Record<string, any>): string[] {
        return Object.entries(data)
          .filter(([_, value]) => value == null || value === "" || value === undefined)
          .map(([key]) => key);
      }
}