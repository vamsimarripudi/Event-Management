const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure:false,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendEmail = async ({to,subject,html}) => {
    try{
        await transporter.sendMail({
            from: `"Event Team" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

    }catch(err){
        console.error("Error : " , err.message)
    }
}

module.exports = sendEmail;