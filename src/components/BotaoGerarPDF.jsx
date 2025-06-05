import React, { useState } from "react";
import gerarPDF from "../utils/gerarPDF";
import { Button } from "../styles/StyledComponents";

const BotaoGerarPDF = ({ cliente, servicos }) => {
  const [pdfGerado, setPdfGerado] = useState(false);

  const gerar = () => {
    gerarPDF(cliente, new Date(), servicos);
    setPdfGerado(true);

    setTimeout(() => {
      setPdfGerado(false);
    }, 3000);
  };

  return (
    <Button onClick={gerar} pdfGerado={pdfGerado}>
      {pdfGerado ? "PDF baixado" : "Baixar PDF"}
    </Button>
  );
};

export default BotaoGerarPDF;
