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
    if (!value.trim()) {
      setError("O nome do cliente é obrigatório!");
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
      setError("O nome só pode conter letras e espaços!");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;

    // Remove qualquer caractere que não seja letra (inclusive acentuadas)
    value = value.replace(/[^A-Za-zÀ-ÿ]/g, "");

    // Limita repetições da mesma letra a no máximo 2 (ex: "aaa" → "aa")
    value = value.replace(/(\w)\1{2,}/g, "$1$1");

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
    fontSize: "14px",
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
