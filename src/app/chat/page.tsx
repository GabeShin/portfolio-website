"use client";
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "@/components/chat/chat-input";
import ChatMessage from "@/components/chat/message";
import { IMessage } from "@/interfaces/message.interface";

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

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const [disabled, setDisabled] = useState(false);

  const sendMessage = (content: string) => {
    setDisabled(true);
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
      setDisabled(false);
    }, 1000);
  };

  const deleteChat = () => {
    setMessages([]);
    localStorage.removeItem("messages");
  };

  return (
    <div className="relative flex flex-col flex-grow bg-gray-100">
      <div className="absolute top-0 bottom-0 w-full overflow-y-auto pb-24">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute bottom-0 w-full flex flex-col items-center">
        {" "}
        {/* Changed to flex-col */}
        <ChatInput send={sendMessage} disabled={disabled} />
        <button
          onClick={deleteChat}
          className="text-sm my-4 font-light hover:font-medium"
        >
          Delete Chat
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
