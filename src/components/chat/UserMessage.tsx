"use client";

import { MessageType } from "@/lib/types/message.type";

export interface PropType {
  message: MessageType;
}

export default function UserMessage({ message }: PropType) {
  return (
    <div className="px-2 my-3 flex justify-end items-start max-w-xl mx-auto">
      <div className="break-words max-w-md p-4 text-white bg-blue-500 border-border border-2 rounded-3xl">
        {message.content}
      </div>
    </div>
  );
}
