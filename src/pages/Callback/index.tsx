// src/pages/Callback/index.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuraBlobs, Box, BlurText, GrainOverlay } from "../../components";
// 1. Importamos a nova função do nosso serviço de autenticação
import { getLastfmSession } from "../../services/lastFmAuth";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Sintonizando sua frequência...");

  useEffect(() => {
    const processAuth = async () => {
      try {
        // 2. Lemos os parâmetros da busca na URL (?...) em vez do hash (#...)
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token"); // Procuramos por 'token', não 'access_token'

        // Se não houver token, o usuário provavelmente negou o acesso ou houve um erro.
        if (!token) {
          setStatus("Não sentimos sua energia. Vamos tentar novamente.");
          console.error("Callback do Last.fm alcançado sem um token.");
          setTimeout(() => navigate("/"), 4000);
          return;
        }

        // 3. A mágica principal: trocamos o token pela sessão
        setStatus("Conectando com sua alma musical...");
        const session = await getLastfmSession(token);

        // 4. Verificamos se a sessão foi obtida com sucesso
        if (session && session.sk && session.name) {
          // 5. Salvamos os dados da sessão no localStorage
          window.localStorage.setItem("lastfm_sk", session.sk);
          window.localStorage.setItem("lastfm_user", session.name);

          // Agora, continuamos com sua bela sequência de status
          setStatus("Mapeando a geografia da sua aura...");
          await new Promise((resolve) => setTimeout(resolve, 2000));

          setStatus("Revelando seu universo interior...");
          await new Promise((resolve) => setTimeout(resolve, 2000));

          setStatus("Sua energia foi sincronizada!");
          await new Promise((resolve) => setTimeout(resolve, 2500));

          navigate("/dashboard");
        } else {
          // Se a função `getLastfmSession` retornou null, houve um erro na API
          setStatus("Dissonância na sua aura... Recalibrando sua energia.");
          console.error(
            "Falha ao obter a sessão do Last.fm após a autorização."
          );
          setTimeout(() => navigate("/"), 4000);
        }
      } catch (e) {
        console.error("Falha ao processar o callback do Last.fm:", e);
        setStatus(
          "Houve uma interferência cósmica. Retornando ao ponto de partida."
        );
        setTimeout(() => navigate("/"), 4000);
      }
    };

    processAuth();
  }, [navigate]);

  // Nenhuma mudança é necessária no JSX. A interface permanece a mesma!
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
