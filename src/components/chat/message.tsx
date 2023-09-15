import { IMessage } from "@/interfaces/message.interface";
import React from "react";
import ReactMarkdown from "react-markdown";

export interface ChatMessageProps {
  message: IMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start justify-center w-full min-w-1/2 mx-auto ${
        message.sender === "user" ? "bg-gray-100" : "bg-white"
      } pb-6 border-b-gray-200 border-b`}
    >
      {/* Profile */}
      <div
        className={`w-8 h-8 p-2 mr-4 mt-4 ${
          message.sender === "user" ? "bg-blue-400" : "bg-red-400"
        }`}
      ></div>
      {/* Content */}
      <div className="w-full max-w-lg flex-1 break-words">
        <ReactMarkdown
          className="no-tailwind markdown-content"
          children={message.content}
        />
      </div>
    </div>
  );
};

export default ChatMessage;
