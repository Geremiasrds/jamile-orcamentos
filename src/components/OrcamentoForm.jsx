import React, { useState } from "react";
import OrcamentoForm from "./OrcamentoForm";

function App() {
  const [cliente, setCliente] = useState("");
  const [servicos, setServicos] = useState([]);

  const salvarOrcamento = () => {
    console.log("Orçamento salvo:", { cliente, servicos });
    alert("Orçamento salvo com sucesso!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <OrcamentoForm
        cliente={cliente}
        setCliente={setCliente}
        servicos={servicos}
        setServicos={setServicos}
        onSalvar={salvarOrcamento}
      />
    </div>
  );
}

export default App;
