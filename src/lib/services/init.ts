import { CollectionService, ICollectionService } from "./collection-service";
import { DocumentService, IDocumentService } from "./document-service";

let singletonCollectionService: ICollectionService | null = null;
let singletonDocumentService: IDocumentService | null = null;

export async function getCollectionServiceInstance(): Promise<ICollectionService> {
  try {
    // Check for environmental variables
    if (!process.env.CHROMADB_HOST) {
      throw new Error("CHROMADB_HOST environment variable is not defined");
    }

    // Initialize the singleton if it does not exist
    if (!singletonCollectionService) {
      singletonCollectionService = new CollectionService(
        process.env.CHROMADB_HOST
      );
      // Perform any asynchronous checks or operations if the constructor is async
    }

    return singletonCollectionService;
  } catch (e) {
    if (e instanceof Error) {
      console.error(
        "Error initializing CollectionService:",
        e.message,
        e.stack
      );
    } else {
      console.error(
        "An unknown error occurred while initializing CollectionService:",
        e
      );
    }
    throw new Error("Failed to obtain CollectionService instance");
  }
}

export async function getDocumentServiceInstance(): Promise<IDocumentService> {
  try {
    if (!singletonDocumentService) {
      const collectionService = await getCollectionServiceInstance();
      const collection = await collectionService.getCollection("iamgabeshin");

      // If getCollection returns null or an undesired value, handle that case here
      if (!collection) {
        throw new Error("Failed to get collection");
      }

      singletonDocumentService = new DocumentService(collection);
    }

    return singletonDocumentService;
  } catch (e) {
    if (e instanceof Error) {
      // Log the error message and stack for debugging
      console.error("Error initializing DocumentService:", e.message, e.stack);
    } else {
      // Rethrow the error so that the caller knows initialization failed
      console.error(
        "An unknown error occurred while initializing DocumentService:",
        e
      );
    }
    throw new Error("Failed to initialize DocumentService");
  }
}
