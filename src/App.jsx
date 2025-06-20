import React, { useState, useEffect } from "react";
import ClienteInput from "./components/ClienteInput";
import ServicoForm from "./components/ServicoForm";
import ListaServicos from "./components/ListaServicos";
import OrcamentoCard from "./components/OrcamentoCard";
import MensagemAviso from "./components/MensagemAviso"; // ⬅️ Importando o novo componente
import { Container, Titulo, Button } from "./styles/StyledComponents";

const App = () => {
  const [cliente, setCliente] = useState("");
  const [servicos, setServicos] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [editandoServicoIndex, setEditandoServicoIndex] = useState(null);
  const [mostrarBotaoAddOrcamento, setMostrarBotaoAddOrcamento] = useState(false);
  const [mensagemErroAtualizacao, setMensagemErroAtualizacao] = useState("");

  // Limpa mensagem depois de 3s
  useEffect(() => {
    if (!mensagemErroAtualizacao) return;
    const timer = setTimeout(() => {
      setMensagemErroAtualizacao("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [mensagemErroAtualizacao]);

  // Carrega dados do localStorage no início
  useEffect(() => {
    const clienteSalvo = localStorage.getItem("cliente");
    const servicosSalvos = localStorage.getItem("servicos");
    const orcamentosSalvos = localStorage.getItem("orcamentos");

    if (clienteSalvo) setCliente(JSON.parse(clienteSalvo));
    if (servicosSalvos) setServicos(JSON.parse(servicosSalvos));
    if (orcamentosSalvos) setOrcamentos(JSON.parse(orcamentosSalvos));
  }, []);

  // Salva no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem("cliente", JSON.stringify(cliente));
  }, [cliente]);

  useEffect(() => {
    localStorage.setItem("servicos", JSON.stringify(servicos));
  }, [servicos]);

  useEffect(() => {
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos));
  }, [orcamentos]);

  const adicionarServico = (novoServico) => {
    if (editandoServicoIndex !== null) {
      const novosServicos = [...servicos];
      novosServicos[editandoServicoIndex] = novoServico;
      setServicos(novosServicos);
      setEditandoServicoIndex(null);
    } else {
      setServicos([...servicos, novoServico]);
    }
    setMostrarBotaoAddOrcamento(true);
  };

  const editarServico = (index, novoServico = null) => {
    if (novoServico) {
      const novosServicos = [...servicos];
      novosServicos[index] = novoServico;
      setServicos(novosServicos);
    } else {
      setEditandoServicoIndex(index);
    }
  };

  const excluirServico = (index) => {
    const novos = servicos.filter((_, i) => i !== index);
    setServicos(novos);
    if (editandoServicoIndex === index) setEditandoServicoIndex(null);
    if (novos.length === 0) setMostrarBotaoAddOrcamento(false);
  };

  const adicionarOrcamento = () => {
    if (servicos.length === 0) {
      setMensagemErroAtualizacao("Adicione ao menos um serviço antes de salvar o orçamento");
      return;
    }

    // Permite cliente vazio
    if (!cliente) {
      setMensagemErroAtualizacao("Cliente está vazio, mas orçamento será salvo mesmo assim.");
    } else {
      setMensagemErroAtualizacao("");
    }

    const novoOrcamento = {
      cliente,
      servicos,
      data: new Date(),
    };

    setOrcamentos([...orcamentos, novoOrcamento]);
    setCliente("");
    setServicos([]);
    setMostrarBotaoAddOrcamento(false);
  };

  const excluirOrcamento = (orc) => {
    setOrcamentos(orcamentos.filter((o) => o !== orc));
  };

  const editarOrcamento = (orc) => {
    setCliente(orc.cliente);
    setServicos(orc.servicos);
    setOrcamentos(orcamentos.filter((o) => o !== orc));
    setMostrarBotaoAddOrcamento(true);
  };

  return (
    <Container>
      <Titulo>BIG REFRIGERAÇÃO</Titulo>

      <MensagemAviso texto={mensagemErroAtualizacao} />

      <ClienteInput cliente={cliente} setCliente={setCliente} />

      <ServicoForm
        adicionarServico={adicionarServico}
        editandoServico={editandoServicoIndex !== null ? servicos[editandoServicoIndex] : null}
      />

      <ListaServicos servicos={servicos} onEditar={editarServico} onExcluir={excluirServico} />

      {mostrarBotaoAddOrcamento && (
        <Button onClick={adicionarOrcamento}>➕ Adicionar Orçamento</Button>
      )}

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
