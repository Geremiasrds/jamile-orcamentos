import styled from "styled-components";

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
  color: #004080;
  font-weight: 700;
  font-size: 2.2rem;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 12px 14px;
  margin: 10px 0;
  border: 1.5px solid #004080;
  border-radius: 10px;
  font-size: 1.1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0066cc;
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
  color: #004080;
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
