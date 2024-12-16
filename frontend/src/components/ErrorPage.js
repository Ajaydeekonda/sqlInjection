import React from "react";
import { useLocation } from "react-router-dom";


const ErrorPage = () => {
  const location = useLocation();
  const { error } = location.state || { error: "Unknown error occurred" };

  return (
    <div className="errorContainer">
      <h1>Error</h1>
      <p>{JSON.stringify(error)}</p>
    </div>
  );
};

export default ErrorPage;
