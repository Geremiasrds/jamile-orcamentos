import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
`;

export const Titulo = styled.h2`
  text-align: center;
  color: #004080;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 10px 16px;
  margin-top: 12px;
  background-color: #004080;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0066cc;
  }
`;

export const ListItem = styled.li`
  background: #fff;
  padding: 8px;
  margin: 4px 0;
  border-radius: 6px;
  border-left: 4px solid #004080;
`;

export const Card = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  margin: 12px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

export const CardBody = styled.div`
  margin-top: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const ButtonMini = styled.button`
  padding: 6px 10px;
  margin: 4px;
  border: none;
  border-radius: 6px;
  background-color: #004080;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #0066cc;
  }
`;

// Título do card do orçamento
export const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #004080;
  margin-bottom: 8px;
`;

// Subtítulo do card
export const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: normal;
  color: #333;
  margin-bottom: 8px;
`;

// Tabela para mostrar os serviços
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

// Linha da tabela
export const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

// Célula da tabela
export const TableCell = styled.td`
  padding: 6px;
  text-align: left;
  font-size: 14px;
`;





