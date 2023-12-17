"use server";

import MongoDatabase from "../database";
import { getLLMResponse } from "../inference/chatgpt";
import {
  getDocumentEmbeddings,
  getQueryEmbeddings,
} from "../inference/embedding";
import { MessageType } from "../types/message.type";
import { Document } from "langchain/document";

export async function findSimilarDocuments(
  message: string,
): Promise<Document[]> {
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
    documents.push(new Document({ pageContent: doc.text }));
  }

  return documents;
}

export async function sendMessageToChatbot(
  question: string,
  chatHistory: MessageType[],
) {
  const relevantDocuments = await findSimilarDocuments(question);
  const response = await getLLMResponse(
    question,
    chatHistory,
    relevantDocuments,
  );
  // await sendSlackMessage(message, text);

  return response;
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
    console.log(e);
  }
}
