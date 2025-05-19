import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check for token on initial load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser({ token });
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (username, password) => {
        try {
            const response = await axios.post("https://test-ai-simple-app.onrender.com/auth/login", {
                username,
                password,
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser({ token });
            navigate("/chat");
        } catch (error) {
            console.error("Login Error:", error);
            alert("Invalid credentials. Please try again.");
        }
    };

    // Signup function
    const signup = async (username, password) => {
        try {
            const response = await axios.post("https://test-ai-simple-app.onrender.com/auth/signup", {
                username,
                password,
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser({ token });
            navigate("/chat");
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Signup failed. Please try a different username.");
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for using AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
