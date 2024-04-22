"use server";

import MongoDatabase from "../database";
import { HuggingFaceError } from "../errors";
import {
  getDocumentEmbeddings,
  getQueryEmbeddings,
} from "../inference/embedding";

export async function findSimilarDocuments(message: string): Promise<string[]> {
  try {
    const dbInstance = await MongoDatabase.getInstance();
    const database = dbInstance.getDatabase();

    // Do a vector search
    const queryEmbeddings = await getQueryEmbeddings(message);

    const result = database.collection("iamgabe").aggregate([
      {
        $vectorSearch: {
          index: "vectorIndex",
          path: "vector_index",
          queryVector: queryEmbeddings,
          numCandidates: 100,
          limit: 10,
        },
      },
    ]);

    const documents = [];
    for await (const doc of result) {
      if (!doc.text) {
        continue;
      }
      documents.push(doc.text);
    }

    return documents;
  } catch (e) {
    console.error(e);
    throw new HuggingFaceError("Failed to find similar documents");
  }
}

export async function insertDocument(documentText: string, secret: string) {
  if (secret !== process.env.SECRET_MAGIC_WORD) {
    return;
  }
  try {
    const embeddingResult = await getDocumentEmbeddings(documentText);

    const points = embeddingResult.map((res) => {
      const { vector, text } = res;
      return {
        vector_index: vector,
        text,
      };
    });

    const dbInstance = await MongoDatabase.getInstance();
    const database = dbInstance.getDatabase();

    await database.collection("iamgabe").insertMany(points);
  } catch (e) {
    console.error(e);
  }
}
