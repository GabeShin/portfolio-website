import React, { useState } from "react";
import SendButton from "../common/send-button";

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
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-screen-md min-w-1/2 flex items-center justify-between rounded-md p-2 bg-white shadow-md border-2 border-gray-100">
      <input
        type="text"
        aria-label="Chat input"
        className="flex-grow rounded-md p-2"
        placeholder="Ask me any question"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <SendButton onClick={handleSend} aria-label="Send message" />
    </div>
  );
};

export default ChatInput;
