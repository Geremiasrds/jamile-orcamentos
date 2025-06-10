import React, { useState } from "react";
import { Input } from "../styles/StyledComponents";

const wrapperStyle = {
  position: "relative",
  width: "100%",
  maxWidth: "400px", // limite máximo do input
  margin: "0 auto",  // centraliza horizontalmente
};
const messageStyle = (error) => ({
  position: "absolute",
  right: "50px",
  top: "50%",
  transform: "translateY(-50%)",
  color: error ? "red" : "green",
  fontSize: "16px",
  pointerEvents: "none",
});

const ClienteInput = ({ cliente, setCliente }) => {
  const [error, setError] = useState("");

  const validate = (value) => {
    if (!value.trim()) {
      setError("O nome do cliente é obrigatório");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCliente(value);
    validate(value);
  };

  // Ajusta estilo da borda do input conforme erro
  const inputStyle = {
    paddingRight: "30px",
     border: error ? "1px solid red" : "1px solid green",
    fontSize: "16px",
    outline: "none",
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
        <span style={{...messageStyle(true), left: "20px"}}>{error}</span>
      ) : cliente.trim() ? (
        <span style={{...messageStyle(false), right: "0", fontWeight: "bold"}}>✔</span>
      ) : null}
    </div>
  );
};

export default ClienteInput;
