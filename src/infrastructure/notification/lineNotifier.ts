import axios from "axios";

import { INotification } from "./INotification";

export class LineNotifier implements INotification {
  constructor(private lineNotifyToken: string | undefined, private lineUserId: string | undefined) {
    if (!lineNotifyToken) {
      throw new Error("LINE Notify token is not set");
    }

    if (!lineUserId) {
      throw new Error("LINE User ID is not set");
    }
  }
  async send(message: string): Promise<void> {
    try {
      await axios.post(
        "https://api.line.me/v2/bot/message/broadcast",
        { to: this.lineUserId, messages: [{ type: "text", text: message }] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.lineNotifyToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error in LineNotifier:", error);
      throw error;
    }
  }
}
