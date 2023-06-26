import React from "react";
import "../assets/styles/loader.css";

export const Loader: React.FC = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner"></div>
    </div>
  );
};
