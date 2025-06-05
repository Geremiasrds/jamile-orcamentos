const pdfStyles = {
  titleFontSize: 16,
  subtitleFontSize: 12,
  tableFontSize: 15,
  footerFontSize: 10,
  headerColor: [0, 102, 204], // Azul para cabeçalho da tabela
  headerTextColor: 255,
  footerBackgroundColor: [230, 240, 255],
  pageWidth: 210,
  footerHeight: 30,
  logoPosition: { x: 80, y: 10, width: 40, height: 40 }, // Agora largura e altura iguais para ser quadrado
  margins: { left: 14, right: 14 },
  font: {
    normal: "helvetica",
    bold: "helvetica",
  },
  footerText:
    "CNPJ: 58.228.122/0001-10 CEP: 66625-890 End: Residencial Viver Primavera | Rua do Ronari, Bloco 28 Ap 202 | Bairro Tapana Tel: (91) 99906-9633",
};

export default pdfStyles;
