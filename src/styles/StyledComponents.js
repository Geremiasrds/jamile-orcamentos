import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  padding: 30px 20px;
  max-width: 600px;
  margin: 40px auto;
  background:rgb(255, 251, 249);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 64, 128, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Titulo = styled.h2`
  text-align: center;
  color:rgb(8, 112, 216);
  font-weight: 900;
  font-size: 2.5rem;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 12px 14px;
  margin: 10px 0;
  border-radius: 10px;
  font-size: 1.1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color:rgb(13, 119, 224);
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 12px 20px;
  margin-top: 18px;
  background-color: #004080;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  width: 100%;
  max-width: 300px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0066cc;
  }
`;

export const ListItem = styled.li`
  background: #fff;
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 8px;
  border-left: 5px solid #004080;
  font-size: 1rem;
  color: #222;
  box-shadow: 0 1px 5px rgba(0, 64, 128, 0.1);
`;

export const Card = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 14px;
  margin: 20px 0;
  box-shadow: 0 6px 12px rgba(0, 64, 128, 0.1);
  width: 100%;
  max-width: 600px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color:rgb(0, 0, 0);
  font-size: 1.2rem;
`;

export const CardBody = styled.div`
  margin-top: 14px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export const ButtonMini = styled.button`
  border: none;
  border-radius: 8px;
  background-color: #004080;
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: background-color 0.4s;

  &:hover {
    background-color:rgb(0, 204, 17);
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #004080;
  margin-bottom: 14px;
  text-align: center;
`;

export const SubTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
  text-align: center;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 14px;
  font-size: 1rem;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

export const TableCell = styled.td`
  padding: 10px 8px;
  text-align: left;
  color: #444;
`;
// Alinha os botões ➕ ➖ com a quantidade no meio
export const QuantidadeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
`;

// Botões ➕ e ➖ com mesmo tamanho e estilo arredondado
export const QuantidadeBotao = styled.button`
  width: 42px;
  height: 42px;
  font-size: 20px;
  background-color: #004080;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0066cc;
  }
`;

// Caixa que mostra a quantidade com título "Serviços"
export const QuantidadeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #004080;
  border-radius: 10px;
  padding: 4px 10px;
  background-color: #f4faff;
  width: 80px;
`;

export const QuantidadeNumero = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #004080;
`;

export const QuantidadeLabel = styled.span`
  font-size: 12px;
  color: #333;
`;


// styledComponents.js


// Animação glow pulsante
const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 8px #00c896, 0 0 20px #00c896;
  }
  50% {
    box-shadow: 0 0 15px #00fcb0, 0 0 30px #00fcb0;
  }
`;

export const AddButton = styled.button`
  background-color: #00c896;
  color: white;
  margin-top: 15px;
  font-weight: 700;
  padding: 10px 28px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-size: 1.3rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 200, 150, 0.6);

  &:hover {
    background-color: #00b386;
    animation: ${glow} 2s infinite ease-in-out;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 180, 130, 0.8);
  }
`;
