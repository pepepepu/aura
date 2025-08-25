import React, { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import { Box, Text, Button, SVG } from "../..";
import { useLocation } from "react-router-dom";

import Energia from "../../../assets/svg/energia.svg?react"
import Aura02 from "../../../assets/svg/aura02.svg?react"
import Tarot from "../../../assets/svg/tarot.svg?react"
import Constelacao from "../../../assets/svg/constelacao.svg?react"

interface AuraInfoProps {
  onClose: () => void;
  textColor?: string;
}

const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; }`;
const fadeOut = keyframes` from { opacity: 1; } to { opacity: 0; }`;
const scaleUp = keyframes` from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; }`;
const scaleDown = keyframes` from { transform: scale(1); opacity: 1; } to { transform: scale(0.95); opacity: 0; }`;

const AnimatedWrapper = styled(Box) <{ $isClosing: boolean }>`
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s
    ease-in-out forwards;
`;

const AnimatedContent = styled(Box) <{ $isClosing: boolean }>`
  animation: ${({ $isClosing }) => ($isClosing ? scaleDown : scaleUp)} 0.3s
    ease-in-out forwards;
`;

const AuraInfo: React.FC<AuraInfoProps> = ({ onClose, textColor }) => {
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

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

  const renderContentByRoute = () => {
    switch (currentPath) {
      case "/minhaAura":
        return (
          <Box $gap={"10px"}>
            <SVG $width="150px" $color={textColor}>
              <Tarot />
            </SVG>
            <Text $fontSize="3rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Sua Aura
            </Text>
            <Text $fontSize="1.1rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Aura mergulha nas frequências ocultas da sua música mais escutada e, como um oráculo, traduz sua vibração em cinco palavras reveladoras.<br></br><br></br>Cada palavra é uma chave simbólica que abre portais para diferentes aspectos da sua essência: emoções, forças, mistérios e caminhos que ressoam com o seu momento atual.<br></br><br></br>O que parece apenas som se transforma em linguagem secreta da alma, revelando aquilo que pulsa em silêncio dentro de você.
            </Text>
          </Box>
        );
      case "/constelacao":
        return (
          <Box $gap={"10px"}>
            <SVG $width="150px" $color={textColor}>
              <Constelacao />
            </SVG>
            <Text $fontSize="3rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Seu Mapa Estelar
            </Text>
            <Text $fontSize="1.1rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Aura sintoniza o gênero musical que mais vibra em você, extraído da sua música mais escutada, e o transforma em um mapa celestial único.<br></br><br></br>Uma estrela-pai real é atribuída ao gênero, e ao seu redor nascem seis estrelas secundárias, refletindo características que ressoam com a sua energia musical.
            </Text>
          </Box>
        );
      case "/auraSemanal":
        return (
          <Box $gap={"10px"}>
            <SVG $width="150px" $color={textColor}>
              <Energia />
            </SVG>
            <Text $fontSize="3rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Sua Energia
            </Text>
            <Text $fontSize="1.1rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Aura capta as nove músicas que mais embalaram sua jornada nos últimos sete dias e revela as cores que vibram na energia de cada uma delas.<br></br><br></br>A partir desse mosaico sonoro, uma cor-pai (aquela que mais ressoa) se manifesta. <br></br><br></br>Dessa essência, nasce um espectro de seis cores, traduzindo visualmente a harmonia oculta entre sua música e sua energia interior.
            </Text>
          </Box>
        );

      case "/tarot":
        return (
          <Box $gap={"10px"}>
            <SVG $width="150px" $color={textColor}>
              <Aura02 />
            </SVG>
            <Text $fontSize="3rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Sua Carta
            </Text>
            <Text $fontSize="1.1rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Aura conecta-se à vibração da sua música mais escutada, decifra a energia que ela emana e a traduz em uma carta de Tarot.<br></br><br></br>Cada carta revela simbolicamente o estado do seu momento, refletindo aquilo que sua trilha sonora desperta em você.
            </Text>
          </Box>
        );

      default:
        return (
          <Box $gap={"10px"}>
            <Text $fontSize="3rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Tocando agora
            </Text>
            <Text $fontSize="1.1rem" $textAlign="center" $color={textColor ? textColor : "#fff"} $fontFamily={"Instrument Serif"}>
              Em tempo real, Aura sintoniza a frequência da música que você está ouvindo e a traduz em movimentos vivos.<br></br><br></br>Cada nota desperta uma animação única, refletindo visualmente a energia do instante sonoro.
            </Text>
          </Box>
        );
    }
  };

  return (
    <AnimatedWrapper
      $position="fixed"
      $top="0"
      $left="0"
      $width="100dvw"
      $height="100dvh"
      $background={"rgba(0, 0, 0, 0.2)"}
      $backdropFilter="blur(40px)"
      $zIndex={1000}
      $isClosing={isClosing}
      $display="flex"
      $alignItems="center"
      $justifyContent="center"
    >
      <Box
        $width={"90%"}
        $position={"absolute"}
        $alignItems={"flex-start"}
        $top="40px"
        $left="30px"
        $zIndex={1}
      >
        <Button
          onClick={handleClose}
          $background="transparent"
          $padding={"10px"}
          $cursor={"pointer"}
        >
          <Text
            $fontFamily={"Instrument Serif"}
            $fontSize={"1.5rem"}
            $color={textColor ? textColor : "#dddcdc"}
          >
            X
          </Text>
        </Button>
      </Box>
      <AnimatedContent
        $width={"100%"}
        $position="relative"
        onClick={(e) => e.stopPropagation()}
        $isClosing={isClosing}
        $gap="20px"
        $display="flex"
        $flexDirection="column"
        $alignItems="center"
        $padding="0px 20px"
      >
        <Box
          $width={{ base: "90%", lg: "60%" }}
          $overflowY={"auto"}
          $justifyContent="flex-start"
          $alignItems="center"
          $gap="30px"
          $padding={{ base: "0 10px", md: "0 20px" }}
        >
          {renderContentByRoute()}
        </Box>
      </AnimatedContent>
    </AnimatedWrapper>
  );
};

export default AuraInfo;
