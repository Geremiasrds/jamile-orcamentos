import React, { useState, useEffect } from "react";

const OrcamentoForm = ({ cliente, setCliente, servicos, setServicos, onSalvar }) => {
  const [erros, setErros] = useState({
    cliente: "",
    servicos: [],
  });

  useEffect(() => {
    setErros((prev) => {
      const novosErros = [...prev.servicos];
      while (novosErros.length < servicos.length) {
        novosErros.push({ servico: "", qtd: "", valorUnitario: "" });
      }
      while (novosErros.length > servicos.length) {
        novosErros.pop();
      }
      return { ...prev, servicos: novosErros };
    });
  }, [servicos]);

  const adicionarServico = () => {
    setServicos([...servicos, { servico: "", qtd: 1, valorUnitario: 0 }]);
  };

  const atualizarServico = (index, campo, valor) => {
    const novosServicos = [...servicos];
    novosServicos[index][campo] = campo === "servico" ? valor : Number(valor);
    setServicos(novosServicos);
    validarCampoServico(index, campo, valor);
  };

  const validarCampoServico = (index, campo, valor) => {
    setErros((prev) => {
      const novosErros = [...prev.servicos];
      if (!novosErros[index]) novosErros[index] = { servico: "", qtd: "", valorUnitario: "" };

      if (campo === "servico") {
        novosErros[index][campo] = valor.trim() === "" ? "Preencha o serviço" : "";
      } else if (campo === "qtd") {
        novosErros[index][campo] =
          !valor || Number(valor) <= 0 ? "Quantidade deve ser maior que zero" : "";
      } else if (campo === "valorUnitario") {
        novosErros[index][campo] =
          !valor || Number(valor) <= 0 ? "Valor deve ser maior que zero" : "";
      }
      return { ...prev, servicos: novosErros };
    });
  };

  const validarCliente = (valor) => {
    setErros((prev) => ({
      ...prev,
      cliente: valor.trim() === "" ? "Preencha o nome do cliente" : "",
    }));
  };

  const validarFormulario = () => {
    validarCliente(cliente);
    servicos.forEach((s, i) => {
      validarCampoServico(i, "servico", s.servico);
      validarCampoServico(i, "qtd", s.qtd);
      validarCampoServico(i, "valorUnitario", s.valorUnitario);
    });

    if (
      cliente.trim() === "" ||
      servicos.some(
        (s) =>
          s.servico.trim() === "" ||
          !s.qtd ||
          Number(s.qtd) <= 0 ||
          !s.valorUnitario ||
          Number(s.valorUnitario) <= 0
      )
    ) {
      return false;
    }
    return true;
  };

  const handleSalvar = () => {
    if (validarFormulario()) {
      onSalvar();
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Novo Orçamento</h2>

      <input
        type="text"
        placeholder="Nome do cliente"
        value={cliente}
        onChange={(e) => {
          setCliente(e.target.value);
          validarCliente(e.target.value);
        }}
        
      />

      <div
        style={{
          border: "1px solid black",
          padding: "12px",
          borderRadius: "8px",
          marginTop: "12px",
          background: "#f9f9f9",
        }}
      >
        <h3>Serviços</h3>
        {servicos.map((s, i) => (
          <div
            key={i}
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "12px",
              marginBottom: "12px",
            }}
          >
            <input
              type="text"
              placeholder="Serviço"
              value={s.servico}
              onChange={(e) => atualizarServico(i, "servico", e.target.value)}
              style={{ display: "block", marginBottom: "2px", width: "100%", padding: "6px" }}
            />
            <input
              type="number"
              placeholder="Valor unitário"
              value={s.valorUnitario}
              onChange={(e) => atualizarServico(i, "valorUnitario", e.target.value)}
              style={{ display: "block", marginBottom: "2px", width: "100%", padding: "6px" }}
            />
            {erros.servicos[i]?.servico && (
              <small style={{ color: "red" }}>{erros.servicos[i].servico}</small>
            )}

            <input
              type="number"
              placeholder="Quantidade"
              value={s.qtd}
              onChange={(e) => atualizarServico(i, "qtd", e.target.value)}
              style={{ display: "block", marginBottom: "2px", width: "100%", padding: "6px" }}
            />
            {erros.servicos[i]?.qtd && (
              <small style={{ color: "red" }}>{erros.servicos[i].qtd}</small>
            )}

            {erros.servicos[i]?.valorUnitario && (
              <small style={{ color: "red" }}>{erros.servicos[i].valorUnitario}</small>
            )}

            <button
              onClick={() => {
                const novosServicos = servicos.filter((_, idx) => idx !== i);
                setServicos(novosServicos);

                setErros((prev) => {
                  const novosErros = [...prev.servicos];
                  novosErros.splice(i, 1);
                  return { ...prev, servicos: novosErros };
                });
              }}
              style={{
                marginTop: "4px",
                backgroundColor: "#cc0000",
                color: "#fff",
                padding: "4px 8px",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Excluir
            </button>
          </div>
        ))}

        <button
          onClick={adicionarServico}
          style={{
            backgroundColor: "#0066cc",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "4px",
            marginBottom: "8px",
          }}
        >
          Adicionar Serviço
        </button>
      </div>

      <button
        onClick={handleSalvar}
        style={{
          marginTop: "16px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "6px",
          fontSize: "1rem",
        }}
      >
        Salvar Orçamento
      </button>
    </div>
  );
};

export default OrcamentoForm;
