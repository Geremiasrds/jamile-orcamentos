import React, { useEffect, useState } from "react";
import OrcamentoForm from "./OrcamentoForm";
import OrcamentoCard from "./OrcamentoCard";

const Orcamentos = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [cliente, setCliente] = useState("");
  const [servicos, setServicos] = useState([]);
  const [editandoOrcamentoId, setEditandoOrcamentoId] = useState(null);

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("orcamentos")) || [];
    setOrcamentos(dadosSalvos);
  }, []);

  useEffect(() => {
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos));
  }, [orcamentos]);

  const adicionarOuEditarOrcamento = () => {
  if (servicos.length === 0) return; // Só impede se não tiver serviço

  const novoOrcamento = {
    id: editandoOrcamentoId || Date.now(),
    cliente: cliente.trim(), // Pode estar vazio
    servicos,
  };

  const novosOrcamentos = editandoOrcamentoId
    ? orcamentos.map((o) => (o.id === editandoOrcamentoId ? novoOrcamento : o))
    : [...orcamentos, novoOrcamento];

  setOrcamentos(novosOrcamentos);
  setCliente("");
  setServicos([]);
  setEditandoOrcamentoId(null);
};



  return (
    <div>
      <OrcamentoForm
        cliente={cliente}
        setCliente={setCliente}
        servicos={servicos}
        setServicos={setServicos}
        onSalvar={adicionarOuEditarOrcamento}
      />
      <hr />
      {orcamentos.map((orcamento) => (
        <OrcamentoCard
          key={orcamento.id}
          orcamento={orcamento}
          onEditar={() => editarOrcamento(orcamento.id)}
          onExcluir={handleExcluir}
        />
      ))}
    </div>
  );
};

export default Orcamentos;