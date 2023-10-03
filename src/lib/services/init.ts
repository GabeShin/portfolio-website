import { ChatService, IChatService } from "./chat-service";
import { DatabaseService, IDatabaseService } from "./database-service";

let databaseService: IDatabaseService | null = null;
let chatService: IChatService | null = null;

export async function getDatabaseServiceInstance(): Promise<IDatabaseService> {
  try {
    // Check for environmental variables
    if (!process.env.QDRANT_HOST || !process.env.QDRANT_API_KEY) {
      throw new Error(
        "QDRANT_HOST or QDRANT_API_KEY environment variable is not defined"
      );
    }

    if (!databaseService) {
      databaseService = new DatabaseService(
        process.env.QDRANT_HOST,
        process.env.QDRANT_API_KEY
      );
    }

    return databaseService;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error initializing DatabaseService:", e.message, e.stack);
    } else {
      console.error(
        "An unknown error occurred while initializing DatabaseService:",
        e
      );
    }
    throw new Error("Failed to obtain DatabaseService instance");
  }
}

export async function getChatService() {
  try {
    if (!chatService) {
      chatService = new ChatService();
    }

    return chatService;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error initializing ChatService:", e.message, e.stack);
    } else {
      console.error(
        "An unknown error occurred while initializing ChatService:",
        e
      );
    }
    throw new Error("Failed to obtain ChatService instance");
  }
}
