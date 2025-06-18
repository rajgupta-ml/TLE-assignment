import express from "express"
import helmet from "helmet";
import dotenv from "dotenv"
import { config } from "./utils/config";
import studentRouter from "./routes/v1/studentRouter";
import { errorHandler } from "./middleware/ErrorMiddleware";
import { connectDB } from "./utils/database";
import cors from 'cors'
import EmailTemplate from "./routes/v1/emailRoute";
import emailRouter from "./routes/v1/emailRoute";
import { jobScheduler } from "./service/jobScheduler";
import cronRoutes from "./routes/v1/cronRoutes";
const app = express();
app.use(cors({
    origin : "*",
}))
app.use(helmet());
app.use(express.json())
app.use("/v1/api/students", studentRouter)
app.use("/v1/api/template",  emailRouter);
app.use("/v1/api/cron-job",  cronRoutes);


app.get("/healtCheck", (req, res) => {
    res.status(200).send("Ok");
})
app.use(errorHandler)

connectDB().then(() => {
    app.listen(config.server.PORT, () => {
        try {

            jobScheduler.loadAndScheduleAllJobs();
        } catch (error) {
            console.log("Cron Job could not be scheduled");
            jobScheduler.destroyAllJobs();
            process.exit(1);
        }
        console.log(`The server is running on port ${config.server.PORT}`)

    })
})