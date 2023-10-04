import { ChatService, IChatService } from "./chat-service";
import { DatabaseService, IDatabaseService } from "./database-service";
import { IPostService, PostService } from "./post-service";

let databaseService: IDatabaseService | null = null;
let chatService: IChatService | null = null;
let postService: IPostService | null = null;

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
    throw new Error(
      "An unknown error occurred while initializing DatabaseService"
    );
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
  }
}

export async function getPostService() {
  try {
    if (!postService) {
      postService = new PostService();
    }

    return postService;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error initializing PostService:", e.message, e.stack);
    } else {
      console.error(
        "An unknown error occurred while initializing PostService:",
        e
      );
    }
  }
}
