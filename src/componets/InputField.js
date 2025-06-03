import React from "react";

const InputField = ({ type = "text", placeholder, value, onChange, style }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ margin: 5, padding: 8, borderRadius: 4, border: "1px solid #ccc", ...style }}
    />
  );
};

export default InputField;
