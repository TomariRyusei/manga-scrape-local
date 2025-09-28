import { EmailNotifier } from "./infrastructure/notification/emailNotifier";
import { LineNotifier } from "./infrastructure/notification/lineNotifier";
import { myMangaList } from "./myMangaList";

const LINE_NOTIFY_TOKEN = process.env.LINE_CHANNEL_ACCSESS_TOKEN;
const LINE_USER_ID = process.env.LINE_USER_ID;

const EMAIL_CONFIG = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_SERVICE_PASSWORD,
  },
};
const RECIPIENT_EMAIL = process.env.MAIL_ADDRESS;

async function main() {
  // const notifier = new LineNotifier(LINE_NOTIFY_TOKEN, LINE_USER_ID);
  const notifier = new EmailNotifier(EMAIL_CONFIG, RECIPIENT_EMAIL);
  const message = `今日の新刊:\n${myMangaList.join("\n")}`;
  await notifier.send(message);
  console.log("Notification sent successfully");
}

main();
