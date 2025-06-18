import { Router } from "express";
import { CronController } from "../../controller/cronController";
import DbService from "../../service/dbService";
import type { ICronJob } from "../../model/cronModel";
import CronJob from "../../model/cronModel";

const cronRoutes = Router();
const dbService = new DbService<ICronJob>(CronJob);
const cronController = new CronController(dbService);

cronRoutes.get("/", cronController.getCronJob)
cronRoutes.post("/", cronController.createCronJob);
cronRoutes.put("/:id", cronController.updateCronJobs);
cronRoutes.delete("/:id" , cronController.deleteCronJobs)


export default cronRoutes