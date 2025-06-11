import React, { useEffect, useState } from "react";

import {
  Input,
  QuantidadeContainer,
  QuantidadeBotao,
  QuantidadeBox,
  QuantidadeNumero,
  QuantidadeLabel,
  AddButton, // importe aqui
} from "../styles/StyledComponents";

const ServicoForm = ({ adicionarServico, editandoServico }) => {
  const [servico, setServico] = useState("");
  const [qtd, setQtd] = useState(1);
  const [valorUnitario, setValorUnitario] = useState("");

  useEffect(() => {
    if (editandoServico) {
      setServico(editandoServico.servico);
      setQtd(editandoServico.qtd);
      setValorUnitario(editandoServico.valorUnitario);
    }
  }, [editandoServico]);

  const handleAdicionar = () => {
    if (!servico || !valorUnitario || qtd <= 0) return;
    adicionarServico({
      servico,
      qtd: Number(qtd),
      valorUnitario: Number(valorUnitario),
    });
    setServico("");
    setQtd(1);
    setValorUnitario("");
  };

  const aumentarQtd = () => setQtd((prev) => prev + 1);
  const diminuirQtd = () => setQtd((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <Input
        placeholder="Serviço ex: Instalação"
        value={servico}
        onChange={(e) => setServico(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Valor Unitário ex: 200"
        value={valorUnitario}
        onChange={(e) => setValorUnitario(e.target.value)}
      />

      <QuantidadeContainer>
        <QuantidadeBotao onClick={diminuirQtd}>➖</QuantidadeBotao>

        <QuantidadeBox>
          <QuantidadeNumero>{qtd}</QuantidadeNumero>
          <QuantidadeLabel>Serviços</QuantidadeLabel>
        </QuantidadeBox>

        <QuantidadeBotao onClick={aumentarQtd}>➕</QuantidadeBotao>
      </QuantidadeContainer>

      <AddButton onClick={handleAdicionar}>
        {editandoServico ? "✏️ Atualizar Serviço" : "➕ Adicionar Serviço"}
      </AddButton>
    </div>
  );
};

export default ServicoForm;
