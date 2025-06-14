import { Router } from "express";
import { stundentController } from "../../controller/studentController";

const studentRouter = Router();
const studentController = new stundentController();
studentRouter.get("getStudent", studentController.getStudents);

export default studentRouter