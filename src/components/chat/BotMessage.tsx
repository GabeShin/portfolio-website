"use client";

import FaceIcon from "./FaceIcon";
import SpinnerIcon from "./SpinnerIcon";
import { MessageType } from "@/lib/types/message.type";

export interface PropType {
  message: MessageType;
}

export default function BotMessage({ message }: PropType) {
  return (
    <div className="relative flex max-w-2xl mx-auto px-2">
      <div className="absolute flex items-center justify-center ring-2 z-10 rounded-full bg-blue-500 ring-background w-10 h-10">
        <FaceIcon width={28} height={28} color="#fff" />
      </div>
      <div className="break-words ml-6 mt-4 max-w-lg p-4 bg-gray-50 text-black border-border border-2 rounded-3xl">
        {message.content === "Invalid response" ? (
          <div className="animate-spin">
            <SpinnerIcon key={message.id} height={20} width={20} color="#333" />
          </div>
        ) : (
          message.content
        )}
      </div>
    </div>
  );
}
