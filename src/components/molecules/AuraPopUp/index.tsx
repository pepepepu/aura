import React, { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import { Box, Text } from "../..";

interface AuraPopUpProps {
  onClose: () => void;
}

const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; }`;
const fadeOut = keyframes` from { opacity: 1; } to { opacity: 0; }`;
const scaleUp = keyframes` from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; }`;
const scaleDown = keyframes` from { transform: scale(1); opacity: 1; } to { transform: scale(0.95); opacity: 0; }`;

const AnimatedWrapper = styled(Box)<{ $isClosing: boolean }>`
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s
    ease-in-out forwards;
`;

const AnimatedContent = styled(Box)<{ $isClosing: boolean }>`
  animation: ${({ $isClosing }) => ($isClosing ? scaleDown : scaleUp)} 0.3s
    ease-in-out forwards;
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
          $width={{ base: "90%", lg: "50%" }}
          $maxHeight={"60dvh"}
          $overflowY={"auto"}
          $justifyContent="flex-start"
        >
          <Text
            $fontFamily={"Instrument Serif"}
            $fontSize={{ base: "1.2rem", md: "1.4rem" }}
            $fontWeight={"400"}
            $textAlign="center"
          >
            O Aura conecta-se à sua conta do Spotify e cria uma experiência
            visual baseada nas músicas que você ouve. Acompanhe cores, energia e
            estados de espírito representados em animações enquanto a música
            toca.
            <br></br>
            <br></br>
            Aura é a ressonância primordial, o dom de perceber com os olhos a
            música da existência. É o desvelar da cor que habita cada vibração,
            a manifestação visível da energia que uma melodia desperta em você.
            <br></br>
            <br></br>
            Ela transcende a canção passageira para tocar aquilo que é
            permanente. No momento presente, é o fulgor efêmero, um reflexo do
            seu estado de espírito em cores dançantes. Na jornada da alma, ela
            compõe o seu universo particular, um mosaico de sentimentos
            desenhado com suas músicas mais queridas. É o seu campo de energia,
            a sua identidade vibracional expressa em luz.
            <br></br>
            <br></br>É a sua essência musical, antes um eco sentido no peito,
            finalmente liberta para dançar no campo da sua visão.
          </Text>
        </Box>
        <Text
          $margin={"10px 0px"}
          $fontFamily={"Instrument Serif"}
          $fontSize={"1rem"}
          $fontStyle={"italic"}
        >
          Clique em qualquer lugar para fechar
        </Text>
      </AnimatedContent>
    </AnimatedWrapper>
  );
};

export default AuraPopUp;
