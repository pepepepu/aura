import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuraBlobs, Box, BlurText, GrainOverlay } from "../../components";
import { getSessionKey } from "../../services/lastFMAuth";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("Sintonizando sua frequência...");
  const hasFetched = useRef(false);

  useEffect(() => {
    const processAuth = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        setStatus(
          "Não conseguimos sentir sua energia. Vamos tentar novamente."
        );
        setTimeout(() => navigate("/"), 4000);
        return;
      }

      try {
        setStatus("Conectando com sua alma musical...");
        await getSessionKey(token);

        setStatus("Mapeando a geografia da sua aura...");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setStatus("Revelando seu universo interior...");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setStatus("Sua energia foi sincronizada!");
        await new Promise((resolve) => setTimeout(resolve, 2500));

        navigate("/dashboard");
      } catch (error) {
        setStatus(
          "Houve uma interferência cósmica. Retornando ao ponto de partida."
        );
        console.error("Falha ao processar o callback do Last.fm:", error);
        setTimeout(() => navigate("/"), 4000);
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      processAuth();
    }
  }, [navigate, location]);
  return (
    <Box $width={"100dvw"} $height={"100dvh"} $background={"#CDECCE"}>
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
