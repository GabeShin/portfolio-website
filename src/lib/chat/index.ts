"use server";

import MongoDatabase from "../database";
import { getLLMResponse } from "../inference/chatgpt";
import {
  getDocumentEmbeddings,
  getQueryEmbeddings,
} from "../inference/embedding";
import { MessageType } from "../types/message.type";

export async function findSimilarDocuments(message: MessageType) {
  const dbInstance = await MongoDatabase.getInstance();
  const database = dbInstance.getDatabase();

  // Do a vector search
  const queryEmbeddings = await getQueryEmbeddings(message.content);

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
}

export async function sendMessageToChatbot(messages: MessageType[]) {
  // Do a vector search
  const lastMessage = messages[messages.length - 1];
  const similarDocuments = await findSimilarDocuments(lastMessage);

  // Get last four messages
  const contents = [];
  const lastFourMessages = messages.slice(-4);
  for (const message of lastFourMessages) {
    contents.push(message.content);
  }

  const response = await getLLMResponse(contents, similarDocuments);

  const { text } = response;

  // await sendSlackMessage(message, text);

  return text;
}

export async function insertDocument(documentText: string, secret: string) {
  console.log("insert document server action");
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
