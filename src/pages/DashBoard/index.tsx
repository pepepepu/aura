import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuraBG, AuraHeader, Box, Dropdown, Text } from "../../components";
import { themes } from "../../styles/themes";
import {
  extractColorPalette,
  type ColorPaletteResult,
} from "../../utils/color_functions/extractColorPalette";
import { getNowPlaying, type AuraTrack } from "../../services/lastFMServices";
import { UserContext } from "../../context/userContext";

const Dashboard: React.FC = () => {
  const { userInfo } = useContext(UserContext);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<AuraTrack | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [albumPalette, setAlbumPalette] = useState<ColorPaletteResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [isCapturing, setIsCapturing] = useState(false);

  const handleNativeCapture = async () => {
    setIsCapturing(true);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      alert(
        "A API de captura de tela não é suportada neste navegador ou o contexto não é seguro (HTTPS)."
      );
      setIsCapturing(false);
      return;
    }

    let stream: MediaStream | null = null;

    try {
      // 1. Pede a permissão para o usuário
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      const track = stream.getVideoTracks()[0];

      // --- INÍCIO DA MUDANÇA PARA COMPATIBILIDADE COM SAFARI ---

      // 2. Criar um elemento de vídeo temporário e oculto
      const video = document.createElement("video");
      video.style.display = "none";
      document.body.appendChild(video);

      video.srcObject = stream;
      video.play();

      // 3. Aguardar o vídeo carregar para ter as dimensões corretas
      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => {
          resolve();
        };
      });

      // 4. Desenhar o frame do vídeo no canvas
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      }

      // --- FIM DA MUDANÇA ---

      // 5. Baixar a imagem
      const imageURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "aura-capture.png";
      link.click();

      // 6. Limpeza final
      document.body.removeChild(video); // Remove o vídeo do DOM
    } catch (err) {
      console.error("Erro detalhado ao capturar a tela:", err);
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        alert(
          "Você negou a permissão para capturar a tela. Verifique também as permissões do sistema (macOS)."
        );
      } else {
        alert(`Ocorreu um erro inesperado: ${(err as Error).name}`);
      }
    } finally {
      // Garante que o stream de vídeo seja parado em qualquer cenário
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setIsCapturing(false);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("lastfm_session_key");
    window.localStorage.removeItem("lastfm_username");
    navigate("/");
  };

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      try {
        const track = await getNowPlaying();

        if (currentlyPlaying?.id === track?.id) {
          return;
        }

        setCurrentlyPlaying(track);

        if (track && track.album.images[0]?.url) {
          const imageUrl = track.album.images[0].url;
          const palette = await extractColorPalette(imageUrl);
          setAlbumPalette(palette);
        } else {
          setAlbumPalette(null);
        }
      } catch (err) {
        console.error("Erro no fluxo do Dashboard:", err);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentlyPlaying();
    const intervalId = setInterval(fetchCurrentlyPlaying, 5000);
    return () => clearInterval(intervalId);
  }, [navigate, currentlyPlaying]);

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);
  const currentTheme = themes[currentThemeIndex];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const backgroundColor = albumPalette
    ? albumPalette.background
    : currentTheme.backgroundColor;
  const textColor = albumPalette ? albumPalette.text : "#000";
  const auraBgColors = albumPalette
    ? albumPalette.auraColors
    : currentTheme.colors;

  return (
    <AuraBG
      width={"100dvw"}
      height={"100dvh"}
      colors={auraBgColors}
      backgroundColor={backgroundColor}
      interactive={false}
      grainy={true}
    >
      <Dropdown
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="Tocando agora"
      />
      <AuraHeader
        title="Tocando agora"
        textColor={textColor}
        onMenuClick={toggleMenu}
        profileImageUrl={userInfo?.imageUrl}
      />

      <button
        onClick={handleNativeCapture}
        disabled={isCapturing}
        data-html2canvas-ignore="true" // Este atributo não é mais necessário aqui, mas mantive por clareza
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        {isCapturing ? "⏳" : "📷"}
      </button>

      <Box
        $width={{ base: "100%", lg: "95%" }}
        $height={"100%"}
        $padding={"70px 40px"}
        $flexDirection={"column"}
        $gap={"8px"}
        $justifyContent={"flex-end"}
      >
        {isLoading ? (
          <Box
            $width={"100%"}
            $alignItems={"flex-start"}
            $flexDirection="column"
            $gap="6px"
          >
            <Text
              $fontFamily={"Instrument Serif"}
              $fontSize={"3.5rem"}
              $fontWeight={"400"}
              $lineHeight="auto"
            >
              {"Sintonizando..."}
            </Text>
          </Box>
        ) : currentlyPlaying ? (
          <Box
            $width={"100%"}
            $alignItems={"flex-start"}
            $flexDirection="column"
            $gap="5px"
          >
            <Text
              $fontFamily={"Instrument Serif"}
              $fontSize={"3.5rem"}
              $fontWeight={"400"}
              $lineHeight="auto"
              $color={textColor}
            >
              {currentlyPlaying.name}
            </Text>
            <Text
              $fontFamily={"Instrument Serif"}
              $fontStyle={"italic"}
              $fontSize={"1.2rem"}
              $fontWeight={"400"}
              $color={textColor}
            >
              {currentlyPlaying.artists.map((a) => a.name).join(", ")}
            </Text>
          </Box>
        ) : (
          <Text
            $fontFamily={"Instrument Serif"}
            $fontStyle={"italic"}
            $fontSize={"1.3rem"}
            $fontWeight={"400"}
          >
            Nenhuma música está em scrobble no momento. Abra seu player!
          </Text>
        )}
      </Box>
    </AuraBG>
  );
};

export default Dashboard;
