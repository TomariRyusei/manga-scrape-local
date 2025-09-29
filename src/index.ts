import { EmailNotifier } from "./infrastructure/notification/emailNotifier";
import { LineNotifier } from "./infrastructure/notification/lineNotifier";
import { myMangaList } from "./myMangaList";

async function main() {
  // const notifier = new LineNotifier(LINE_NOTIFY_TOKEN, LINE_USER_ID);
  const notifier = new EmailNotifier();
  const message = `今日の新刊:\n${myMangaList.join("\n")}`;
  await notifier.send(message);
  console.log("Notification sent successfully");
}

main();
