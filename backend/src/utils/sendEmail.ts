import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, body: string) {
  let transporter: nodemailer.Transporter;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const info = await transporter.sendMail({
    from: `"NoReply" <${process.env.SMTP_USER || "no-reply@ethereal.email"}>`,
    to,
    subject,
    text: body,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
  return { accepted: info.accepted.length > 0, previewUrl };
}
