import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Orçamento - Big Refrigeração", 14, 22);
    doc.setFontSize(12);
    doc.text(`Cliente: ${cliente}`, 14, 32);
    doc.text(`Data: ${data}`, 14, 40);

    const rows = servicos.map((s, i) => [i + 1, s.servico, `R$ ${parseFloat(s.preco).toFixed(2)}`]);

    autoTable(doc, {
      startY: 50,
      head: [["#", "Serviço", "Preço"]],
      body: rows,
    });

    doc.save("orcamento.pdf");
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1 style={{ color: "#1e90ff" }}>Orçamento Big Refrigeração</h1>

      <div>
        <InputField placeholder="Nome do Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} style={{ width: 250 }} />
        <InputField type="date" value={data} onChange={(e) => setData(e.target.value)} />
      </div>

      <div>
        <InputField placeholder="Serviço" value={servico} onChange={(e) => setServico(e.target.value)} style={{ width: 250 }} />
        <InputField type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} style={{ width: 120 }} />
        <Button onClick={adicionarServico} color="#28a745">Adicionar</Button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
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
        <Button onClick={gerarPDF} color="#007bff" style={{ marginTop: 20 }}>
          Gerar PDF
        </Button>
      )}
    </div>
  );
}

export default App;
