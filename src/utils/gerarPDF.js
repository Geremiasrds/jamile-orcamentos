import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoBase64 from "./logoEditadaBase64"; // Sua imagem em base64 aqui

const gerarPDF = (cliente, data, servicos) => {
  const doc = new jsPDF();

  const dataObj = data instanceof Date ? data : new Date(data);
  const dataFormatada = dataObj.toLocaleDateString("pt-BR");
  const horaFormatada = new Date().toLocaleTimeString("pt-BR");

  // Posições e tamanhos
  const logoX = 14;
  const logoY = 10;
  const logoSize = 40; // logo quadrada 40x40

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", logoX, logoY, logoSize, logoSize);
  }

  // Linha vertical entre logo e título
  const linhaX = logoX + logoSize + 5; // 5px de espaçamento após a logo
  const linhaY1 = logoY;
  const linhaY2 = logoY + logoSize;
  doc.setDrawColor(0, 0, 0); // cor preta
  doc.setLineWidth(0.8);
  doc.line(linhaX, linhaY1, linhaX, linhaY2);

  // Cor azul para título e subtítulos
  const azul = [0, 102, 204];
  doc.setTextColor(...azul);

  // Título "BIG" grande à direita da linha
  doc.setFontSize(50);
  doc.setFont("helvetica", "bold");
  doc.text("BIG", linhaX + 10, 30);

  // Subtítulos abaixo do título "BIG" - espaçamento menor agora (6)
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  const subTitulos = ["Refrigeração", "Manutenção", "Instalação"];
  subTitulos.forEach((texto, i) => {
    doc.text(texto, linhaX + 15, 45 + i * 6);
  });

  // Voltar para texto preto e aumentar espaçamento para as infos do cliente
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  // Ajustei o espaço do cliente e data para acompanhar o menor espaçamento
  doc.text(`Cliente: ${cliente}`, 14, 70);
  doc.text(`Data: ${dataFormatada}  Hora: ${horaFormatada}`, 14, 78);

  // Prepara os dados dos serviços convertendo para número
  const servicosNumericos = servicos.map((s) => ({
    servico: s.servico || "",
    qtd: Number(s.qtd) || 0,
    valorUnitario: Number(s.valorUnitario) || 0,
  }));

  const total = servicosNumericos.reduce(
    (acc, item) => acc + item.qtd * item.valorUnitario,
    0
  );

  doc.text(
    `Recebo do Sr. ${cliente} o valor de R$ ${total.toFixed(
      2
    )} referente aos serviços abaixo:`,
    14,
    88
  );

  // Cabeçalho e corpo da tabela
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

  // Rodapé
  const pageHeight = doc.internal.pageSize.height;
  const rodapeAltura = 30;
  const rodapeY = pageHeight - rodapeAltura;

  doc.setFillColor(230, 240, 255);
  doc.rect(0, rodapeY, 210, rodapeAltura, "F");

  const rodape = ` CNPJ: 58.228.122/0001-10 CEP: 66625-890 End: Residencial Viver Primavera | Rua do Ronari, Bloco 28 Ap 202 | Bairro Tapana Tel: (91) 99906-9633 `;
  doc.setFontSize(10);
  const rodapeText = doc.splitTextToSize(rodape, 180);
  doc.text(rodapeText, 14, rodapeY + 8);

  doc.save("orcamento.pdf");
};

export default gerarPDF;
