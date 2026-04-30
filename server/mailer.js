require("dotenv").config();
const {getSecret} = require("./services/ec2Services");
const nodemailer = require("nodemailer");
const {getTransporter} = require("./services/emailTransporter");

const initMailer = async () => {
    const EMAIL_HOST = await getSecret("/event-api/EMAIL_HOST");
    const EMAIL_PORT = await getSecret("/event-api/EMAIL_PORT");
    const EMAIL_USER = await getSecret("/event-api/EMAIL_USER");
    const EMAIL_PASS = await getSecret("/event-api/SMTP_KEY");

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure:false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        }
    });
    console.log("INIT transporter Done", transporter ? "OK" : "NULL");;
    return transporter;

};


const sendEmail = async ({to,subject,html}) => {
  
  const transporter = getTransporter();
    await transporter.sendMail({
      from: "Event Management <enquiry.portfolio@vamsimarripudi.tech>",
      to,
      subject,
      html,
    });
    console.log("Email Sent")

};

module.exports = {initMailer,sendEmail};