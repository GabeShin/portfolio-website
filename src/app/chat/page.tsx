"use client";
import ChatInput from "@/components/chat/chat-input";
import ChatMessage from "@/components/chat/message";
import { IMessage } from "@/interfaces/message.interface";
import React, { useState, useEffect, useRef } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (content: string) => {
    const newMessage: IMessage = {
      id: `${Date.now()}`,
      sender: "user",
      content,
      date: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const responseMessage: IMessage = {
      id: `${Date.now() + 1}`,
      sender: "bot",
      content: "I'm a bot, I don't know how to respond yet",
      date: new Date(),
    };

    setTimeout(() => {
      scrollToBottom();

      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col flex-grow bg-gray-100">
      <div className="absolute top-0 bottom-0 w-full overflow-y-auto pb-24">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute bottom-0 w-full flex justify-center">
        <ChatInput send={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
