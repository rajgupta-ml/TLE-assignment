import { Router } from "express";
import { EmailTemplateController } from "../../controller/templateController";
import { EmailTemplateModel, type IEmailTemplateDocument } from "../../model/emailTemplate";
import DbService from "../../service/dbService";

const emailRouter = Router();
const  dbService = new DbService<IEmailTemplateDocument>(EmailTemplateModel)
const emailController = new EmailTemplateController(dbService)
// Id => By userID;
emailRouter.get("/all", emailController.getAllEmailTemplate);
emailRouter.post("/", emailController.createEmailTemplate); 

//Id => By template ID;
emailRouter.put("/:id", emailController.updateEmailTemplate);
emailRouter.delete("/:id", emailController.deleteEmailTemplate)

export default emailRouter;