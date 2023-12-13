import { StuffDocumentsChain, loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { OpenAI } from "langchain/llms/openai";

const llmA = new OpenAI();
const qaChain = loadQAStuffChain(llmA);

export type GetAnswerResponseDto = ReturnType<
  typeof StuffDocumentsChain.prototype.call
>;

export async function getLLMResponse(
  question: string,
  relatedDocuments: string[],
): Promise<GetAnswerResponseDto> {
  const input_documents = relatedDocuments.map(
    (doc) => new Document({ pageContent: doc }),
  );

  const response = await qaChain.call({
    input_documents,
    question,
  });

  return response;
}
