import React from "react";

const ServicoItem = ({ servico, preco, onEditar, onRemover }) => {
  return (
    <li
      style={{
        backgroundColor: "#f9f9f9",
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>{servico}</strong> - R$ {parseFloat(preco).toFixed(2)}
      </div>
      <div>
        <button onClick={onEditar} style={{ marginRight: 10, padding: "4px 8px" }}>
          Editar
        </button>
        <button
          onClick={onRemover}
          style={{
            padding: "4px 8px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          Remover
        </button>
      </div>
    </li>
  );
};

export default ServicoItem;
