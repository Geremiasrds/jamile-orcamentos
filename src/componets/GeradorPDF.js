import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const gerarPDF = (cliente, data, servicos) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Orçamento - Big Refrigeração", 14, 22);
  doc.setFontSize(12);
  doc.text(`Cliente: ${cliente}`, 14, 32);
  doc.text(`Data: ${data}`, 14, 40);

  const rows = servicos.map((s, i) => [
    i + 1,
    s.servico,
    `R$ ${parseFloat(s.preco).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 50,
    head: [["#", "Serviço", "Preço"]],
    body: rows,
  });

  doc.save("orcamento.pdf");
};

export default gerarPDF;
