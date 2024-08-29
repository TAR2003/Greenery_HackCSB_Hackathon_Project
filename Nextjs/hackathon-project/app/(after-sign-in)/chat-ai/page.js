"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { marked } from "marked";
import DOMPurify from "dompurify";

const ChatAI = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  // Ref to the chat container
  const chatContainerRef = useRef(null);

  // Smooth scroll to bottom function
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Automatically scroll to the bottom whenever chatHistory changes
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const sendQuery = async () => {
    // Check if user input is empty
    if (userInput.trim() === "") {
      setErrorMessage("Please enter a message before sending.");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages
    setLoading(true);

    try {
      const response = await axios.post("/api", {
        type: "chat-ai",
        prompt: userInput,
      });

      setChatHistory((prev) => [
        ...prev,
        { user: userInput, bot: response.data.text },
      ]);

      setUserInput("");
    } catch (error) {
      console.error("Error interacting with chatbot:", error);
      setChatHistory((prev) => [
        ...prev,
        { user: userInput, bot: "Something went wrong. Please try again." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
      {/* Chat Box */}
      <div className="chat-container w-full max-w-3xl bg-white bg-opacity-90 p-6 rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Chat with AI
        </h1>
        <div
          ref={chatContainerRef}
          className="chat-box h-[400px] md:h-[500px] bg-gray-100 p-4 rounded-lg shadow-inner overflow-y-auto"
        >
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-message mb-4 animate-fade-in">
              {/* User Message */}
              <div className="user-message bg-blue-200 p-3 rounded-xl mb-2 text-black">
                <strong>You:</strong> {chat.user}
              </div>
              {/* AI Message */}
              <div className="bot-message flex items-start p-3 bg-green-200 rounded-xl">
                <img
                  src="/robot-assistant.jpg"
                  alt="AI Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeBotResponse(chat.bot),
                  }}
                  className="text-black"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-600 text-center mt-2">{errorMessage}</div>
        )}

        {/* Input Field and Send Button */}
        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              if (errorMessage) setErrorMessage(""); // Clear error on typing
            }}
            className="input-field w-full p-3 rounded-xl shadow-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ask about your plant..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendQuery();
            }}
          />

          <button
            onClick={sendQuery}
            className="send-btn bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Function to sanitize and convert markdown to HTML
const sanitizeBotResponse = (response) => {
  const html = marked(response);
  return DOMPurify.sanitize(html);
};

export default ChatAI;
