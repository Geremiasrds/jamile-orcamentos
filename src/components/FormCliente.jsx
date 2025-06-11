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

    if (!cliente.trim()) {
      setMensagem("❌ Por favor, preencha o nome do cliente.");
      return;
    }

    const novoCliente = cliente.trim();

    // Atualiza a lista local
    const novaLista = [...clientesSalvos, novoCliente];

    // Salva no estado e no localStorage
    setClientesSalvos(novaLista);
    localStorage.setItem("clientes", JSON.stringify(novaLista));

    setMensagem("✅ Cliente salvo com sucesso!");

    // Limpa campo
    setCliente("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "2rem auto" }}
    >
      <h2>Cadastro de Cliente</h2>

      <ClienteInput cliente={cliente} setCliente={setCliente} />

      <button
        type="submit"
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Enviar
      </button>

      {mensagem && (
        <p
          style={{
            marginTop: "1rem",
            color: mensagem.startsWith("✅") ? "green" : "red",
          }}
        >
          {mensagem}
        </p>
      )}

      {/* Lista de clientes salvos */}
      {clientesSalvos.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Clientes cadastrados:</h3>
          <ul>
            {clientesSalvos.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default FormCliente;
