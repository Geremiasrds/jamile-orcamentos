import React, { useEffect, useState } from "react";
import { Input, Button } from "../styles/StyledComponents";

const ServicoForm = ({ adicionarServico, editandoServico }) => {
  const [servico, setServico] = useState(""); // Nome do serviço
  const [qtd, setQtd] = useState(1); // Quantidade do serviço
  const [valorUnitario, setValorUnitario] = useState(""); // Valor por unidade

  // Se estiver editando, preenche os campos com os dados do serviço
  useEffect(() => {
    if (editandoServico) {
      setServico(editandoServico.servico);
      setQtd(editandoServico.qtd);
      setValorUnitario(editandoServico.valorUnitario);
    }
  }, [editandoServico]);

  // Função para adicionar ou atualizar o serviço
  const handleAdicionar = () => {
    if (!servico || !valorUnitario || qtd <= 0) return;
    adicionarServico({
      servico,
      qtd: Number(qtd),
      valorUnitario: Number(valorUnitario),
    });
    // Limpa os campos
    setServico("");
    setQtd(1);
    setValorUnitario("");
  };

  // Funções para incrementar ou decrementar a quantidade
  const aumentarQtd = () => setQtd(prev => prev + 1);
  const diminuirQtd = () => setQtd(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      
      {/* Campo do nome do serviço */}
      <Input
        placeholder="Serviço ex: Instalação"
        value={servico}
        onChange={e => setServico(e.target.value)}
      />


<Input
        type="number"
        placeholder="Valor Unitário ex: 200"
        value={valorUnitario}
        onChange={e => setValorUnitario(e.target.value)}
      />


      <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
        {/* Botão de diminuir */}
        <Button onClick={diminuirQtd} style={{ width: "" }}>➖</Button>

        {/* Quantidade atual */}
        <div style={{ fontSize: "16px", textAlign: "center",  color:'green', border: '1px solid black', borderRadius: '10px'} }>
          <h3>{qtd} Serviços</h3>
        </div>

        {/* Botão de aumentar */}
        <Button onClick={aumentarQtd} style={{ width: "" }}>➕</Button>
      </div>

      {/* Campo de valor unitário */}
      

      {/* Botão para adicionar ou atualizar */}
      <Button onClick={handleAdicionar}>
        {editandoServico ? "✏️ Atualizar Serviço" : "➕ Adicionar Serviço"}
      </Button>
    </div>
  );
};

export default ServicoForm;
