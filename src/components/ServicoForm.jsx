import React, { useEffect, useState } from "react";
import { Input, Button } from "../styles/StyledComponents";

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
    adicionarServico({ servico, qtd: Number(qtd), valorUnitario: Number(valorUnitario) });
    setServico("");
    setQtd(1);
    setValorUnitario("");
  };

  return (
    <div>
      <Input placeholder="Serviço" value={servico} onChange={e => setServico(e.target.value)} />
      <Input type="number" placeholder="Quantidade" value={qtd} onChange={e => setQtd(e.target.value)} />
      <Input
        type="number"
        placeholder="Valor Unitário"
        value={valorUnitario}
        onChange={e => setValorUnitario(e.target.value)}
      />
      <Button onClick={handleAdicionar}>
        {editandoServico ? "✏️ Atualizar Serviço" : "➕ Adicionar Serviço"}
      </Button>
      
    </div>
  );
};

export default ServicoForm;
