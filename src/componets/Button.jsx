import React from "react";

function Button({ children, onClick, color = "#007bff", style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: "#fff",
        border: "none",
        padding: "8px 16px",
        borderRadius: 4,
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
