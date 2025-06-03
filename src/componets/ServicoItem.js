import React from "react";
import Button from "./Button";

function ServicoItem({ servico, preco, onEditar, onRemover }) {
  return (
    <li style={{ marginBottom: 10 }}>
      <span style={{ marginRight: 10 }}>
        <strong>{servico}</strong> - R$ {parseFloat(preco).toFixed(2)}
      </span>
      <Button onClick={onEditar} color="#ffc107" style={{ marginRight: 5 }}>
        Editar
      </Button>
      <Button onClick={onRemover} color="#dc3545">
        Remover
      </Button>
    </li>
  );
}

export default ServicoItem;
