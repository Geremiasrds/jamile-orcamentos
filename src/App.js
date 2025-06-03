import React, { useState, useEffect } from "react";

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
  const [orcamentoFinalizado, setOrcamentoFinalizado] = useState(false);

  // Lista de orçamentos finalizados
  const [orcamentos, setOrcamentos] = useState([]);

  // Mensagem de erro inicial
  const [mensagemErro, setMensagemErro] = useState(
    "Erro: Sistema atualizado recentemente. Por favor, verifique possíveis instabilidades."
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMensagemErro("");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const adicionarServico = () => {
    if (servico && preco) {
      setServicos([...servicos, { servico, preco }]);
      setServico("");
      setPreco("");
      setOrcamentoFinalizado(false);
    }
  };

  const removerServico = (index) => {
    setServicos(servicos.filter((_, i) => i !== index));
    setOrcamentoFinalizado(false);
  };

  const editarServico = (index) => {
    const item = servicos[index];
    setServico(item.servico);
    setPreco(item.preco);
    removerServico(index);
    setOrcamentoFinalizado(false);
  };

  const finalizarOrcamento = () => {
    if (!cliente || !data || servicos.length === 0) {
      alert("Preencha nome do cliente, data e adicione pelo menos um serviço.");
      return;
    }

    // Salva o orçamento finalizado na lista
    setOrcamentos([
      ...orcamentos,
      { cliente, data, servicos, id: Date.now() },
    ]);

    setOrcamentoFinalizado(true);
  };

  // Limpa os campos para iniciar um novo orçamento, sem apagar os orçamentos salvos
  const novoOrcamento = () => {
    setCliente("");
    setData("");
    setServicos([]);
    setServico("");
    setPreco("");
    setOrcamentoFinalizado(false);
  };

  return (
    <div style={estilos.container}>
      {mensagemErro && (
        <div
          style={{
            backgroundColor: "#ffcccc",
            color: "#990000",
            padding: "10px",
            border: "1px solid #cc0000",
            borderRadius: 5,
            marginBottom: 15,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {mensagemErro}
        </div>
      )}

      <h1 style={estilos.titulo}>Orçamento Big Refrigeração</h1>

      <div style={estilos.inputLinha}>
        <InputField
          placeholder="Nome do Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          style={{ width: 250 }}
          disabled={orcamentoFinalizado}
        />
        <InputField
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={orcamentoFinalizado}
        />
      </div>

      <div style={estilos.inputLinha}>
        <InputField
          placeholder="Serviço"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
          style={{ width: 250 }}
          disabled={orcamentoFinalizado}
        />
        <InputField
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          style={{ width: 120 }}
          disabled={orcamentoFinalizado}
        />
        <Button onClick={adicionarServico} color="#28a745" disabled={orcamentoFinalizado}>
          Adicionar
        </Button>
      </div>

      <ul style={estilos.lista}>
        {servicos.map((s, i) => (
          <ServicoItem
            key={i}
            servico={s.servico}
            preco={s.preco}
            onEditar={() => editarServico(i)}
            onRemover={() => removerServico(i)}
            disabled={orcamentoFinalizado}
          />
        ))}
      </ul>

      {!orcamentoFinalizado && servicos.length > 0 && (
        <Button
          onClick={finalizarOrcamento}
          color="#dc3545"
          style={{ marginBottom: 10 }}
        >
          Finalizar Orçamento
        </Button>
      )}

      {orcamentoFinalizado && (
        <>
          <div
            style={{
              marginTop: 30,
              padding: 20,
              border: "1px solid #ccc",
              borderRadius: 8,
              backgroundColor: "#fdfcf9",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              maxWidth: 600,
            }}
          >
            <h2 style={{ textAlign: "center" }}>Orçamento Finalizado</h2>
            <p>
              <strong>Cliente:</strong> {cliente}
            </p>
            <p>
              <strong>Data:</strong> {data}
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #999" }}>
                  <th style={{ textAlign: "left", padding: "8px" }}>Serviço</th>
                  <th style={{ textAlign: "right", padding: "8px" }}>
                    Preço (R$)
                  </th>
                </tr>
              </thead>
              <tbody>
                {servicos.map((s, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px" }}>{s.servico}</td>
                    <td style={{ padding: "8px", textAlign: "right" }}>
                      {parseFloat(s.preco).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p
              style={{
                textAlign: "right",
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Total: R${" "}
              {servicos
                .reduce((acc, cur) => acc + parseFloat(cur.preco), 0)
                .toFixed(2)}
            </p>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: "10px" }}>
            <Button
              onClick={() => setOrcamentoFinalizado(false)}
              color="#ffc107"
              style={{ flex: 1 }}
            >
              Editar Orçamento
            </Button>

            <Button
              onClick={() => gerarPDF(cliente, data, servicos)}
              color="#007bff"
              style={{ flex: 1 }}
            >
              Gerar PDF
            </Button>
          </div>

          <div style={{ marginTop: 20 }}>
            <Button
              onClick={novoOrcamento}
              color="#28a745"
              style={{ width: 200, marginTop: 10 }}
            >
              Novo Orçamento
            </Button>
          </div>
        </>
      )}

      {/* Lista dos orçamentos finalizados */}
      {orcamentos.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2>Orçamentos Salvos</h2>
          {orcamentos.map((o) => (
            <div
              key={o.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 15,
                marginBottom: 15,
                backgroundColor: "#f9f9f9",
              }}
            >
              <p><strong>Cliente:</strong> {o.cliente}</p>
              <p><strong>Data:</strong> {o.data}</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #999" }}>
                    <th style={{ textAlign: "left", padding: "8px" }}>Serviço</th>
                    <th style={{ textAlign: "right", padding: "8px" }}>Preço (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {o.servicos.map((s, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "8px" }}>{s.servico}</td>
                      <td style={{ padding: "8px", textAlign: "right" }}>
                        {parseFloat(s.preco).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ textAlign: "right", fontWeight: "bold", marginTop: 10 }}>
                Total: R${" "}
                {o.servicos.reduce((acc, cur) => acc + parseFloat(cur.preco), 0).toFixed(2)}
              </p>

              {/* Botão Gerar PDF para cada orçamento salvo */}
              <Button
                onClick={() => gerarPDF(o.cliente, o.data, o.servicos)}
                color="#007bff"
                style={{ marginTop: 10 }}
              >
                Gerar PDF
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
