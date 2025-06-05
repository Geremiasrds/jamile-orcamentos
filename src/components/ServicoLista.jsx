import React from "react";
import { ListItem } from "../styles/StyledComponents";

const ServicoLista = ({ servicos }) => (
  <ul>
    {servicos.map((s, index) => (
      <ListItem key={index}>
        {s.qtd}x {s.servico} a R$ {s.valorUnitario.toFixed(2)} cada
      </ListItem>
    ))}
  </ul>
);

export default ServicoLista;
