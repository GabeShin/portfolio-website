import React, { useEffect } from "react";
import { useState } from "react";
import SendButton from "../common/send-button";

export default function SearchBar() {
  const [isHealthy, setIsHealthy] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const checkHealth = async () => {
    // const response = await fetch("/api/health");
    // const { isHealthy } = await response.json();
    const isHealthy = true;
    return isHealthy;
  };

  useEffect(() => {
    // Check server health initially and then every 5 seconds
    const intervalId = setInterval(async () => {
      const result = await checkHealth();
      setIsHealthy(result);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSendClick = () => {
    if (!inputValue) return;
    console.log("Send button clicked, input value:", inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputValue) return;

    if (event.key === "Enter") {
      console.log("Enter pressed, input value:", inputValue);
    }
  };

  return (
    <div className="flex items-center min-w-max bg-white m-5 p-3 rounded-md border-2 border-gray-400">
      <div className="relative">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="/profile_picture.jpeg"
          alt="Profile"
        />
        <div
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
            isHealthy ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
      </div>
      <input
        className="flex-1 ml-2 rounded-md bg-gray-50 border-2 border-gray-100 hover:border-gray-200 px-4 py-2"
        type="text"
        placeholder="Ask me any question about myself."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendButton onClick={handleSendClick} />
    </div>
  );
}
