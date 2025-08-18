// src/components/AlertModal.tsx

import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translate(-50%, -60%); opacity: 0; }
  to { transform: translate(-50%, -50%); opacity: 1; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 24px 32px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;
  color: #333;
`;

const ModalTitle = styled.h2`
  font-family: "Instrument Serif", serif;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 12px;
  color: #111;
`;

const ModalMessage = styled.p`
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const CloseButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #555;
  }
`;

interface AlertModalProps {
  message: string | null;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ message, onClose }) => {
  if (!message) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Aviso</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <CloseButton onClick={onClose}>Entendido</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AlertModal;
