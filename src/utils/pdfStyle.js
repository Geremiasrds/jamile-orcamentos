const pdfStyles = {
  // Fonte e cores padrão
  font: {
    normal: "helvetica",
    bold: "helvetica",
  },

  // Tamanhos de texto
  titleFontSize: 18,
  subtitleFontSize: 13,
  tableFontSize: 12,
  footerFontSize: 10,

  // Cores principais
  headerColor: [0, 102, 204],             // Azul claro (usado no título e cabeçalho)
  headerTextColor: 255,                   // Texto branco no cabeçalho da tabela
  footerBackgroundColor: [0, 102, 204],   // Fundo do rodapé (mesmo azul do cabeçalho)

  // Dimensões da página A4 (padrão jsPDF)
  pageWidth: 210,
  footerHeight: 35,

  // Margens laterais
  margins: {
    left: 14,
    right: 14,
  },

  // Logo posicionada mais acima e um pouco à esquerda, próxima do título
  logoPosition: {
    x: 20,        // mais à esquerda
    y: 18,        // mais abaixo que o topo (para alinhar com texto)
    width: 30,
    height: 30,   // menor, para ficar mais compacto com o texto
  },

  // Texto do rodapé em uma única string (pode quebrar depois no PDF)
  footerText:
    "CNPJ: 58.228.122/0001-10 | CEP: 66625-890 | End: Residencial Viver Primavera, Rua do Ronari, Bloco 28, Ap 202 | Bairro Tapana | Tel: (91) 99906-9633",
};

export default pdfStyles;
