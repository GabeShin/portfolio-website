import { QdrantClient } from "@qdrant/js-client-rest";
import {
  CreateNoteResponseDto as AddNoteResponseDto,
  DeleteNoteResponseDto,
  GetCollectionResponseDto,
  GetCollectionsResponseDto,
  SearchNotesResponseDto,
} from "../dto/database.dto";
import { v4 as uuidv4 } from "uuid";
import { getDocumentEmbeddings } from "../inference/embedding";

export interface IDatabaseService {
  createCollection(name: string): Promise<boolean>;
  deleteCollection(name: string): Promise<boolean>;
  listCollections(): Promise<GetCollectionsResponseDto>;
  getCollection(name: string): Promise<GetCollectionResponseDto>;
  addNote(
    collectionName: string,
    text: string,
    source: string
  ): Promise<AddNoteResponseDto>;
  deleteNote(
    collectionName: string,
    id: string[]
  ): Promise<DeleteNoteResponseDto>;
  query(
    collectionName: string,
    vector: number[]
  ): Promise<SearchNotesResponseDto>;
}

export class DatabaseService implements IDatabaseService {
  private readonly client: QdrantClient;

  constructor(path: string, apiKey: string) {
    this.client = new QdrantClient({ url: path }); // Initialize Qdrant client
  }

  async createCollection(name: string) {
    return await this.client.createCollection(name, {
      vectors: {
        size: 384,
        distance: "Cosine",
      },
    });
  }

  async deleteCollection(name: string): Promise<boolean> {
    return await this.client.deleteCollection(name);
  }

  async listCollections(): Promise<GetCollectionsResponseDto> {
    return await this.client.getCollections();
  }

  async getCollection(name: string): Promise<GetCollectionResponseDto> {
    return await this.client.getCollection(name);
  }

  async addNote(
    collectionName: string,
    documentText: string,
    source: string
  ): Promise<AddNoteResponseDto> {
    const embeddingResult = await getDocumentEmbeddings(documentText);

    const points = embeddingResult.map((res) => {
      const { vector, text } = res;
      return {
        id: uuidv4(),
        vector,
        payload: {
          type: "note",
          text,
          source,
        },
      };
    });

    return await this.client.upsert(collectionName, {
      wait: true,
      points,
    });
  }

  async deleteNote(
    collectionName: string,
    ids: string[]
  ): Promise<DeleteNoteResponseDto> {
    return await this.client.delete(collectionName, {
      wait: false,
      points: ids,
    });
  }

  async query(
    collectionName: string,
    vector: number[]
  ): Promise<SearchNotesResponseDto> {
    return await this.client.search(collectionName, {
      vector,
      limit: 3,
    });
  }
}
