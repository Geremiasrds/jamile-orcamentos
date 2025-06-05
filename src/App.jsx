import React, { useState } from "react";
import ClienteInput from "./components/ClienteInput";
import ServicoForm from "./components/ServicoForm";
import ListaServicos from "./components/ListaServicos";
import OrcamentoCard from "./components/OrcamentoCard";
import { Container, Titulo, Button } from "./styles/StyledComponents";

const App = () => {
  const [cliente, setCliente] = useState("");
  const [servicos, setServicos] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [editandoServicoIndex, setEditandoServicoIndex] = useState(null);

  // Estado para controlar visibilidade do botão "Adicionar Orçamento"
  const [mostrarBotaoAddOrcamento, setMostrarBotaoAddOrcamento] = useState(false);

  const adicionarServico = (novoServico) => {
    if (editandoServicoIndex !== null) {
      const novosServicos = [...servicos];
      novosServicos[editandoServicoIndex] = novoServico;
      setServicos(novosServicos);
      setEditandoServicoIndex(null);
    } else {
      setServicos([...servicos, novoServico]);
    }
    // Exibe botão ao adicionar um serviço
    setMostrarBotaoAddOrcamento(true);
  };

  const editarServico = (index) => {
    setEditandoServicoIndex(index);
  };

  const excluirServico = (index) => {
    const novos = servicos.filter((_, i) => i !== index);
    setServicos(novos);
    if (editandoServicoIndex === index) setEditandoServicoIndex(null);
    // Se não houver mais serviços, esconder botão "Adicionar Orçamento"
    if (novos.length === 0) setMostrarBotaoAddOrcamento(false);
  };

  const adicionarOrcamento = () => {
    if (!cliente || servicos.length === 0) return;
    setOrcamentos([...orcamentos, { cliente, servicos, data: new Date() }]);
    setCliente("");
    setServicos([]);
    // Esconder o botão após adicionar o orçamento
    setMostrarBotaoAddOrcamento(false);
  };

  const excluirOrcamento = (orc) => {
    setOrcamentos(orcamentos.filter(o => o !== orc));
  };

  const editarOrcamento = (orc) => {
    setCliente(orc.cliente);
    setServicos(orc.servicos);
    setOrcamentos(orcamentos.filter(o => o !== orc));
    // Mostrar botão para atualizar orçamento editado
    setMostrarBotaoAddOrcamento(true);
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
