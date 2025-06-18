import { Resend } from 'resend';
import { config } from '../utils/config';


interface IEmail  {
    to : string,
    subject : string,
    html : string,
}
const resend = new Resend(config.resend.API);
const sendEmail = async ({to, subject, html} :IEmail ) => {

            const {error } = await resend.emails.send({
                from : "TLE <tle@send.rajgupta.in>", // Fixed format here
                to : [to],
                subject,
                html,
            });


            if(error){
                throw new Error("Email is not send");
            }


        }
        

            
            
            
export default sendEmail