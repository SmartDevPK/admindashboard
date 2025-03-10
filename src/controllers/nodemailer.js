import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
})

const sendResetEmail = (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:3000/reset-password/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
        console.log('Error sending email:', err);  
        }  else {
            console.log('Email sent:', info.response);
        }
    })
}

export default sendResetEmail;