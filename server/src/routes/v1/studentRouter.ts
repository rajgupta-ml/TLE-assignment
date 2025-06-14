import { Router } from "express";
import { StudentController } from "../../controller/studentController";
import mongoose from "mongoose";
import DbService from "../../service/dbService";
import type { IStudent } from "../../model/student";
import Student from "../../model/student";

const studentRouter = Router();
const student = new DbService<IStudent>(Student);
const studentController = new StudentController(student);

/**
     * @route GET /api/students
     * @description Get all students or filter by query parameters
     * @access Public
*/
studentRouter.get("/students", studentController.getStudents);

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