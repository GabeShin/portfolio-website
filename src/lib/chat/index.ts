"use server";

import MongoDatabase from "../database";
import { getDocumentEmbeddings } from "../inference/embedding";
import { MessageType } from "../types/message.type";

export async function sendMessage(messages: MessageType[]) {
  const dbInstance = await MongoDatabase.getInstance();
  const database = dbInstance.getDatabase();

  // Do a vector search
}

export async function insert(documentText: string) {
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
