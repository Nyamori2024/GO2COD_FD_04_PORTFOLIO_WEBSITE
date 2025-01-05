// Import the nodemailer module for sending emails
const nodemailer = require('nodemailer');

// Define an asynchronous function to send an email with the specified options
const sendEmail = async (options) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // SMTP server configuration
    host: process.env.EMAIL_HOST, // The SMTP server hostname
    port: process.env.EMAIL_PORT, // The SMTP server port
    auth: {
      user: process.env.EMAIL_USER, // SMTP server username (email address)
      pass: process.env.EMAIL_PASS, // SMTP server password
    },
  });

  // Define the email options
  const mailOptions = {
    from: `Your App <${process.env.EMAIL_USER}>`, // Sender address
    to: options.email, // List of recipients
    subject: options.subject, // Subject line
    text: options.message, // Plain text body
  };

  // Send the email using the transporter object
  await transporter.sendMail(mailOptions);
};

// Export the sendEmail function for use in other parts of the application
module.exports = sendEmail;