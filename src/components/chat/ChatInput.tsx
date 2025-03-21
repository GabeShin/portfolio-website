import SendButton from "@/components/button/SendButton";
import React, { useState } from "react";

export interface ChatInputProperties {
  send: (message: string) => void;
  disabled: boolean;
}

const ChatInput = ({ send, disabled }: ChatInputProperties) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      send(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      //      handleSend();
    }
  };

  return (
    <div className="w-full max-w-2xl flex items-center justify-between rounded-md bg-background p-2 shadow-md border-2 border-border text-text">
      <input
        type="text"
        aria-label="Chat input"
        className="flex-grow rounded-md p-2 bg-background"
        placeholder="Ask me any question"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={true}
      />
      <SendButton onClick={handleSend} aria-label="Send message" />
    </div>
  );
};

export default ChatInput;
