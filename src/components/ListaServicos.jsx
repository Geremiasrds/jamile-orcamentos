import React, { useState } from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
  ButtonMini,
} from "../styles/StyledComponents";

const ListaServicos = ({ servicos, onEditar, onExcluir }) => {
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({
    servico: "",
    qtd: 1,
    valorUnitario: 0,
  });

  const iniciarEdicao = (index) => {
    setEditandoIndex(index);
    setValoresEditados({ ...servicos[index] });
  };

  const cancelarEdicao = () => {
    setEditandoIndex(null);
  };

  const salvarEdicao = (index) => {
    onEditar(index, valoresEditados);
    setEditandoIndex(null);
  };

  return (
    <Card>
      <CardBody>
        {servicos.map((s, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
            }}
          >
            {editandoIndex === index ? (
              <>
                {/* 👇 Preview atualizado em tempo real */}
                <p style={{ margin: "0 0 6px 0", fontWeight: "bold", color: "#333" }}>
                  {valoresEditados.qtd}x {valoresEditados.servico} - R$ {valoresEditados.valorUnitario.toFixed(2)} cada
                </p>

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input
                    type="text"
                    value={valoresEditados.servico}
                    onChange={(e) =>
                      setValoresEditados((prev) => ({
                        ...prev,
                        servico: e.target.value,
                      }))
                    }
                    placeholder="Serviço"
                    style={{ width: "120px" }}
                  />
                  <input
                    type="number"
                    value={valoresEditados.qtd}
                    onChange={(e) =>
                      setValoresEditados((prev) => ({
                        ...prev,
                        qtd: Number(e.target.value),
                      }))
                    }
                    placeholder="Qtd"
                    style={{ width: "50px" }}
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={valoresEditados.valorUnitario}
                    onChange={(e) =>
                      setValoresEditados((prev) => ({
                        ...prev,
                        valorUnitario: Number(e.target.value),
                      }))
                    }
                    placeholder="Valor"
                    style={{ width: "90px" }}
                  />
                  <ButtonGroup>
                    <ButtonMini onClick={() => salvarEdicao(index)}>💾</ButtonMini>
                    <ButtonMini onClick={cancelarEdicao}>❌</ButtonMini>
                  </ButtonGroup>
                </div>
              </>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: 0 }}>
                  <strong>{s.qtd}x {s.servico}</strong> - R$ {s.valorUnitario.toFixed(2)} cada
                </p>
                <ButtonGroup>
                  <ButtonMini onClick={() => iniciarEdicao(index)}>✏️</ButtonMini>
                  <ButtonMini onClick={() => onExcluir(index)}>❌</ButtonMini>
                </ButtonGroup>
              </div>
            )}
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default ListaServicos;
