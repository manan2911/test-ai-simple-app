import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// Simple environment switch without .env file
const API_BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "http://localhost:5000";

function ChatPage() {
    const { logout } = useAuth();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const chatContainerRef = useRef(null);

    // Fetch chat history on page load
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/chat/history`);
                if (response.data.messages) {
                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };

        fetchChatHistory();
    }, []);

    // Scroll to the latest message
    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [messages]);

    // Cooldown timer for rate limiting
    useEffect(() => {
        if (cooldown > 0) {
            const interval = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [cooldown]);

    // Handle sending a new message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim() || cooldown > 0) return;

        // Add user message instantly
        const userMessage = { sender: "user", text: message.trim() };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            setIsTyping(true);
            const response = await axios.post(`${API_BASE_URL}/chat/send`, {
                text: message.trim(),
            });

            // Append the AI response
            const aiMessages = response.data.messages.filter(msg => msg.sender === "ai");
            setMessages((prevMessages) => [...prevMessages, ...aiMessages]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "error", text: "Technical error. Please try again." }
            ]);
        } finally {
            setIsTyping(false);
            setMessage("");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg flex flex-col overflow-hidden h-full">
                <div className="flex justify-between items-center bg-indigo-600 text-white p-4 rounded-t-lg">
                    <h2 className="text-lg font-bold">AI Chat</h2>
                    <button onClick={logout} className="bg-red-600 py-1 px-4 rounded-lg hover:bg-red-700">
                        Logout
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto bg-gray-50 p-4" ref={chatContainerRef}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-4 p-3 rounded-lg max-w-lg ${
                                msg.sender === "user"
                                    ? "bg-blue-600 text-white ml-auto"
                                    : msg.sender === "ai"
                                    ? "bg-gray-300 text-gray-900 mr-auto"
                                    : "bg-red-600 text-white mr-auto"
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="p-3 bg-gray-300 text-gray-900 mr-auto rounded-lg max-w-lg">
                            AI is typing...
                        </div>
                    )}

                    {cooldown > 0 && (
                        <div className="p-3 bg-red-600 text-white mr-auto rounded-lg max-w-lg">
                            Please wait {cooldown} seconds before sending another message.
                        </div>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="flex p-4 bg-gray-200">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow p-2 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        disabled={cooldown > 0}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") handleSendMessage(e);
                        }}
                    />
                    <button
                        type="submit"
                        className={`px-4 rounded-r-lg ${
                            cooldown > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                        disabled={cooldown > 0}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatPage;
