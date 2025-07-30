import React, { useState } from "react";
import { AuraBG, Box, Text, Button } from "../../components";
import { useNavigate } from "react-router-dom";
import VersaoPTBR from "./v-pt";
import VersaoENG from "./v-eng";

const theme = [
  {
    colors: ["#DFB065", "#8a97f7", "#EDAB74", "#D991AF", "#e0b5c7"],
    backgroundColor: "#7f91cf",
  },
];

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const [isEnglish, setIsEnglish] = useState(false);

  const goToSplash = () => {
    navigate("/");
  };

  const onSwitchLanguage = () => {
    setIsEnglish(!isEnglish);
  }

  return (
    <AuraBG
      width={"100dvw"}
      height={"100dvh"}
      colors={theme[0].colors}
      backgroundColor={theme[0].backgroundColor}
      interactive={false}
      grainy={true}
    >
      <Box $width={"100%"} $height={"100%"} $gap="20px">
        {/* Botão de Sair */}
        <Box $position={"absolute"} $top={"50px"} $left={"30px"} $padding={{ base: "0px", lg: "20px 30px", md: "20px 10px" }}>
          <Button onClick={goToSplash}>
            <Text $textDecoration={"underline"} $fontSize={{ base: "17px", lg: "1.2rem", md: "1.2rem" }}>
              Voltar
            </Text>
          </Button>
        </Box>

        {/* Título */}
        <Box>
          <Text $fontFamily={"EB Garamond"} $fontSize={"4rem"} $fontWeight={"500"} $fontStyle={"italic"} $letterSpacing={"-3px"} $lineHeight={"1"}>
            Aura
          </Text>
          <Text $fontFamily={"EB Garamond"} $fontSize={"1rem"} $fontWeight={"500"} $lineHeight={"1"}>
            {!isEnglish ? "Política de Privacidade" : "Privacy Policy"}
          </Text>
        </Box>

        {/* Conteúdo */}
        {isEnglish ? (
          <VersaoENG />
        ) : (
          <VersaoPTBR />
        )}

        {/* Seleção de idioma */}
        <Box $width={{ base: "90%", lg: "50%", md: "75%" }} $alignItems={"flex-end"} $padding={"0px 10px"}>
          <Button onClick={onSwitchLanguage}>
            <Text $textDecoration={"underline"} $fontWeight={"700"} $fontStyle={"italic"}>
              {!isEnglish ? "English version" : "Versão em Português"}
            </Text>
          </Button>
        </Box>
      </Box>
    </AuraBG>
  )
}

export default PrivacyPolicy;