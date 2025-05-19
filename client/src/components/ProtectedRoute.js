import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center text-xl">Loading...</div>;

    // If user is not authenticated, redirect to login
    if (!user) return <Navigate to="/login" />;

    // Otherwise, render the protected component
    return children;
}

export default ProtectedRoute;
