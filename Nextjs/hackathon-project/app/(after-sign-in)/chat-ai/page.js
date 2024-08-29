"use client";

import React, { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import DOMPurify from "dompurify";

const ChatAI = () => {
  const [userInput, setUserInput] = useState(""); // Stores the user's input
  const [chatHistory, setChatHistory] = useState([]); // Stores the conversation history
  const [loading, setLoading] = useState(false); // Loading state for the button

  const sendQuery = async () => {
    if (userInput.trim() === "") return; // If user input is empty, don't send the query

    setLoading(true);
    try {
      // Send the user's query to the backend
      const response = await axios.post("/api", {
        type: "chat-ai", // Specify the type here
        prompt: userInput, // Send the user's input as the prompt
      });

      // Update chat history with both user and AI responses
      setChatHistory((prev) => [
        ...prev,
        { user: userInput, bot: response.data.text }, // Make sure the field names match
      ]);

      setUserInput(""); // Clear the input field after sending
    } catch (error) {
      console.error("Error interacting with chatbot:", error);
      // If there is an error, add an error message to the chat history
      setChatHistory((prev) => [
        ...prev,
        { user: userInput, bot: "Something went wrong. Please try again." },
      ]);
    }
    setLoading(false); // Set loading state to false after the query is sent
  };

  return (
    <div className="chat-container p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Chat History */}
      <div className="chat-box mb-4 bg-gray-50 p-4 rounded-lg shadow-inner h-80 overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-message mb-6">
            {/* User Message */}
            <div className="user-message text-indigo-600 font-medium bg-indigo-100 p-3 rounded-lg mb-2">
              You: {chat.user}
            </div>
            {/* AI Message */}
            <div className="bot-message flex items-start text-gray-700 bg-green-50 p-3 rounded-lg">
              <img
                src="/robot-assistant.jpg"
                alt="AI Avatar"
                className="w-8 h-8 rounded-full mr-3 shadow-md"
              />
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: sanitizeBotResponse(chat.bot),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Input Field and Send Button */}
      <div className="flex items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="input-field border border-gray-300 p-3 w-full text-gray-800 bg-gray-100 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Ask about your plant..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendQuery(); // Send the query on pressing Enter
          }}
        />
        <button
          onClick={sendQuery}
          className="send-btn bg-indigo-500 text-white px-5 py-3 rounded-r-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Thinking...</span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

// Function to sanitize and convert markdown to HTML
const sanitizeBotResponse = (response) => {
  // Convert markdown to HTML
  const html = marked(response); // Convert markdown to HTML
  // Sanitize HTML to prevent XSS attacks
  return DOMPurify.sanitize(html);
};

export default ChatAI;
