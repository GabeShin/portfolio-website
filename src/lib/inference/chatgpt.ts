import { MessageType } from "../types/message.type";
import { Document } from "langchain/document";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/runnables";
import { StringOutputParser } from "langchain/schema/output_parser";
import { formatDocumentsAsString } from "langchain/util/document";

function formatMessageTypeAsString(message: MessageType) {
  return `${message.sender}: ${message.content}\n`;
}

class SingletonChain {
  private static instance: RunnableSequence;

  private constructor() {}

  public static getInstance(): RunnableSequence {
    if (!SingletonChain.instance) {
      const model = new OpenAI();
      const template = `You are chatbot who's role is to answer questions about Gabe Shin. Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Use three sentences maximum and keep the answer as concise as possible. 
    Context: {context}
    ChatHistory: {chatHistory}
    Question: {question}
    Helpful Answer:`;
      const customPrompt = PromptTemplate.fromTemplate(template);
      this.instance = RunnableSequence.from([
        {
          question: (input: {
            question: string;
            chatHistory?: MessageType[];
            context?: Document[];
          }) => input.question,
          chatHistory: (input: {
            question: string;
            chatHistory?: MessageType[];
            context?: Document[];
          }) => {
            if (!input.chatHistory) {
              return "";
            }

            let serialized = "";
            for (const message of input.chatHistory) {
              serialized += formatMessageTypeAsString(message);
            }
            return serialized;
          },
          context: async (input: {
            question: string;
            chatHistory?: MessageType[];
            context?: Document[];
          }) => {
            const serialized = input.context
              ? formatDocumentsAsString(input.context)
              : "";
            return serialized;
          },
        },
        customPrompt,
        model,
        new StringOutputParser(),
      ]);
    }

    return this.instance;
  }
}

export async function getLLMResponse(
  question: string,
  chatHistory: MessageType[],
  context: Document[],
) {
  const chain = SingletonChain.getInstance();
  const response = await chain.invoke({
    question,
    chatHistory,
    context,
  });

  return response;
}
