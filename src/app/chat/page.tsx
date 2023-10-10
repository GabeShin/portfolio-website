"use client";
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "@/components/chat/chat-input";
import ChatMessage from "@/components/chat/message";
import { IMessage } from "@/interfaces/message.interface";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import path from "path";

const ChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [disabled, setDisabled] = useState(false);

  const sendMessage = async (content: string) => {
    setDisabled(true);
    const newMessage: IMessage = {
      id: `${Date.now()}`,
      sender: "user",
      content,
      date: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: content }),
    });

    const { data } = await response.json();
    const responseText = data?.responseText;

    const responseMessage: IMessage = {
      id: `${Date.now() + 1}`,
      sender: "bot",
      content: responseText,
      date: new Date(),
    };

    scrollToBottom();
    setMessages((prevMessages) => [...prevMessages, responseMessage]);
    setDisabled(false);
  };

  const deleteChat = () => {
    setMessages([]);
    localStorage.removeItem("messages");
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

  useEffect(() => {
    const message = searchParams?.get("message");
    if (message && message.length > 0) {
      sendMessage(message);

      // Remove query parameters
      if (pathname) {
        router.replace(pathname);
      }
    }
  }, [searchParams]);

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
