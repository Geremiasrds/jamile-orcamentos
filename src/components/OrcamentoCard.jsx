import React, { useState } from "react";
import gerarPDF from "../utils/gerarPDF";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  Titulo,
} from "../styles/StyledComponents";

const OrcamentoCard = ({ orcamento, onExcluir, onEditar }) => {
  const [copiado, setCopiado] = useState(false);

  const total = orcamento.servicos
    .reduce((acc, s) => acc + s.qtd * s.valorUnitario, 0)
    .toFixed(2);

  const data = new Date(orcamento.data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hora = new Date(orcamento.data).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const copiarOrcamento = () => {
    const texto = `
BIG REFRIGERAÇÃO

Cliente: ${orcamento.cliente}
Data: ${data}
Hora: ${hora}

Recebo do Sr(a) ${orcamento.cliente} o valor total de R$ ${total} referente aos serviços abaixo:

Detalhes dos serviços:
${orcamento.servicos
  .map(
    (s) =>
      `${s.servico} - Quantidade: ${s.qtd} - Valor Unitário: R$ ${s.valorUnitario.toFixed(
        2
      )} - Subtotal: R$ ${(s.qtd * s.valorUnitario).toFixed(2)}`
  )
  .join("\n")}
`;

    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const baixarPDF = () => {
    gerarPDF(orcamento.cliente, orcamento.data, orcamento.servicos);
  };

  const excluirOrcamento = () => {
    onExcluir(orcamento);
  };

  const editarOrcamento = () => {
    if (onEditar) {
      onEditar(orcamento);
    }
  };

  return (
    <Card>
      <CardHeader
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "16px",
        }}
      >
        <Titulo
          style={{ margin: 0, fontWeight: "bold", fontSize: "2rem", letterSpacing: "0.1em" }}
        >
          BIG REFRIGERAÇÃO
        </Titulo>

        <div
          style={{
            width: "100%",
            textAlign: "left",
            marginTop: "12px",
          }}
        >
          <p style={{ margin: "4px 0", fontWeight: "600", fontSize: "1.1rem" }}>
            Cliente: {orcamento.cliente}
          </p>
          <p style={{ margin: "4px 0", fontSize: "0.9rem", color: "#555" }}>
            Data: {data}
          </p>
          <p style={{ margin: "4px 0", fontSize: "0.9rem", color: "#555" }}>
            Hora: {hora}
          </p>
          <p style={{ marginTop: "12px", fontWeight: "600", fontSize: "1rem" }}>
            Recebo do Sr(a) {orcamento.cliente} o valor total de R$ {total} referente aos serviços abaixo:
          </p>
        </div>
      </CardHeader>

      <CardBody>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#0066cc", color: "#fff" }}>
            <tr>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Descrição</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Qtd</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Valor Unitário</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orcamento.servicos.map((s, i) => (
              <tr key={i}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{s.servico}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{s.qtd}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  R$ {s.valorUnitario.toFixed(2)}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  R$ {(s.qtd * s.valorUnitario).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: "12px", fontWeight: "bold", fontSize: "1.1rem" }}>
          Total: R$ {total}
        </p>

        <ButtonGroup>
          <Button onClick={copiarOrcamento}>
            {copiado ? "Orçamento copiado!" : "Copiar Orçamento"}
          </Button>
          <Button onClick={baixarPDF}>Baixar PDF</Button>
          <Button onClick={editarOrcamento} style={{ backgroundColor: "#0066cc" }}>
            Editar
          </Button>
          <Button onClick={excluirOrcamento} style={{ backgroundColor: "#cc0000" }}>
            Excluir
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
};

export default OrcamentoCard;
