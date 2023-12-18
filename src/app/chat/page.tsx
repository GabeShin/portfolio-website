"use client";

import BotMessage from "@/components/chat/BotMessage";
import ChatInput from "@/components/chat/ChatInput";
import UserMessage from "@/components/chat/UserMessage";
import InsertModal from "@/components/insert-modal";
import { findSimilarDocuments } from "@/lib/chat";
import { getLLMResponse } from "@/lib/inference/chatgpt";
import { MessageType } from "@/lib/types/message.type";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

function formatMessageTypeAsString(message: MessageType) {
  return `${message.sender}: ${message.content}\n`;
}

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
      id: `${Date.now()}-user`,
      sender: "user",
      content: message,
      date: new Date(),
    };

    const placeholderMessage: MessageType = {
      id: `${Date.now()}-bot`,
      sender: "bot",
      content: "Invalid response",
      date: new Date(),
    };

    const prevMessages = messages;
    setMessages((prevMessages) => [
      ...prevMessages,
      inputMessage,
      placeholderMessage,
    ]);

    try {
      // Vercel's timeout sucks
      console.time("getReleventDocuments");
      const relevantDocumentsText = await findSimilarDocuments(message);
      console.timeEnd("getReleventDocuments");
      console.log(relevantDocumentsText);

      // serialize inputs
      const serializedDocuments = relevantDocumentsText
        ? relevantDocumentsText.join("\n")
        : "";
      let serializedChatHistory = "";
      for (const message of prevMessages) {
        serializedChatHistory += formatMessageTypeAsString(message);
      }

      console.time("getLLMResponse");
      const response = await getLLMResponse(
        message,
        serializedChatHistory,
        serializedDocuments,
      );
      console.timeEnd("getLLMResponse");

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = {
          ...newMessages[newMessages.length - 1],
          content: response,
        };
        return newMessages;
      });

      setIsSending(false);
    } catch (error) {
      console.error(error);
      console.timeEnd("getLLMResponse");
      console.timeEnd("getReleventDocuments");
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = {
          ...newMessages[newMessages.length - 1],
          content: "Sorry, something went wrong. Please try again later.",
        };
        return newMessages;
      });
      setIsSending(false);
    }
  };

  const deleteAllMessages = () => {
    localStorage.removeItem("messages");
    setMessages([]);
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
        id: `${Date.now()}-bot`,
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
    scrollToBottom();
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{
        opacity: [0, 1],
        translateY: [20, 0],
      }}
    >
      <section className="relative w-screen">
        <div className="w-full overflow-y-auto pb-32">
          {messages.map((message) =>
            message.sender === "bot" ? (
              <BotMessage key={message.id} message={message} />
            ) : (
              <UserMessage key={message.id} message={message} />
            ),
          )}
          <div key="endRef" ref={messagesEndRef} />
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
