import React from "react";

function InputField({ type = "text", value, onChange, placeholder, style = {} }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "8px",
        borderRadius: 4,
        border: "1px solid #ccc",
        marginRight: 8,
        ...style,
      }}
    />
  );
}

export default InputField;
