import express from "express"
import helmet from "helmet";
import dotenv from "dotenv"
import { config } from "./utils/config";

const app = express();
app.use(helmet());

app.get("/healtCheck", (req, res) => {
    res.status(200).send("Ok");
})
app.listen(config.server.PORT, () => {
    console.log(`The server is running on port ${config.server.PORT}`)
})