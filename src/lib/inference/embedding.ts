"use server";

import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

if (!process.env.HF_TOKEN || !process.env.HF_MODEL_NAME) {
  throw new Error("Missing HF_TOKEN or HF_MODEL_NAME environment variable");
}

if (!process.env.CHUNK_SIZE || !process.env.CHUNK_OVERLAP) {
  throw new Error("Missing CHUNK_SIZE or CHUNK_OVERLAP environment variable");
}

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: +process.env.CHUNK_SIZE,
  chunkOverlap: +process.env.CHUNK_OVERLAP,
});

const hf = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HF_TOKEN,
  model: process.env.HF_MODEL_NAME,
});

export async function getDocumentEmbeddings(
  text: string,
): Promise<{ vector: number[]; text: string }[]> {
  console.log("inputText", text);
  const splitText = await textSplitter.splitText(text);

  console.log(splitText);
  const embeddings = await hf.embedDocuments(splitText);

  console.log(embeddings);

  return embeddings.map((vector, index) => ({
    vector,
    text: splitText[index],
  }));
}

export async function getQueryEmbeddings(text: string): Promise<number[]> {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid text input. Text should be a non-empty string.");
  }

  if (!process.env.CHUNK_SIZE) {
    throw new Error("Missing CHUNK_SIZE environment variable");
  }

  // Check for text length
  if (text.length > +process.env.CHUNK_SIZE) {
    throw new Error(
      `Text too long. Maximum allowed length is ${process.env.CHUNK_SIZE} characters.`,
    );
  }

  // Generate embeddings
  const embeddings = await hf.embedQuery(text);

  return embeddings;
}
