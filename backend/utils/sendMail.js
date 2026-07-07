import nodemailer from 'nodemailer'
import 'dotenv/config'
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // The 16-character App Password
  },
});
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const sendMail=async({to,subject,html})=>{
try {
  const info=await transporter.sendMail({
    from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  })
} catch (error) {
  console.log(error)
}
}

export default sendMail;