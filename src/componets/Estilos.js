const cores = {
  primario: "#1e90ff",
  secundario: "#007bff",
  sucesso: "#28a745",
  texto: "#333",
  fundo: "#f5f5f5",
};

const estilos = {
  container: {
    padding: 30,
    fontFamily: "Arial, sans-serif",
    backgroundColor: cores.fundo,
    minHeight: "100vh",
  },
  titulo: {
    color: cores.primario,
    fontSize: 28,
    marginBottom: 20,
  },
  inputLinha: {
    marginBottom: 20,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  lista: {
    listStyle: "none",
    padding: 0,
  },
  botaoGerar: {
    marginTop: 20,
  },
};

export { cores, estilos };
