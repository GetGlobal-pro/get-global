import { Resend } from "resend";
import EmailTemplate from "../../../components/Home/EmailTemplate.js";

const resend = new Resend("re_4i7zrnT4_7Nd7Beq6oSm6HF32KjkfSZmn");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, verificationToken } = req.body;

      const data = await resend.emails.send({
        from: "GetGlobal <hello@getglobal.jobs>",
        to: email,
        subject:
          "Welcome to Get Global 🌐 - Your Answer to the Global Talent Quest",
        react: EmailTemplate({ verificationToken }), // Make sure to pass verificationUrl here
      });

      res.status(200).json(data);
    } catch (error) {
      console.error("Error sending email:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    // If not a POST request, return 405 Method Not Allowed
    res.status(405).end("Method Not Allowed");
  }
}