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
})

const ClienteInput = ({ cliente, setCliente }) => {
  const [error, setError] = useState("");

  
  const validate = (value) => {
    if (!value.trim()) {
      setError("O nome do cliente é obrigatório!");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCliente(value);
    validate(value);
  };


  const isValid = cliente.trim() !== "";
  const hasError = error !== "";



  const inputStyle = {
    border: hasError
      ? "1px solid red"
      : isValid
        ? "1px solid green"
        : "2px solid black",
    fontSize: "16px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };



  return (
    <div style={wrapperStyle}>
      <Input
        type="text"
        placeholder={error ? "" : "Nome do cliente"}
        value={cliente}
        onChange={handleChange}
        style={inputStyle}
      />
      {error ? (
        <span style={{ ...messageStyle(true), left: "20px" }}>{error}</span>
      ) : cliente.trim() ? (
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
      ) : null}
    </div>
  );
};

export default ClienteInput;
