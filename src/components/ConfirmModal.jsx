import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 16px;
  font-size: 1.2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ModalButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ variant }) =>
    variant === "cancel" ? "#ccc" : "#cc0000"};
  color: ${({ variant }) => (variant === "cancel" ? "#000" : "#fff")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "cancel" ? "#bbb" : "#b30000"};
  }
`;

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <Overlay>
      <Modal>
        <Title>Tem certeza que deseja excluir este orçamento?</Title>
        <ButtonGroup>
          <ModalButton onClick={onConfirm}>Sim, excluir</ModalButton>
          <ModalButton variant="cancel" onClick={onCancel}>Cancelar</ModalButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
};

export default ConfirmModal;
