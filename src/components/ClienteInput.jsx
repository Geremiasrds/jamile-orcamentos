import React from "react";
import { Input } from "../styles/StyledComponents";

const ClienteInput = ({ cliente, setCliente }) => (
  <Input
    type="text"
    placeholder="Nome do cliente"
    value={cliente}
    onChange={(e) => setCliente(e.target.value)}
  />
);

export default ClienteInput;
