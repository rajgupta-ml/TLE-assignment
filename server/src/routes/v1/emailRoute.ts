import { Router } from "express";
import { EmailTemplateController } from "../../controller/templateController";
import { EmailTemplateModel, type IEmailTemplateDocument } from "../../model/emailTemplate";
import DbService from "../../service/dbService";

const emailRouter = Router();
const  dbService = new DbService<IEmailTemplateDocument>(EmailTemplateModel)
const emailController = new EmailTemplateController(dbService)
// Id => By userID;
emailRouter.get("/template/all", emailController.getAllEmailTemplate);

emailRouter.post("/template", emailController.createEmailTemplate); 


//Id => By template ID;
emailRouter.put("/template/:id", emailController.updateEmailTemplate);
emailRouter.delete("/template/:id", emailController.deleteEmailTemplate)

export default emailRouter;