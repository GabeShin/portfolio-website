import React, { useState } from "react";
import SendButton from "../common/send-button"; // Assuming that SendButton is a wrapper around some button component

export interface ChatInputProperties {
  send: (message: string) => void;
}

const ChatInput = ({ send }: ChatInputProperties) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      send(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    // Parent container surrounding ChatInput
    <div className="w-full max-w-screen-md min-w-1/2 flex items-center justify-between rounded-md p-2 bg-white mb-8 shadow-md border-2 border-gray-100">
      <input
        type="text"
        className="flex-grow rounded-md p-2"
        placeholder="Ask me any question about myself"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendButton onClick={handleSend} />
    </div>
  );
};

export default ChatInput;
