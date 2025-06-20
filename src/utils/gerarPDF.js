import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoBase64 from "./logoEditadaBase64"; // Logo em base64

const gerarPDF = (cliente, data, servicos) => {
  const doc = new jsPDF();

  const dataObj = data instanceof Date ? data : new Date(data);
  const dataFormatada = dataObj.toLocaleDateString("pt-BR");
  const horaFormatada = new Date().toLocaleTimeString("pt-BR");

  // Logo
  const logoX = 14;
  const logoY = 10;
  const logoSize = 40;

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", logoX, logoY, logoSize, logoSize);
  }

  // Linha vertical decorativa
  const linhaX = logoX + logoSize + 5;
  const linhaY1 = logoY;
  const linhaY2 = logoY + logoSize;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.8);
  doc.line(linhaX, linhaY1, linhaX, linhaY2);

  // Título e subtítulo
  const azul = [0, 102, 204];
  doc.setTextColor(...azul);
  doc.setFontSize(50);
  doc.setFont("helvetica", "bold");
  doc.text("BIG", linhaX + 10, 30);

  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  const subTitulos = ["Refrigeração", "Manutenção", "Instalação"];
  subTitulos.forEach((texto, i) => {
    doc.text(texto, linhaX + 15, 45 + i * 6);
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

  // 🧹 Removido texto "Recebo do Sr..."
  // Espaço reservado ou removível
  doc.text(``, 14, 88); // pode remover essa linha também se quiser

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

  // Rodapé estilizado
  const pageHeight = doc.internal.pageSize.height;
  const rodapeAltura = 32;
  const rodapeY = pageHeight - rodapeAltura;

  doc.setFillColor(0, 51, 102); // Azul escuro bonito
  doc.rect(0, rodapeY, 210, rodapeAltura, "F");

  doc.setTextColor(255, 255, 255); // Branco
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");

  const linhasRodape = [
    "📞 Tel: (91) 99906-9633  |  CNPJ: 58.228.122/0001-10",
    "📍 Bairro Tapana - Belém/PA  |  CEP: 66625-890",
    "🏠 Residencial Viver Primavera, Rua do Ronari, Bloco 28, Ap 202"
  ];

  linhasRodape.forEach((linha, i) => {
    const textWidth = doc.getTextWidth(linha);
    const centerX = (210 - textWidth) / 2;
    doc.text(linha, centerX, rodapeY + 10 + i * 6);
  });

  // Salvar o PDF
  doc.save("orcamento.pdf");
};

export default gerarPDF;
