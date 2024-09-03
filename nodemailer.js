require("dotenv").config();
const nodemailer = require("nodemailer");

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  //   service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  port: 587, // Change the port to 587
  secure: false,
});

// Function to send registration email
const sendRegistrationEmail = (userEmail, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Registration Successful",
    text: `Hi ${userName},\n\nThank you for registering on our platform.\n\nBest Regards,\nYour Company`,
    // html: `<p>Hi ${userName},</p><p>Thank you for registering on our platform.</p><p>Best Regards,<br>Your Company</p>`,
    html: `
    <p>Hi ${userName},</p>
    <p>Thank you for registering on our platform.</p>
    <p>Here is an attached image:</p>
    <img src="cid:unique@cid" alt="Embedded Image" width="400" height="300"  />
    <p>Best Regards,<br>Your Company</p>
`,
    attachments: [
      {
        filename: "vegpizza.jpg",
        path: "./vegpizza.jpg",
        cid: "unique@cid", // same cid value as in the HTML img src
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendRegistrationEmail;
