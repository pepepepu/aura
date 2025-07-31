import React, { useState, useEffect } from "react";
import { AuraBG, Box, Button, Image, Text, AuraPopUp } from "../../components";
import spotifyIcon from "../../assets/icons/spotify.png";
import { handleSpotifyLogin } from "../../services/spotifyAuth";
import { useNavigate } from "react-router-dom";

const themes = [
  {
    colors: ["#8B8BB8", "#D4A570", "#be7016", "#84BDD1", "#D0A766"],
    backgroundColor: "#7AC1C7",
  },
  {
    colors: ["#E773B8", "#EB8079", "#EE9965", "#EFAD57", "#be5594"],
    backgroundColor: "#DF8FEE",
  },
  {
    colors: ["#DFB065", "#8a97f7", "#EDAB74", "#D991AF", "#e0b5c7"],
    backgroundColor: "#7f91cf",
  },
  {
    colors: ["#BEDB48", "#DFCB3F", "#F6BB39", "#2f663c", "#db9c14"],
    backgroundColor: "#07C794",
  },
];

const SplashScreen: React.FC = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnecting) return;
    const intervalId = setInterval(() => {
      setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
    }, 15000);
    return () => clearInterval(intervalId);
  }, [isConnecting]);

  const currentTheme = themes[currentThemeIndex];

  const handleConnectClick = () => {
    setIsConnecting(true);
  };

  const handleTransitionEnd = () => {
    setTimeout(() => {
      handleSpotifyLogin();
    }, 300);
  };

  const goToPrivacyPolicy = () => {
    navigate("/privacy-policy");
  };

  const goToTermsAndConditions = () => {
    navigate("/terms-and-conditions");
  };

  const openPopUp = () => {
    setIsPopupOpen(true);
  };

  return (
    <AuraBG
      width={"100dvw"}
      height={"100dvh"}
      colors={currentTheme.colors}
      backgroundColor={currentTheme.backgroundColor}
      interactive={false}
      grainy={true}
      isTransitioning={isConnecting}
      onTransitionComplete={handleTransitionEnd}
    >
      {isPopupOpen && <AuraPopUp onClose={() => setIsPopupOpen(false)} />}
      <Box
        $width={"100dvw"}
        $height={"100dvh"}
        $justifyContent={"space-between"}
        $padding={"30px 0px 20px 0px"}
      >
        <Box $width={"80%"} $justifyContent={"flex-end"} $flexDirection={"row"}>
          <Button onClick={openPopUp}>
            <Text
              $fontFamily={"EB Garamond"}
              $fontSize={"1.5rem"}
              $fontWeight={"800"}
            >
              ???
            </Text>
          </Button>
        </Box>
        <Box $width={"100%"}>
          <Text
            $fontFamily={"EB Garamond"}
            $fontSize={"4rem"}
            $fontWeight={"500"}
            $fontStyle={"italic"}
            $letterSpacing={"-3px"}
            $lineHeight={"45px"}
          >
            Aura
          </Text>
          <Text
            $fontFamily={"EB Garamond"}
            $fontSize={"1.3rem"}
            $fontWeight={"400"}
            $fontStyle={"italic"}
          >
            sua música, sua energia
          </Text>
        </Box>
        <Box
          $width={"100%"}
          $margin={"0px 0px 20px 0px"}
          $flexDirection={"column"}
          $gap={"15px"}
        >
          <Button
            $width={{ base: "65%", lg: "30%" }}
            $padding={"15px 0px"}
            $border={"1px solid #141414"}
            $borderRadius={"100px"}
            onClick={handleConnectClick}
          >
            <Box $width={"100%"} $flexDirection={"row"} $gap={"10px"}>
              <Image src={spotifyIcon} width={"25px"} />
              <Text
                $fontFamily={"EB Garamond"}
                $fontSize={"1.1rem"}
                $fontWeight={"400"}
              >
                Conectar com o Spotify
              </Text>
            </Box>
          </Button>

          <Box
            $width={"100%"}
            $flexDirection={{ base: "column", lg: "row", md: "row" }}
          >
            <Text
              $fontFamily={"EB Garamond"}
              $fontSize={"1rem"}
              $fontWeight={"400"}
            >
              Ao se conectar, você concorda com nossos
            </Text>
            <Box $flexDirection={"row"}>
              <Button onClick={goToTermsAndConditions}>
                <Text
                  $fontFamily={"EB Garamond"}
                  $fontSize={"1rem"}
                  $fontWeight={"700"}
                  $textDecoration={"underline"}
                >
                  Termos e Condições
                </Text>
              </Button>
              <Text
                $fontFamily={"EB Garamond"}
                $fontSize={"1rem"}
                $fontWeight={"400"}
              >
                e
              </Text>
              <Button onClick={goToPrivacyPolicy}>
                <Text
                  $fontFamily={"EB Garamond"}
                  $fontSize={"1rem"}
                  $fontWeight={"700"}
                  $textDecoration={"underline"}
                >
                  Política de Privacidade
                </Text>
              </Button>
            </Box>
          </Box>

          <Box $width={{ base: "85%", lg: "45%", md: "60%" }}>
            <Text
              $fontFamily={"Instrument Serif"}
              $fontSize={{ base: "0.8rem", md: "0.9rem" }}
              $fontWeight={"400"}
              $textAlign="center"
            >
              Aura é uma aplicação independente que utiliza a API do Spotify.
              Não possuímos afiliação com o Spotify AB.
            </Text>
          </Box>
        </Box>
      </Box>
    </AuraBG>
  );
};

export default SplashScreen;
