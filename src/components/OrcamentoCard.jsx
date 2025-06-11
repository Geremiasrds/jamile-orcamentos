import React, { useState, useEffect } from "react";
import gerarPDF from "../utils/gerarPDF";
import ConfirmModal from "../components/ConfirmModal"; // ✅ Importa o modal
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  Titulo,
  ButtonDeCopia,
  ButtonDePdf,
} from "../styles/StyledComponents";

const OrcamentoCard = ({ orcamento, onExcluir, onEditar }) => {
  const [copiado, setCopiado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false); // ✅ Estado do modal
  const [numeroCliente, setNumeroCliente] = useState(() => {
    return localStorage.getItem(`numero-${orcamento.id}`) || "";
  });

  useEffect(() => {
    localStorage.setItem(`numero-${orcamento.id}`, numeroCliente);
  }, [numeroCliente, orcamento.id]);

  const total = orcamento.servicos
    .reduce((acc, s) => acc + (Number(s.qtd) || 0) * (Number(s.valorUnitario) || 0), 0)
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
  .map((s) => {
    const qtd = Number(s.qtd) || 0;
    const valor = Number(s.valorUnitario) || 0;
    const subtotal = qtd * valor;
    return `${s.servico} - Quantidade: ${qtd} - Valor Unitário: R$ ${valor.toFixed(
      2
    )} - Subtotal: R$ ${subtotal.toFixed(2)}`;
  })
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
    setMostrarModal(true); // ✅ Mostra o modal
  };

  const confirmarExclusao = () => {
    onExcluir(orcamento);
    setMostrarModal(false);
  };

  const cancelarExclusao = () => {
    setMostrarModal(false);
  };

  const editarOrcamento = () => {
    if (onEditar) {
      onEditar(orcamento);
    }
  };

  const enviarParaWhatsApp = () => {
    if (!numeroCliente) return alert("Digite o número do cliente!");

    const mensagem = `
*BIG REFRIGERAÇÃO*

*Cliente: ${orcamento.cliente}*
*Data: ${data}*
*Hora: ${hora}*

Olá, Sr(a) *${orcamento.cliente},* aqui está o valor total R$ ${total} referente aos serviços abaixo:

${orcamento.servicos
  .map((s) => {
    const qtd = Number(s.qtd) || 0;
    const valor = Number(s.valorUnitario) || 0;
    const subtotal = qtd * valor;

    return ` *${qtd}  ${s.servico} Total: R$ ${subtotal.toFixed(2)}*`;
    // valor total{subtotal}
  })
  
  .join("\n")}
`;

    const numero = numeroCliente.replace(/\D/g, "");
    const url = `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <>
    <Card>
      <ButtonDeCopia onClick={copiarOrcamento}>
            {copiado ? "✔" : "📝"}
          </ButtonDeCopia>
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
          style={{ margin: 0, fontWeight: "bold", fontSize: "1.5rem", letterSpacing: "0.1em" }}
        >
          BIG REFRIGERAÇÃO
        </Titulo>

        <div style={{ width: "100%", textAlign: "left", marginTop: "12px" }}>
          <p style={{ margin: "4px 0", fontWeight: "600", fontSize: "1.1rem" }}>
            Cliente: {orcamento.cliente}
          </p>
          <p style={{ margin: "4px 0", fontSize: "0.9rem", color: "#555" }}>Data: {data}</p>
          <p style={{ margin: "4px 0", fontSize: "0.9rem", color: "#555" }}>Hora: {hora}</p>
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
            {orcamento.servicos.map((s, i) => {
              const qtd = Number(s.qtd) || 0;
              const valor = Number(s.valorUnitario) || 0;
              const subtotal = qtd * valor;

              return (
                <tr key={i}>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{s.servico}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{qtd}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    R$ {valor.toFixed(2)}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    R$ {subtotal.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p style={{ marginTop: "12px", fontWeight: "bold", fontSize: "1.1rem" }}>
          Total: R$ {total}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "16px" }}>
          <input
            type="tel"
            placeholder="WhatsApp"
            value={numeroCliente}
            onChange={(e) => setNumeroCliente(e.target.value)}
            style={{
              padding: "4px 6px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "140px",
              fontSize: "0.85rem",
            }}
          />
          <button
            onClick={enviarParaWhatsApp}
            style={{
              backgroundColor: "#25d366",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "4px 6px",
              fontSize: "0.7rem",
              cursor: "pointer",
            }}
          >
            Whatsapp
          </button>
          <ButtonDePdf onClick={baixarPDF}>Baixar PDF</ButtonDePdf>
        </div>


        {/* ✅ Modal de confirmação */}
        {mostrarModal && (
          <ConfirmModal onConfirm={confirmarExclusao} onCancel={cancelarExclusao} />
        )}
      </CardBody>
    </Card>
        <ButtonGroup>
          
          
          <Button onClick={editarOrcamento} style={{ backgroundColor: "#0066cc" }}>
            Editar
          </Button>
          <Button onClick={excluirOrcamento} style={{ backgroundColor: "#cc0000" }}>
            Excluir
          </Button>
        </ButtonGroup>
        </>
  );
};

export default OrcamentoCard;
