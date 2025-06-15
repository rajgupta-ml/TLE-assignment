import { Router } from "express";
import { StudentController } from "../../controller/studentController";
import mongoose from "mongoose";
import DbService from "../../service/dbService";
import type { IStudent } from "../../model/student";
import Student from "../../model/student";
import { StatsService } from "../../service/statsService";
import { StudentAnalyticsModel, type IStudentAnalyticsDocument } from "../../model/studentAnalystics";

const studentRouter = Router();
const student = new DbService<IStudent>(Student);
const stats = new DbService<IStudentAnalyticsDocument>(StudentAnalyticsModel)
const StatService = new StatsService();
const studentController = new StudentController(student, stats, StatService);

/**
     * @route GET /api/students
     * @description Get all students or filter by query parameters
     * @access Public
*/
studentRouter.get("/students", studentController.getStudents);


/**
     * @route GET /api/students/123
     * @description Get  students analytics data by id
     * @access Public
*/
studentRouter.get("/students/:id", studentController.getStudentAnalyticsById);

/**
     * @route POST /api/students
     * @description Add a new student
     * @access Public
     */

studentRouter.post("/students", studentController.addStudents);

/**
     * @route PUT /api/students/:id
     * @description Update a student by ID
     * @access Public
*/

studentRouter.put("/students/:id", studentController.updateStudents);

/**
     * @route DELETE /api/students/:id
     * @description Delete a student by ID
     * @access Public
*/
studentRouter.delete("/students/:id", studentController.deleteStudents);

export default studentRouter