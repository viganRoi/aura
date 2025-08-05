import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-bck text-brand text-center px-6">
            <h1 className="text-5xl font-bold mb-4">Oops! Page Not Found</h1>
            <p className="text-lg text-dark mb-6">
                The page you are looking for does not exist or has been moved.
            </p>
            <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-brand hover:bg-opacity-80 text-white font-medium rounded-lg transition duration-300"
            >
                Go Back
            </button>
        </div>
    );
};

export default ErrorPage;
