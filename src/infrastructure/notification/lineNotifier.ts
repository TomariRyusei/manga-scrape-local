import axios from "axios";
import "dotenv/config";

import { INotifier } from "./INotification";

export class LineNotifier implements INotifier {
  constructor() {}

  async send(message: string): Promise<void> {
    try {
      await axios.post(
        "https://api.line.me/v2/bot/message/broadcast",
        { to: process.env.LINE_USER_ID, messages: [{ type: "text", text: message }] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCSESS_TOKEN}`,
          },
        }
      );
    } catch (error) {
      console.error("Error in LineNotifier:", error);
      throw error;
    }
  }
}
