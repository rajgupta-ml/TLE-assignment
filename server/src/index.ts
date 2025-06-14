import express from "express"
import helmet from "helmet";
import dotenv from "dotenv"
import { config } from "./utils/config";
import studentRouter from "./routes/v1/studentRouter";
import { errorHandler } from "./middleware/ErrorMiddleware";
import { connectDB } from "./utils/database";

const app = express();
app.use(helmet());
app.use(express.json())
app.use("/v1/api", studentRouter)

app.get("/healtCheck", (req, res) => {
    res.status(200).send("Ok");
})

app.use(errorHandler)

connectDB().then(() => {
    app.listen(config.server.PORT, () => {
        console.log(`The server is running on port ${config.server.PORT}`)

    })
})