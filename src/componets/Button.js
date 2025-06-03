import React from "react";

const Button = ({ onClick, children, color = "#007bff", style }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        backgroundColor: color,
        color: "#fff",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        margin: 5,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
