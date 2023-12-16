"use client";

import BotMessage from "@/components/chat/BotMessage";
import ChatInput from "@/components/chat/ChatInput";
import UserMessage from "@/components/chat/UserMessage";
import InsertModal from "@/components/insert-modal";
import { sendMessageToChatbot } from "@/lib/chat";
import { MessageType } from "@/lib/types/message.type";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function ChatPage() {
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openModal = () => {
    const modal = document.getElementById("myModal");
    if (!modal) return;
    modal.classList.toggle("hidden");
  };

  const sendMessage = async (message: string) => {
    setIsSending(true);
    const inputMessage: MessageType = {
      id: `${Date.now()}`,
      sender: "user",
      content: message,
      date: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, inputMessage]);

    try {
      scrollToBottom();

      const response = await sendMessageToChatbot(messages);
      const outputMessage: MessageType = {
        id: `${Date.now()}`,
        sender: "bot",
        content: response,
        date: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, outputMessage]);
      setIsSending(false);
      scrollToBottom();
    } catch (error) {
      setIsSending(false);
      const outputMessage: MessageType = {
        id: `${Date.now()}`,
        sender: "bot",
        content: "Something went wrong! Please try again later.",
        date: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, outputMessage]);
    }
  };

  const deleteAllMessages = () => {
    localStorage.removeItem("messages");
  };

  useEffect(() => {
    const cachedMessages = localStorage.getItem("messages");
    if (cachedMessages) {
      setMessages(JSON.parse(cachedMessages));
    }
  }, []);

  useEffect(() => {
    const hasVisit = localStorage.getItem("hasVisit");
    if (!hasVisit) {
      const greetings: MessageType = {
        id: `${Date.now()}`,
        sender: "bot",
        content:
          "Hi there! I am a chatbot trained to answer questions about Gabe. Please ask me anything about Gabe! (Professional interview questions only please)",
        date: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, greetings]);
      localStorage.setItem("hasVisit", "true");
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{
        opacity: [0, 1],
        translateY: [20, 0],
      }}
    >
      <section className="relative w-screen h-screen">
        <div className="w-full overflow-y-auto pb-32">
          {messages.map((message) =>
            message.sender === "bot" ? (
              <BotMessage key={message.id} message={message} />
            ) : (
              <UserMessage key={message.id} message={message} />
            ),
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 w-full items-center flex flex-col my-4 z-50">
          <ChatInput disabled={isSending} send={sendMessage} />
          <div className="flex">
            <button
              className="text-sm font-light hover:font-medium m-2 text-text"
              onClick={openModal}
            >
              Insert data
            </button>
            <button
              className="text-sm font-light hover:font-medium m-2 text-text"
              onClick={deleteAllMessages}
            >
              Delete all messages
            </button>
          </div>
          <InsertModal />
        </div>
      </section>
    </motion.div>
  );
}
