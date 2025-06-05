import React from "react";
import { Card, CardBody, ButtonGroup, ButtonMini } from "../styles/StyledComponents";

const ListaServicos = ({ servicos, onEditar, onExcluir }) => {
  return (
    <>
      {servicos.map((s, index) => (
        <Card key={index}>
          <CardBody>
            <p>
              <strong>{s.qtd}x {s.servico}</strong> - R$ {s.valorUnitario.toFixed(2)} cada
            </p>
          </CardBody>
          <ButtonGroup>
            <ButtonMini onClick={() => onEditar(index)}>✏️ Editar</ButtonMini>
            <ButtonMini onClick={() => onExcluir(index)}>❌ Excluir</ButtonMini>
          </ButtonGroup>
        </Card>
      ))}
    </>
  );
};

export default ListaServicos;
