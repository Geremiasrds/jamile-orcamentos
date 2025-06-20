import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoBase64 from "./logoEditadaBase64"; // Ajuste o caminho conforme seu projeto

const gerarPDF = (cliente, data, servicos) => {
  const doc = new jsPDF();

  const dataObj = data instanceof Date ? data : new Date(data);
  const dataFormatada = dataObj.toLocaleDateString("pt-BR");
  const horaFormatada = new Date().toLocaleTimeString("pt-BR");

  // Logo
  const logoX = 15;
  const logoY = 15;
  const logoSize = 45;

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", logoX, logoY, logoSize, logoSize);
  }

  // Linha vertical decorativa
  const linhaX = logoX + logoSize + 3;
  const linhaY1 = logoY + 2;
  const linhaY2 = logoY + logoSize - 3;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.8);
  doc.line(linhaX, linhaY1, linhaX, linhaY2);

  // Título e subtítulo
  const azul = [0, 102, 204];
  doc.setTextColor(...azul);
  doc.setFontSize(48);
  doc.setFont("helvetica", "bold");
  doc.text("BIG", linhaX + 6, 40);

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  const subTitulos = ["Refrigeração", "Manutenção", "Instalação"];
  subTitulos.forEach((texto, i) => {
    doc.text(texto, linhaX + 7, 45 + i * 5);
  });

  // Informações do cliente
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`${cliente}`, 14, 70);
  doc.text(`Data: ${dataFormatada}  Hora: ${horaFormatada}`, 14, 78);

  // Dados dos serviços
  const servicosNumericos = servicos.map((s) => ({
    servico: s.servico || "",
    qtd: Number(s.qtd) || 0,
    valorUnitario: Number(s.valorUnitario) || 0,
  }));

  const total = servicosNumericos.reduce(
    (acc, item) => acc + item.qtd * item.valorUnitario,
    0
  );

  // Espaço reservado (removível)
  doc.text(``, 14, 88);

  // Tabela dos serviços
  const head = [["Descrição", "Qtd", "Valor Unitário", "Subtotal"]];
  const body = servicosNumericos.map((s) => [
    s.servico,
    s.qtd,
    `R$ ${s.valorUnitario.toFixed(2)}`,
    `R$ ${(s.qtd * s.valorUnitario).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 93,
    head,
    body,
    theme: "grid",
    styles: { fontSize: 11 },
    headStyles: { fillColor: azul, textColor: 255 },
    didDrawPage: (data) => {
      const finalY = data.cursor.y + 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Total: R$ ${total.toFixed(2)}`, 14, finalY);
    },
  });

  // Rodapé estilizado e alinhado no canto inferior esquerdo
  const pageHeight = doc.internal.pageSize.height;
  const rodapeAltura = 50;
  const rodapeY = pageHeight - rodapeAltura;

  // Fundo azul escuro
  doc.setFillColor(0, 51, 102);
  doc.rect(0, rodapeY, 210, rodapeAltura, "F");

  // Cor e fonte do texto do rodapé
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");

  // Informações da empresa com ícones, alinhadas à esquerda
  const margemEsquerda = 14;
  doc.text("Tel: (91) 99906-9633", margemEsquerda, rodapeY + 10);
  doc.text("Residencial Viver Primavera, Rua do Ronari,", margemEsquerda, rodapeY + 16);
  doc.text("Bloco 28, Ap 202", margemEsquerda, rodapeY + 22);
  doc.text("Bairro Tapana - Belém/PA | CEP: 66625-890", margemEsquerda, rodapeY + 28);
  doc.text("CNPJ: 58.228.122/0001-10", margemEsquerda, rodapeY + 34);

  // Salvar o PDF
  doc.save("orcamento.pdf");
};

export default gerarPDF;
