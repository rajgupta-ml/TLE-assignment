import type mongoose from "mongoose";
import { DbError } from "./../error/dbError";
import { HttpStatusCode } from "../constants/httpStatusCode.constants";
import { DbErrorCodes, DbErrorMessages } from "../constants/error.constants";
import type { PipelineStage, SortOrder } from "mongoose";

class DbService<T extends mongoose.Document> {
    
    constructor(private model : mongoose.Model<T>) {
      if (!model) {
        throw new Error('DbService: Mongoose model must be provided.');
      }
      this.model = model;
    }
  
    private _handleDbError(
        error: any,
        operation: string,
        context: Record<string, any> | Partial<T> = {}
      ): never {
        let code: DbErrorCodes = DbErrorCodes.UNKNOWN_ERROR;
        let message: DbErrorMessages = DbErrorMessages.UNKNOWN_ERROR;
        let statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
      
        if (error.name === 'ValidationError') {
          code = DbErrorCodes.VALIDATION_ERROR;
          message = DbErrorMessages.VALIDATION_ERROR;
          statusCode = HttpStatusCode.BAD_REQUEST;
          console.error("Validation Error Details:", error.errors);
        } else if (error.code === 11000) {
          code = DbErrorCodes.DUPLICATE_KEY_ERROR;
          message = DbErrorMessages.DUPLICATE_KEY_ERROR;
          statusCode = HttpStatusCode.CONFLICT;
        } else if (error.name === 'CastError') {
          code = DbErrorCodes.CAST_ERROR;
          message = DbErrorMessages.CAST_ERROR;
          statusCode = HttpStatusCode.BAD_REQUEST;
        } else if (error.name === 'MongoNetworkError') {
          code = DbErrorCodes.NETWORK_ERROR;
          message = DbErrorMessages.NETWORK_ERROR;
          statusCode = HttpStatusCode.SERVICE_UNAVAILABLE;
        }
      
        console.error(
          `[DbService Error] Operation: ${operation}, Context:`,
          context,
          `Error:`,
          error
        );
      
        throw new DbError(code, message, statusCode, error);
      }
  
    
    _getHttpStatusCode(error : any) {
      if (error.name === 'ValidationError') {
        return HttpStatusCode.BAD_REQUEST; 
      }
      if (error.code === 11000) {
        return HttpStatusCode.CONFLICT; 
      }
      if (error.name === 'CastError') {
        return HttpStatusCode.BAD_REQUEST; 
      }
      if (error.name === 'MongoNetworkError') {
          return HttpStatusCode.SERVICE_UNAVAILABLE;
      }
      if (error.originalError && error.originalError.name === 'DocumentNotFoundError') {
          return HttpStatusCode.NOT_FOUND; 
      }
      return HttpStatusCode.INTERNAL_SERVER_ERROR; 
    }
  
 
    async create(data : Partial<T>) {
      try {
        const newDocument = new this.model(data);
        return await newDocument.save();
      } catch (error) {
        this._handleDbError(error, 'creating document',  data );
      }
    }
  
    async getById(id : mongoose.Types.ObjectId, projection : Record<string, string> = {}) {
      try {
        return await this.model.findById(id, projection).lean();
      } catch (error) {
        this._handleDbError(error, `getting document by ID`, { id });
      }
    }
  
 
    async findOne(query : Record<string, string>, projection : Record<string, string> = {}) {
      try {
        return await this.model.findOne(query, projection).lean();
      } catch (error) {
        this._handleDbError(error, 'finding one document',query );
      }
    }
  
    async getAll(
      filter: Record<string, any> = {},
      projection: Record<string, string> = {},
      page: number = 1,
      limit: number = 10,
      sortOptions: Record<string, SortOrder> = {} // Changed type here
      ): Promise<{ data: T[]; total: number; page: number; pages: number; limit: number }> {
    try {
      const skip = (page - 1) * limit;
      const total = await this.model.countDocuments(filter);
      const data= await this.model
        .find(filter, projection)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions) // Apply sorting
        .lean() as T[];

      const pages = Math.ceil(total / limit);

      return {
        data,
        total,
        page,
        pages,
        limit,
      };
    } catch (error) {
      this._handleDbError(error, 'getting all documents with pagination', {
        filter: JSON.stringify(filter),
        page,
        limit,
        sortOptions: JSON.stringify(sortOptions),
      });
    }
  }
  
    /**
     * @method update
     * @description Updates a document by its ID.
     * @param {string} id - The ID of the document to update.
     * @param {object} data - An object containing the fields to update.
     * @returns {Promise<object|null>} A promise that resolves to the updated document or null if not found.
     * @throws {Error} If there is an error during the update.
     */
    async update(id : string, data : Partial<T>) {
      try {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).lean();
      } catch (error) {
        this._handleDbError(error, `updating document with ID`, { id, data : JSON.stringify(data) });
      }
    }
  
   
    async delete(id : string) {
      try {
        return await this.model.findByIdAndDelete(id).lean();
      } catch (error) {
        this._handleDbError(error, `deleting document with ID`, { id });
      }
    }
  
    async count(filter : Record<string,any> = {}) {
      try {
        return await this.model.countDocuments(filter);
      } catch (error) {
        this._handleDbError(error, 'counting documents', filter);
      }
    }

    async aggregate(pipeline: PipelineStage[]) {
      try {
          return await this.model.aggregate(pipeline);
      } catch (error) {
          this._handleDbError(error, 'executing aggregation pipeline', {
              pipeline: JSON.stringify(pipeline),
          });
      }
    }
  }
  
 
  
 
  export default DbService