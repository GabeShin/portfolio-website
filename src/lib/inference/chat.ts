import { StuffDocumentsChain, loadQAStuffChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { Document } from "langchain/document";

const llmA = new OpenAI();
const qaChain = loadQAStuffChain(llmA);

export type GetAnswerResponseDto = ReturnType<
  typeof StuffDocumentsChain.prototype.call
>;

export async function getAnswer(
  question: string,
  relatedDocuments: string[]
): Promise<GetAnswerResponseDto> {
  const input_documents = relatedDocuments.map(
    (doc) => new Document({ pageContent: doc })
  );

  const messages = [
    "You are a helpful chatbot that answer questions about Gabe. User may refer to you as Gabe. Do not make anything up.",
    question,
  ];

  const response = await qaChain.call({
    input_documents,
    question: messages,
  });

  return response;
}
