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

  const profileImageSrc =
    message.sender === "user" ? "/face.svg" : "/robot.svg";

  return (
    <article
      className={`flex items-start justify-center w-full min-w-1/2 mx-auto pb-6 border-b border-b-gray-200 ${getStylesBasedOnSender(
        message.sender
      )}`}
    >
      <div className={`w-8 h-8 mr-4 mt-4`}>
        <img
          src={profileImageSrc}
          alt={message.sender}
          className="w-full h-full"
        />
      </div>
      <div className="w-full max-w-lg flex-1 break-words">
        <ReactMarkdown
          className="no-tailwind markdown-content"
          children={message.content}
          remarkPlugins={[gfm]}
          skipHtml={true}
        />
      </div>
    </article>
  );
};

export default ChatMessage;
