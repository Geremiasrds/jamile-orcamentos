import styled, { keyframes, css } from "styled-components";

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 8px #00c896, 0 0 20px #00c896;
  }
  50% {
    box-shadow: 0 0 15px #00fcb0, 0 0 30px #00fcb0;
  }
`;

// Temas claro e escuro
export const lightTheme = {
  background: "rgba(253, 253, 253, 0.19)",
  cardBackground: "#fff",
  primary: "#004080",
  primaryLight: "rgb(8, 112, 216)",
  text: "#222",
  textSecondary: "#333",
  borderColor: "#ccc",
  buttonHover: "#0066cc",
  glowColor: "#00c896",
  copyButtonColor: "green",
  shadow: "rgba(15, 58, 100, 0.15)",
};

export const darkTheme = {
  background: "#121212",
  cardBackground: "#222",
  primary: "#3399ff",
  primaryLight: "#66b3ff",
  text: "#ddd",
  textSecondary: "#bbb",
  borderColor: "#444",
  buttonHover: "#3385ff",
  glowColor: "#00fcb0",
  copyButtonColor: "#7CFC00",
  shadow: "rgba(0, 0, 0, 0.8)",
};

const baseFontSize = 16; // Fonte mínima para evitar zoom iOS

export const Container = styled.div`
  max-width: 600px;
  width: 95%;
  margin: auto;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  touch-action: manipulation;

  /* Responsivo mobile */
  @media (max-width: 480px) {
    padding: 15px 10px;
  }
`;

export const Titulo = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.primaryLight};
  font-weight: 900;
  font-size: 2.5rem;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 12px 14px;
  margin: 8px 0;
  border-radius: 10px;
  font-size: ${baseFontSize}px; /* mínimo 16px pra evitar zoom iOS */
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: border-color 0.3s;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.cardBackground};
  -webkit-text-size-adjust: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.primaryLight};
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const buttonBase = css`
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  -webkit-text-size-adjust: 100%;
`;

export const ButtonDeCopia = styled.button`
  ${buttonBase};
  padding: 8px 0;
  margin-top: 10px;
  margin-left: 100px;
  background-color: rgba(138, 140, 141, 0);
  border: 1px solid black;
  font-size: 16px; /* evitar zoom iOS */
  color: ${({ theme }) => theme.copyButtonColor};
  width: 40px;
  position: absolute;

  &:hover {
    background-color: rgb(224, 225, 226);
  }

  @media (max-width: 480px) {
    margin-left: 70px;
  }
`;

export const ButtonDePdf = styled.button`
  ${buttonBase};
  padding: 14px 20px;
  margin-top: 18px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  font-size: 16px;
  max-width: 300px;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

export const Button = styled.button`
  ${buttonBase};
  padding: 14px 20px;
  margin-top: 18px;
  background-color: ${({ theme }) => theme.primary};
  color: blavk;
  border: none;
  font-size: 16px;
  width: 100%;
  max-width: 300px;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

export const ListItem = styled.li`
  background: ${({ theme }) => theme.cardBackground};
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 8px;
  border-left: 5px solid ${({ theme }) => theme.primary};
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  box-shadow: 0 1px 5px ${({ theme }) => theme.shadow};
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  margin: 8px 0;
  box-shadow: 0 6px 12px ${({ theme }) => theme.shadow};
  max-width: 600px;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 900;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
`;

export const CardBody = styled.div`
  margin-top: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const ButtonMini = styled.button`
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 800;
  padding: 8px 14px;
  cursor: pointer;
  transition: background-color 0.4s;
  font-size: 16px;

  &:hover {
    background-color: rgb(0, 204, 17);
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 14px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const SubTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 12px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 14px;
  font-size: 1rem;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

export const TableCell = styled.td`
  padding: 10px 8px;
  text-align: left;
  color: ${({ theme }) => theme.textSecondary};
`;

export const QuantidadeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
`;

export const QuantidadeBotao = styled.button`
  width: 42px;
  height: 42px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.primary};
  color: black;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

export const QuantidadeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 10px;
  padding: 4px 10px;
  background-color: #f4faff;
  width: 80px;
`;

export const QuantidadeNumero = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

export const QuantidadeLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.glowColor};
  color: black;
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
    background-color: ${({ theme }) => theme.glowColor};
    animation: ${glow} 2s infinite ease-in-out;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 180, 130, 0.8);
  }
`;

/* Responsividade geral para telas pequenas */
export const ResponsiveWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 0 14px;

  @media (max-width: 480px) {
    padding: 0 8px;
  }
`;
