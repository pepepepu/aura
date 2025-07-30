import React, { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import { Box, Text } from "../..";

interface AuraPopUpProps {
  onClose: () => void;
}

// ... keyframes (sem alterações) ...

const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; }`;
const fadeOut = keyframes` from { opacity: 1; } to { opacity: 0; }`;
const scaleUp = keyframes` from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; }`;
const scaleDown = keyframes` from { transform: scale(1); opacity: 1; } to { transform: scale(0.95); opacity: 0; }`;

const AnimatedWrapper = styled(Box) <{ $isClosing: boolean }>`
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out forwards;
`;

const AnimatedContent = styled(Box) <{ $isClosing: boolean }>`
  animation: ${({ $isClosing }) => ($isClosing ? scaleDown : scaleUp)} 0.3s ease-in-out forwards;
`;

const AuraPopUp: React.FC<AuraPopUpProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <AnimatedWrapper
      $position="fixed"
      $top="0"
      $left="0"
      $width="100dvw"
      $height="100dvh"
      $background="rgba(255, 255, 255, 0.068)"
      $backdropFilter="blur(8px)"
      $zIndex={1000}
      onClick={handleClose}
      $isClosing={isClosing}
      $display="flex"
      $alignItems="center"
      $justifyContent="center"
    >
      <AnimatedContent
        $width={"80%"}
        $position="relative"
        onClick={(e) => e.stopPropagation()}
        $isClosing={isClosing}
        $gap="20px"
        $display="flex"
        $flexDirection="column"
        $alignItems="center"
      >
        <Text
          $fontFamily={"Instrument Serif"}
          $fontSize={"2.5rem"}
          $textAlign="center"
        >
          Ode ao que é Aura
        </Text>
        <Box
          $width={"100%"}
          $maxHeight={"55dvh"}
          $overflowY={"auto"}
          $justifyContent="flex-start"
        >
          <Text
            $fontFamily={"Instrument Serif"}
            $fontSize={{ base: "1.2rem", md: "1.4rem" }}
            $fontWeight={"400"}
            $textAlign="center"
          >
            Aura é o feitiço que ensina os olhos a ouvir, o portal que revela a cor secreta guardada em cada som. É a tradução da vibração em luz, a resposta luminosa para a melodia que habita em você.
            <br></br>
            <br></br>
            Não se trata apenas da canção que passa, mas daquela que permanece. Para o instante, ela é o brilho efêmero, a dança de cores que espelha o seu agora. Para a alma, ela tece o tempo, criando um mosaico de emoções com as suas trilhas mais queridas, a sua assinatura anímica em tons e brilhos.
            <br></br>
            <br></br>
            É a sua essência musical, antes invisível, finalmente liberta para dançar diante dos seus olhos.
          </Text>
        </Box>
        <Text $margin={"10px 0px"} $fontFamily={"Instrument Serif"} $fontSize={"1rem"} $fontStyle={"italic"}>
          Clique em qualquer lugar para fechar
        </Text>
      </AnimatedContent>
    </AnimatedWrapper>
  );
};

export default AuraPopUp;