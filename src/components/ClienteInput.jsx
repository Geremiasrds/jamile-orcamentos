import React, { useState } from "react";
import { Input } from "../styles/StyledComponents";

const wrapperStyle = {
  position: "relative",
  width: "100%",
  maxWidth: "300px",
  margin: "0 auto",
};

const messageStyle = (error) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  color: error ? "red" : "green",
  fontSize: "12px",
  pointerEvents: "none",
});

const ClienteInput = ({ cliente, setCliente }) => {
  const [error, setError] = useState("");

  const validate = (value) => {
    if (value.trim() !== "" && !/^[A-Za-zÀ-ÿ\s]*$/.test(value)) {
      setError("O nome só pode conter letras e espaços!");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCliente(value);
    validate(value);
  };

  const isValid = cliente.trim() !== "" && error === "";
  const hasError = error !== "";

  const inputStyle = {
    border: hasError
      ? "1px solid red"
      : isValid
      ? "1px solid green"
      : "2px solid black",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={wrapperStyle}>
      <Input
        type="text"
        placeholder="Nome do cliente"
        value={cliente}
        onChange={handleChange}
        style={inputStyle}
      />
      {hasError && (
        <span style={{ ...messageStyle(true), left: "20px" }}>{error}</span>
      )}
      {isValid && (
        <span
          style={{
            ...messageStyle(false),
            right: "10px",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        >
          ✔
        </span>
      )}
    </div>
  );
};

export default ClienteInput;
