import { Resend } from 'resend';
import { config } from '../utils/config';


interface IEmail  {
    to : string,
    subject : string,
    html : string,
}
const resend = new Resend(config.resend.API);
const sendEmail = ({to, subject, html} :IEmail ) => {

    try {
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            html,
        });
    } catch (error) {
        console.log("Could Not sent the Email", error)    
    }
}


export default sendEmail