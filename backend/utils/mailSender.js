const nodemailer = require("nodemailer");

const mailSender = async (to, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "login",
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: body,
    });

    console.log("Email sent successfully:", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, message: "Failed to send email", error: error.message };
  }
};

module.exports = mailSender;
