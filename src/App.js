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
  const [orcamentos, setOrcamentos] = useState([]);
  const [mensagemErro, setMensagemErro] = useState(
    " Sistema atualizado recentemente. Por favor, verifique possíveis instabilidades."
  );

  const [clienteErro, setClienteErro] = useState("");
  const [dataErro, setDataErro] = useState("");
  const [servicoErro, setServicoErro] = useState("");
  const [precoErro, setPrecoErro] = useState("");

  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("orcamentos");
    if (dadosSalvos) {
      setOrcamentos(JSON.parse(dadosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos));
  }, [orcamentos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMensagemErro("");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const adicionarServico = () => {
    let erro = false;

    if (!servico) {
      setServicoErro("Informe o nome do serviço.");
      erro = true;
    } else {
      setServicoErro("");
    }

    if (!preco || isNaN(preco)) {
      setPrecoErro("Informe um preço válido.");
      erro = true;
    } else {
      setPrecoErro("");
    }

    if (erro) return;

    setServicos([...servicos, { servico, preco }]);
    setServico("");
    setPreco("");
    setOrcamentoFinalizado(false);
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
    let erro = false;

    if (!cliente) {
      setClienteErro("Nome do cliente é obrigatório.");
      erro = true;
    } else {
      setClienteErro("");
    }

    if (!data) {
      setDataErro("Data é obrigatória.");
      erro = true;
    } else {
      setDataErro("");
    }

    if (servicos.length === 0) {
      setServicoErro("Adicione pelo menos um serviço.");
      erro = true;
    } else if (!servico) {
      setServicoErro("");
    }

    if (erro) return;

    setOrcamentos([
      ...orcamentos,
      { cliente, data, servicos, id: Date.now() },
    ]);

    setOrcamentoFinalizado(true);
  };

  const novoOrcamento = () => {
    setCliente("");
    setData("");
    setServicos([]);
    setServico("");
    setPreco("");
    setOrcamentoFinalizado(false);
    setClienteErro("");
    setDataErro("");
    setServicoErro("");
    setPrecoErro("");
    setCopiado(false);
  };

  const copiarOrcamento = () => {
    const texto = `
Cliente: ${cliente}
Data: ${formatarData(data)}

Recebo do Sr. ${cliente} o valor referente aos serviços abaixo:

${servicos
      .map((s) => `- ${s.servico}: R$ ${parseFloat(s.preco).toFixed(2)}`)
      .join("\n")}

Total: R$ ${servicos
        .reduce((acc, cur) => acc + parseFloat(cur.preco), 0)
        .toFixed(2)}
    `;

    navigator.clipboard.writeText(texto.trim()).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  };

  // Copiar orçamento salvo
  const copiarOrcamentoSalvo = (orc) => {
    const texto = `
Cliente: ${orc.cliente}
Data: ${formatarData(orc.data)}

Recebo do Sr. ${orc.cliente} o valor referente aos serviços abaixo:

${orc.servicos
      .map((s) => `- ${s.servico}: R$ ${parseFloat(s.preco).toFixed(2)}`)
      .join("\n")}

Total: R$ ${orc.servicos
        .reduce((acc, cur) => acc + parseFloat(cur.preco), 0)
        .toFixed(2)}
    `;

    navigator.clipboard.writeText(texto.trim());
    alert("Orçamento copiado!");
  };

  // Editar orçamento salvo
  const editarOrcamento = (id) => {
    const orc = orcamentos.find((o) => o.id === id);
    if (!orc) return;

    setCliente(orc.cliente);
    setData(orc.data);
    setServicos(orc.servicos);
    setOrcamentoFinalizado(false);

    setOrcamentos(orcamentos.filter((o) => o.id !== id));
  };

  // Excluir orçamento salvo
  const excluirOrcamento = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este orçamento?")) {
      setOrcamentos(orcamentos.filter((o) => o.id !== id));
    }
  };

  // Formatar data yyyy-mm-dd para dd/mm/yyyy
  const formatarData = (dataString) => {
    if (!dataString) return "";
    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
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
        <div>
          <InputField
            placeholder="Nome do Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            style={{ width: 250 }}
            disabled={orcamentoFinalizado}
          />
          {clienteErro && (
            <div style={{ color: "red", fontSize: "0.9em" }}>{clienteErro}</div>
          )}
        </div>

        <div>
          <InputField
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            disabled={orcamentoFinalizado}
          />
          {dataErro && (
            <div style={{ color: "red", fontSize: "0.9em" }}>{dataErro}</div>
          )}
        </div>
      </div>

      <div style={estilos.inputLinha}>
        <div>
          <InputField
            placeholder="Serviço"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            style={{ width: 250 }}
            disabled={orcamentoFinalizado}
          />
          {servicoErro && (
            <div style={{ color: "red", fontSize: "0.9em" }}>{servicoErro}</div>
          )}
        </div>

        <div>
          <InputField
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            style={{ width: 120 }}
            disabled={orcamentoFinalizado}
          />
          {precoErro && (
            <div style={{ color: "red", fontSize: "0.9em" }}>{precoErro}</div>
          )}
        </div>

        <Button
          onClick={adicionarServico}
          color="#28a745"
          disabled={orcamentoFinalizado}
        >
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
            <p><strong>Cliente:</strong> {cliente}</p>
            <p><strong>Data:</strong> {formatarData(data)}</p>

            <p style={{ marginTop: 20, fontWeight: "bold" }}>
              Recebo do Sr. {cliente} o valor referente aos serviços abaixo:
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #999" }}>
                  <th style={{ textAlign: "left", padding: "8px" }}>Serviço</th>
                  <th style={{ textAlign: "right", padding: "8px" }}>Preço (R$)</th>
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

            <p style={{ textAlign: "right", fontWeight: "bold", marginTop: 10 }}>
              Total: R${" "}
              {servicos.reduce((acc, cur) => acc + parseFloat(cur.preco), 0).toFixed(2)}
            </p>
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button onClick={() => gerarPDF(cliente, data, servicos)} color="#007bff">
              Gerar PDF
            </Button>

            <Button
              onClick={copiarOrcamento}
              color={copiado ? "#28a745" : "#6c757d"}
            >
              {copiado ? "Orçamento copiado!" : "Copiar Orçamento"}
            </Button>

            <Button onClick={novoOrcamento} color="#ffc107">
              Novo Orçamento
            </Button>
          </div>
        </>
      )}

      {/* Lista de orçamentos salvos */}
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
              <p><strong>Data:</strong> {formatarData(o.data)}</p>
              <p style={{ marginTop: 20, fontWeight: "bold" }}>
                Recebo do Sr. {o.cliente} o valor referente aos serviços abaixo:
              </p>
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

              <div style={{ marginTop: 15, display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Button
                  onClick={() => editarOrcamento(o.id)}
                  color="#ffc107"
                  style={{ flex: 1 }}
                >
                  Editar
                </Button>

                <Button
                  onClick={() => excluirOrcamento(o.id)}
                  color="#dc3545"
                  style={{ flex: 1 }}
                >
                  Excluir
                </Button>

                <Button
                  onClick={() => gerarPDF(o.cliente, o.data, o.servicos)}
                  color="#007bff"
                  style={{ flex: 1 }}
                >
                  Gerar PDF
                </Button>

                <Button
                  onClick={() => copiarOrcamentoSalvo(o)}
                  color="#6c757d"
                  style={{ flex: 1, fontSize: 12, padding: "6px 8px" }}
                >
                  Copiar Orçamento
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
