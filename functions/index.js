const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Define the secret for the email password
const emailPass = defineSecret("pursuit-one_email_pass");

exports.onContactMessageCreated = onDocumentCreated({
  document: "contact_messages/{messageId}",
  secrets: [emailPass],
}, async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }

  const data = snapshot.data();
  const { name, email, phone, company, message, createdAt } = data;

  // Configure SMTP transport
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: "support@pursuit-one.com",
      pass: emailPass.value(),
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  const submissionDate = createdAt ? createdAt.toDate().toLocaleString() : new Date().toLocaleString();

  const mailOptions = {
    from: '"Pursuit-One Website" <support@pursuit-one.com>',
    to: "support@pursuit-one.com",
    subject: "New Website Enquiry – Pursuit-One",
    text: `
New Website Enquiry received:

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Company: ${company || "N/A"}
Message: ${message}

Submission Timestamp: ${submissionDate}
    `,
    html: `
      <h2>New Website Enquiry – Pursuit-One</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p><small>Submitted on: ${submissionDate}</small></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully for messageId: ${event.params.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
});
