import React, { useState, useEffect } from "react";
import ClienteInput from "./ClienteInput";

const FormCliente = () => {
  const [cliente, setCliente] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [clientesSalvos, setClientesSalvos] = useState([]);

  // Carrega os clientes salvos ao iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("clientes");
    if (dadosSalvos) {
      setClientesSalvos(JSON.parse(dadosSalvos));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Se estiver vazio, apenas mostra ❌ e não salva
    if (!cliente.trim()) {
      setMensagem("❌ Preencha o nome");
      return;
    }

    const novoCliente = cliente.trim();

    // Atualiza lista e localStorage
    const novaLista = [...clientesSalvos, novoCliente];
    setClientesSalvos(novaLista);
    localStorage.setItem("clientes", JSON.stringify(novaLista));

    setMensagem("✅ Cliente salvo com sucesso");
    setCliente(""); // Limpa campo
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Cadastro de Cliente</h2>

      <form onSubmit={handleSubmit}>
        <ClienteInput cliente={cliente} setCliente={setCliente} />

        <button
          type="submit"
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Enviar
        </button>
      </form>

      {/* Mensagem de feedback */}
      {mensagem && (
        <p style={{ marginTop: "1rem", color: mensagem.includes("❌") ? "red" : "green" }}>
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default FormCliente;
