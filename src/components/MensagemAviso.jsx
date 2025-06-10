
import React from "react";

const MensagemAviso = ({ texto }) => {
  if (!texto) return null;

  return (
    <p style={{
      color: "yellow",
      backgroundColor: "black",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "10px",
      fontWeight: "bold",
      textAlign: "center",
    }}>
      {texto}
    </p>
  );
};

export default MensagemAviso;
