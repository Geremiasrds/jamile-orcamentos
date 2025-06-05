import React, { useState, useEffect } from "react";
import ClienteInput from "./components/ClienteInput";
import ServicoForm from "./components/ServicoForm";
import ListaServicos from "./components/ListaServicos";
import OrcamentoCard from "./components/OrcamentoCard";
import { Container, Titulo, Button } from "./styles/StyledComponents";

const App = () => {
  // Carregar dados do localStorage
  const [cliente, setCliente] = useState(localStorage.getItem("cliente") || "");
  const [servicos, setServicos] = useState(() => {
    const salvos = localStorage.getItem("servicos");
    return salvos ? JSON.parse(salvos) : [];
  });
  const [orcamentos, setOrcamentos] = useState(() => {
    const salvos = localStorage.getItem("orcamentos");
    return salvos ? JSON.parse(salvos) : [];
  });

  const [editandoServicoIndex, setEditandoServicoIndex] = useState(null);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("cliente", cliente);
  }, [cliente]);

  useEffect(() => {
    localStorage.setItem("servicos", JSON.stringify(servicos));
  }, [servicos]);

  useEffect(() => {
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos));
  }, [orcamentos]);

  const adicionarServico = (novoServico) => {
    if (editandoServicoIndex !== null) {
      const novos = [...servicos];
      novos[editandoServicoIndex] = novoServico;
      setServicos(novos);
      setEditandoServicoIndex(null);
    } else {
      setServicos([...servicos, novoServico]);
    }
  };

  const editarServico = (index) => {
    setEditandoServicoIndex(index);
  };

  const excluirServico = (index) => {
    const novos = servicos.filter((_, i) => i !== index);
    setServicos(novos);
    if (editandoServicoIndex === index) setEditandoServicoIndex(null);
  };

  const adicionarOrcamento = () => {
    if (!cliente || servicos.length === 0) return;
    const novo = { cliente, servicos, data: new Date() };
    setOrcamentos([...orcamentos, novo]);
    setCliente("");
    setServicos([]);
    localStorage.removeItem("cliente");
    localStorage.removeItem("servicos");
  };

  const excluirOrcamento = (orc) => {
    setOrcamentos(orcamentos.filter(o => o !== orc));
  };

  const editarOrcamento = (orc) => {
    setCliente(orc.cliente);
    setServicos(orc.servicos);
    setOrcamentos(orcamentos.filter(o => o !== orc));
  };

  return (
    <Container>
      <Titulo>Gerador de Orçamentos</Titulo>

      <ClienteInput cliente={cliente} setCliente={setCliente} />

      <ServicoForm
        adicionarServico={adicionarServico}
        editandoServico={editandoServicoIndex !== null ? servicos[editandoServicoIndex] : null}
      />

      <ListaServicos
        servicos={servicos}
        onEditar={editarServico}
        onExcluir={excluirServico}
      />

      <Button onClick={adicionarOrcamento}>➕ Adicionar Orçamento</Button>

      {orcamentos.map((orc, index) => (
        <OrcamentoCard
          key={index}
          orcamento={orc}
          onExcluir={excluirOrcamento}
          onEditar={editarOrcamento}
        />
      ))}
    </Container>
  );
};

export default App;
