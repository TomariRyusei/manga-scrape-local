import nodemailer from "nodemailer";

import { INotification } from "./INotification";

export class EmailNotifier implements INotification {
  private emailConfig: {
    host: string;
    auth: {
      user: string | undefined;
      pass: string | undefined;
    };
  } = {
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_SERVICE_PASSWORD,
    },
  };

  private recipientEmail: string = process.env.MAIL_ADDRESS || "";

  constructor() {}

  async send(message: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport(this.emailConfig);
      await transporter.sendMail({
        from: this.emailConfig.auth.user,
        to: this.recipientEmail,
        subject: "漫画新刊情報",
        text: message,
      });
    } catch (error) {
      console.error("Error in EmailNotifier:", error);
      throw error;
    }
  }
}
