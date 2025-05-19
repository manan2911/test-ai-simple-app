import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to the AI Support Chat</h1>
            <Link to="/signup" className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700">
                Get Started
            </Link>
            <Link to="/login" className="mt-4 text-blue-500 underline">Already have an account? Login</Link>
        </div>
    );
}

export default HomePage;
