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


      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        {/* Botão de diminuir */}
        <Button onClick={diminuirQtd} style={{ width: "40px" }}>-</Button>

        {/* Quantidade atual */}
        <div style={{ fontSize: "18px", minWidth: "50px", textAlign: "center",  color:'blue', padding: '0px 0px 0px'} }>
          <h1>{qtd}</h1>
        </div>

        {/* Botão de aumentar */}
        <Button onClick={aumentarQtd} style={{ width: "40px" }}>+</Button>
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
