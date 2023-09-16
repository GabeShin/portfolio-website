import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { IMessage } from "@/interfaces/message.interface";
import React from "react";

export interface ChatMessageProps {
  message: IMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const getStylesBasedOnSender = (sender: string) => {
    return sender === "user" ? "bg-gray-100" : "bg-white";
  };

  return (
    <article
      className={`flex items-start justify-center w-full min-w-1/2 mx-auto pb-6 border-b border-b-gray-200 ${getStylesBasedOnSender(
        message.sender
      )}`}
    >
      <header
        className={`w-8 h-8 p-2 mr-4 mt-4 ${
          message.sender === "user" ? "bg-blue-400" : "bg-red-400"
        }`}
      >
        {/* Profile Image Here */}
      </header>
      <section className="w-full max-w-lg flex-1 break-words">
        <ReactMarkdown
          className="no-tailwind markdown-content"
          children={message.content}
          remarkPlugins={[gfm]}
          skipHtml={true}
        />
      </section>
    </article>
  );
};

export default ChatMessage;
