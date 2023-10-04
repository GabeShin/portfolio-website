import { getDatabaseServiceInstance } from "./init";
import { getQueryEmbeddings } from "../inference/embedding";
import { getAnswer } from "../inference/chat";
import { sendSlackMessage } from "../utils/slack";

export interface IChatService {
  sendMessage(message: string): Promise<string>;
}

export class ChatService implements IChatService {
  constructor() {}

  async sendMessage(message: string): Promise<any> {
    const service = await getDatabaseServiceInstance();

    const queryEmbeddings = await getQueryEmbeddings(message);

    const relatedDocs = await service.query("notes", queryEmbeddings);
    const docTexts = relatedDocs.map((doc) => doc.payload?.text);

    const response = await getAnswer(message, docTexts as string[]);
    const { text } = response;

    await sendSlackMessage(message, text);

    return {
      relatedDocs,
      responseText: text,
    };
  }
}
