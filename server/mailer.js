require("dotenv").config();
const {getSecret} = require("./services/ec2Services");
const nodemailer = require("nodemailer");

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

};


const sendEmail = async (req, res) => {
  const transporter = req.app.locals.transporter;
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    await transporter.sendMail({
      from: "Event Management <enquiry.portfolio@vamsimarripudi.tech>",
      to,
      subject,
      html,
    });

    return res.status(200).json({
      message: "Email sent successfully",
    });

  } catch (err) {
    console.error("Error:", err.message);

    return res.status(500).json({
      message: "Failed to send email",
    });
  }
};

module.exports = {initMailer,sendEmail};