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
    if (!cliente || servicos.length === 0) return;

    const novoOrcamento = {
      id: editandoOrcamentoId || Date.now(),
      cliente,
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

  const editarOrcamento = (id) => {
    const orcamento = orcamentos.find((o) => o.id === id);
    if (orcamento) {
      setCliente(orcamento.cliente);
      setServicos(orcamento.servicos);
      setEditandoOrcamentoId(id);
    }
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