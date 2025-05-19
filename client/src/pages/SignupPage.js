import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function SignupPage() {
    const { signup } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(username, password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-teal-500">
            <div className="bg-white shadow-lg rounded-2xl p-10 w-96">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded-lg w-full hover:bg-green-700 transition-all"
                    >
                        Signup
                    </button>
                </form>
                <Link to="/login" className="block text-center text-green-600 mt-4 underline">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
}

export default SignupPage;
