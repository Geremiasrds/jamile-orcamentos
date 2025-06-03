import React, { useState } from "react";


import gerarPDF from "./componets/GeradorPDF";
import { estilos } from "./componets/Estilos"; 

import Button from "./componets/Button";
import InputField from "./componets/InputField";
import ServicoItem from "./componets/ServicoItem";

function App() {
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [servico, setServico] = useState("");
  const [preco, setPreco] = useState("");
  const [servicos, setServicos] = useState([]);

  const adicionarServico = () => {
    if (servico && preco) {
      setServicos([...servicos, { servico, preco }]);
      setServico("");
      setPreco("");
    }
  };

  const removerServico = (index) => {
    setServicos(servicos.filter((_, i) => i !== index));
  };

  const editarServico = (index) => {
    const item = servicos[index];
    setServico(item.servico);
    setPreco(item.preco);
    removerServico(index);
  };

  return (
    <div style={estilos.container}>
      <h1 style={estilos.titulo}>Orçamento Big Refrigeração</h1>

      <div style={estilos.inputLinha}>
        <InputField
          placeholder="Nome do Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          style={{ width: 250 }}
        />
        <InputField
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      <div style={estilos.inputLinha}>
        <InputField
          placeholder="Serviço"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
          style={{ width: 250 }}
        />
        <InputField
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          style={{ width: 120 }}
        />
        <Button onClick={adicionarServico} color="#28a745">Adicionar</Button>
      </div>

      <ul style={estilos.lista}>
        {servicos.map((s, i) => (
          <ServicoItem
            key={i}
            servico={s.servico}
            preco={s.preco}
            onEditar={() => editarServico(i)}
            onRemover={() => removerServico(i)}
          />
        ))}
      </ul>

      {servicos.length > 0 && (
        <Button
          onClick={() => gerarPDF(cliente, data, servicos)}
          color="#007bff"
          style={estilos.botaoGerar}
        >
          Gerar PDF
        </Button>
      )}
    </div>
  );
}

export default App;
