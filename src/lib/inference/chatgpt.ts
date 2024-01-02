"use server";

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/runnables";
import { StringOutputParser } from "langchain/schema/output_parser";
import { revalidatePath } from "next/cache";

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
            chatHistory: string;
            context: string;
          }) => input.question,
          chatHistory: (input: {
            question: string;
            chatHistory: string;
            context: string;
          }) => input.chatHistory,
          context: async (input: {
            question: string;
            chatHistory: string;
            context: string;
          }) => input.context,
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
  chatHistory: string,
  context: string,
) {
  const chain = SingletonChain.getInstance();
  const response = await chain.invoke({
    question,
    chatHistory,
    context,
  });

  revalidatePath("/chat");

  return response;
}
