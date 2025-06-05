import React from "react";

const OrcamentoForm = ({ cliente, setCliente, servicos, setServicos, onSalvar }) => {
  const adicionarServico = () => {
    setServicos([...servicos, { servico: "", qtd: 1, valorUnitario: 0 }]);
  };

  const atualizarServico = (index, campo, valor) => {
    const novosServicos = [...servicos];
    novosServicos[index][campo] = campo === "servico" ? valor : Number(valor);
    setServicos(novosServicos);
  };

  const removerServico = (index) => {
    setServicos(servicos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Novo Orçamento</h2>
      <input
        type="text"
        placeholder="Nome do cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />

      {servicos.map((s, i) => (
        <div key={i}>
          <input
            type="text"
            placeholder="Serviço"
            value={s.servico}
            onChange={(e) => atualizarServico(i, "servico", e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={s.qtd}
            onChange={(e) => atualizarServico(i, "qtd", e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor unitario do serviço"
            value={s.valorUnitario}
            onChange={(e) => atualizarServico(i, "valorUnitario", e.target.value)}
          />
          <button onClick={() => removerServico(i)}>Excluir</button>
        </div>
      ))}

      <button onClick={adicionarServico}>Adicionar Serviço</button>
      <button onClick={onSalvar}>Salvar Orçamento</button>
    </div>
  );
};

export default OrcamentoForm;