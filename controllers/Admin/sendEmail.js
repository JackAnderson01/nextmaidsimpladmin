import nodemailer from "nodemailer";

export default async function sendEmail(subject, message, email) {
  const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: "dignite.studios.verify@outlook.com",
      pass: "L@un(hbox1234",
    },
  });

  const mailOptions = {
    from: "dignite.studios.verify@outlook.com",
    to: email,
    subject: subject,
    html: message,
  };

  return transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error(error);
      return false;
    } else {
      return true;
    }
  });
}
