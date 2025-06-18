import { Router } from "express";

const emailRouter = Router();

// Id => By userID;
emailRouter.get("/template/:id");
emailRouter.post("/template");


//Id => By template ID;
emailRouter.put("/template/:id");
emailRouter.delete("/template/:id")

export default emailRouter;