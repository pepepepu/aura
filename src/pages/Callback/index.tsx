import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuraBlobs, Box, BlurText, GrainOverlay } from "../../components";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Sintonizando sua frequência...");

  useEffect(() => {
    const processAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get("access_token");
        const error = params.get("error");

        if (error) {
          setStatus("Dissonância na sua aura... Recalibrando sua energia.");
          console.error(`Spotify Auth Error: ${error}`);
          setTimeout(() => navigate("/"), 4000);
          return;
        }

        if (accessToken) {
          window.localStorage.setItem("spotify_token", accessToken);

          setStatus("Conectando com sua alma musical...");
          await new Promise((resolve) => setTimeout(resolve, 2000));

          setStatus("Mapeando a geografia da sua aura...");
          await new Promise((resolve) => setTimeout(resolve, 2000));

          setStatus("Revelando seu universo interior...");
          await new Promise((resolve) => setTimeout(resolve, 2000));

          setStatus("Sua energia foi sincronizada!");
          await new Promise((resolve) => setTimeout(resolve, 2500));

          navigate("/dashboard");
        } else {
          setStatus(
            "Não conseguimos sentir sua energia. Vamos tentar novamente."
          );
          console.error(
            "Callback page reached without access_token or error in hash."
          );
          setTimeout(() => navigate("/"), 4000);
        }
      } catch (e) {
        console.error("Falha ao processar o callback do Spotify:", e);
        setStatus(
          "Houve uma interferência cósmica. Retornando ao ponto de partida."
        );
        setTimeout(() => navigate("/"), 4000);
      }
    };

    processAuth();
  }, [navigate]);

  return (
    <Box
      $width={"100dvw"}
      $height={"100dvh"}
      $background={"#CDECCE"}
    >
      <GrainOverlay />
      <Box
        $width={"150px"}
        $height={"150px"}
        $borderRadius={"100px"}
        $overflow={"hidden"}
      >
        <AuraBlobs
          backgroundColor="#CDECCE"
          color1="#94AEF3"
          color2="#FBF8C1"
        />
      </Box>
      <Box
        $width={"85%"}
        $height={"15%"}
        $justifyContent={"flex-start"}
        $padding={"15px 0px"}
      >
        <BlurText
          key={status}
          text={status}
          delay={100}
          animateBy="words"
          direction="top"
          $fontFamily={"Instrument Serif"}
          $fontSize={"1.3em"}
          $textAlign={"center"}
        />
      </Box>
    </Box>
  );
};

export default Callback;
