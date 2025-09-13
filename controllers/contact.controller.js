const { sendEmailService } = require("../services/sendEmail");
const rateLimit = require("express-rate-limit");
const { EMAIL_USER } = require("../config/env");

// Rate limiter middleware
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    status: 429,
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
});

const sendContactMessage = async (req, res) => {
  try {
    const { first_name, last_name, email, message } = req.body;

    if (!first_name || !last_name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // send email to admin
    await sendEmailService({
      to: EMAIL_USER,
      subject: "New Message from zenfy.net",
      html: `
        <h1>New Contact Message</h1>
        <p><strong>First Name:</strong> ${first_name}</p>
        <p><strong>Last Name:</strong> ${last_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact message error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending message",
    });
  }
};

module.exports = { sendContactMessage, contactLimiter };
