import React, { useState, useEffect } from "react";
import ClienteInput from "./components/ClienteInput";
import ServicoForm from "./components/ServicoForm";
import ListaServicos from "./components/ListaServicos";
import OrcamentoCard from "./components/OrcamentoCard";
import MensagemAviso from "./components/MensagemAviso";
import { Container, Titulo, Button } from "./styles/StyledComponents";

const App = () => {
  const [cliente, setCliente] = useState("");
  const [servicos, setServicos] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [editandoServicoIndex, setEditandoServicoIndex] = useState(-1); // -1 = nenhum editando
  const [mostrarBotaoAddOrcamento, setMostrarBotaoAddOrcamento] = useState(false);
  const [mensagemErroAtualizacao, setMensagemErroAtualizacao] = useState("");

  // Limpa mensagem após 5 segundos
  useEffect(() => {
    if (!mensagemErroAtualizacao) return;
    const timer = setTimeout(() => setMensagemErroAtualizacao(""), 5000);
    return () => clearTimeout(timer);
  }, [mensagemErroAtualizacao]);

  // Carrega dados do localStorage ao iniciar
  useEffect(() => {
    const clienteSalvo = localStorage.getItem("cliente");
    const servicosSalvos = localStorage.getItem("servicos");
    const orcamentosSalvos = localStorage.getItem("orcamentos");

    if (clienteSalvo) setCliente(JSON.parse(clienteSalvo));
    if (servicosSalvos) setServicos(JSON.parse(servicosSalvos));
    if (orcamentosSalvos) setOrcamentos(JSON.parse(orcamentosSalvos));
  }, []);

  // Salva dados no localStorage quando mudam
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
    if (editandoServicoIndex >= 0) {
      const novosServicos = [...servicos];
      novosServicos[editandoServicoIndex] = novoServico;
      setServicos(novosServicos);
      setEditandoServicoIndex(-1);
    } else {
      setServicos([...servicos, novoServico]);
    }
    setMostrarBotaoAddOrcamento(true);
  };

  const editarServico = (index, novoServico = null) => {
    if (novoServico) {
      // Atualiza serviço editado
      const novosServicos = [...servicos];
      novosServicos[index] = novoServico;
      setServicos(novosServicos);
    } else {
      // Começa a edição
      setEditandoServicoIndex(index);
    }
  };

  const excluirServico = (index) => {
    const novos = servicos.filter((_, i) => i !== index);
    setServicos(novos);

    // Cancela edição se excluir item em edição
    if (editandoServicoIndex === index) setEditandoServicoIndex(-1);

    if (novos.length === 0) setMostrarBotaoAddOrcamento(false);
  };

  const adicionarOrcamento = () => {
    if (servicos.length === 0) {
      setMensagemErroAtualizacao("Adicione ao menos um serviço antes de salvar o orçamento.");
      return;
    }

    if (!cliente.trim()) {
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
    setEditandoServicoIndex(-1);
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
        editandoServico={editandoServicoIndex >= 0 ? servicos[editandoServicoIndex] : null}
      />

      <ListaServicos
        servicos={servicos}
        onEditar={editarServico}
        onExcluir={excluirServico}
      />

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
