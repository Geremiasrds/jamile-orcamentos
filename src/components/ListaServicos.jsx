import React from "react";
import { Card, CardBody, ButtonGroup, ButtonMini } from "../styles/StyledComponents";

const ListaServicos = ({ servicos, onEditar, onExcluir }) => {
  return (
    <Card>
      <CardBody>
        {servicos.map((s, index) => (
          <div className=""
            key={index}
            style={{
              display: "flex",               // Alinha conteúdo em linha
              justifyContent: "space-between", // Espaço entre serviço e botões           // Alinha verticalmente
              marginBottom: "5px",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>{s.qtd}x {s.servico}</strong> - R$ {s.valorUnitario.toFixed(2)} cada
            </p>
            <ButtonGroup>
              <ButtonMini onClick={() => onEditar(index)}>✏️</ButtonMini>
              <ButtonMini onClick={() => onExcluir(index)}>❌</ButtonMini>
            </ButtonGroup>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default ListaServicos;
