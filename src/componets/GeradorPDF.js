import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Gera e baixa um PDF com os dados fornecidos.
 * @param {string} cliente - Nome do cliente.
 * @param {string} data - Data do orçamento.
 * @param {Array} servicos - Lista de serviços com nome e preço.
 */
const gerarPDF = (cliente, data, servicos) => {
  const doc = new jsPDF();

  // "Logo" textual azul no canto superior esquerdo
  doc.setFontSize(16);
  doc.setTextColor(0, 102, 204); // azul
  doc.text("BIG", 14, 15);
  doc.text("Refrigeração", 14, 22);
  doc.setFontSize(12);
  doc.text("Manutenção", 14, 29);
  doc.text("Instalação", 14, 34);

  // Título principal
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.text("Orçamento - Big Refrigeração", 80, 22);

  // Dados do cliente
  doc.setFontSize(12);
  doc.text(`Cliente: ${cliente}`, 14, 50);
  doc.text(`Data: ${data}`, 14, 58);

  // Frase antes da tabela
  doc.setFontSize(12);
  doc.text(
    `Recebo do Sr. ${cliente} o valor referente aos serviços abaixo:`,
    14,
    68
  );

  // Tabela de serviços
  const rows = servicos.map((s, i) => [
    i + 1,
    s.servico,
    `R$ ${parseFloat(s.preco).toFixed(2)}`
  ]);

  const total = servicos.reduce((acc, s) => acc + parseFloat(s.preco), 0);

  autoTable(doc, {
    startY: 75,
    head: [["#", "Serviço", "Preço"]],
    body: rows,
    theme: "striped",
    didDrawPage: (data) => {
      const finalY = data.cursor.y + 10;
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(`Total: R$ ${total.toFixed(2)}`, 14, finalY);
      doc.setFont(undefined, "normal");
    }
  });

  // Rodapé com fundo azul claro
  const pageHeight = doc.internal.pageSize.height;
  const rodapeAltura = 30;
  const rodapeY = pageHeight - rodapeAltura;

  doc.setFillColor(230, 240, 255);
  doc.rect(0, rodapeY, 210, rodapeAltura, "F");

  const rodape = `
CNPJ: 58.228.122/0001-10
CEP: 66625-890
End: Residencial Viver Primavera | Rua do Ronari, Bloco 28 Ap 202 | Bairro Tapana
Tel: (91) 99906-9633
  `;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const rodapeText = doc.splitTextToSize(rodape, 180);
  doc.text(rodapeText, 14, rodapeY + 8);

  doc.save("orcamento.pdf");
};

export default gerarPDF;
