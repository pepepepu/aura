import React, { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import { Box, Text, Button } from "../.."; // Assumindo que o Button está no mesmo lugar

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
      $isClosing={isClosing}
      $display="flex"
      $alignItems="center"
      $justifyContent="center"
    >
      <Button
        onClick={handleClose}
        $position="absolute"
        $top="15px"
        $right="0px"
        $background="transparent"
        $border="none"
        $padding="10px"
        style={{ cursor: "pointer" }}
      >
        <Text
          $fontSize="1.8rem"
          $fontWeight="400"
          $color="#333"
          style={{ lineHeight: 1 }}
        >
          &times;
        </Text>
      </Button>
      <AnimatedContent
        $width={"80%"}
        $position="relative"
        onClick={(e) => e.stopPropagation()}
        $isClosing={isClosing}
        $gap="20px"
        $display="flex"
        $flexDirection="column"
        $alignItems="center"
        $padding="20px"
      >
        <Text
          $fontFamily={"Instrument Serif"}
          $fontSize={"2.5rem"}
          $textAlign="center"
        >
          Ode ao que é Aura
        </Text>
        <Box
          $width={{ base: "90%", lg: "60%" }}
          $maxHeight={"60dvh"}
          $overflowY={"auto"}
          $justifyContent="flex-start"
          $alignItems="center"
          $gap="30px"
          $padding={{ base: "0 10px", md: "0 20px" }}
        >
          <Text
            $fontFamily={"Instrument Serif"}
            $fontSize={{ base: "1.2rem", md: "1.4rem" }}
            $fontWeight={"400"}
            $textAlign="center"
          >
            O Aura revela a energia das suas músicas em cores. Para isso, ele
            utiliza seu histórico do <strong>Last.fm</strong>, que registra o
            que você ouve no <strong>Spotify</strong> e em outros players.
          </Text>

          <Box $width="100%" $alignItems="flex-start" $gap="15px">
            <Text
              $fontFamily={"Instrument Serif"}
              $fontSize={"1.5rem"}
              $textAlign="center"
            >
              Como Começar
            </Text>

            <Text
              $textAlign={"justify"}
              style={{ textIndent: "-20px", marginLeft: "20px" }}
            >
              <strong>1. Crie uma conta no Last.fm:</strong> Se você ainda não
              tem, o primeiro passo é se registrar. É rápido e gratuito.
              <a
                href="https://www.last.fm/join"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  marginLeft: "4px",
                }}
              >
                Clique aqui para criar.
              </a>
            </Text>

            <Text
              $textAlign={"justify"}
              style={{ textIndent: "-20px", marginLeft: "20px" }}
            >
              <strong>2. Conecte seu Spotify:</strong> Nas configurações do
              Last.fm, autorize a conexão com o Spotify. Assim, tudo que você
              ouvir será registrado (isso se chama "scrobbling").
              <a
                href="https://www.last.fm/settings/applications"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  marginLeft: "4px",
                }}
              >
                Clique aqui para conectar.
              </a>
            </Text>

            <Text
              $textAlign={"justify"}
              style={{ textIndent: "-20px", marginLeft: "20px" }}
            >
              <strong>3. Volte e conecte-se ao Aura:</strong> Com tudo pronto,
              basta fazer o login no Aura com sua conta Last.fm para que sua
              energia musical seja revelada.
            </Text>
          </Box>

          <Text
            $fontFamily={"Instrument Serif"}
            $fontSize={{ base: "1.1rem", md: "1.3rem" }}
            $fontWeight={"400"}
            $textAlign="center"
            $fontStyle="italic"
            style={{ opacity: 0.8 }}
          >
            É a sua essência musical, antes um eco sentido no peito, finalmente
            liberta para dançar no campo da sua visão.
          </Text>
        </Box>
        {/* --- TEXTO DE "CLIQUE FORA" REMOVIDO --- */}
      </AnimatedContent>
    </AnimatedWrapper>
  );
};

export default AuraPopUp;
