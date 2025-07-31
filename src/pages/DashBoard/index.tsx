// src/pages/Dashboard/index.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuraBG, AuraHeader, Box, Dropdown, Text } from "../../components";
import { themes } from "../../styles/themes";
import {
  extractColorPalette,
  type ColorPaletteResult,
} from "../../utils/extractColorPalette";
import * as lastfmApi from "../../services/lastFmAPI";

// 2. Definimos as novas interfaces para os dados do Last.fm
interface LastfmImage {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

interface LastfmArtist {
  mbid: string;
  "#text": string;
}

interface LastfmTrack {
  artist: LastfmArtist;
  name: string;
  mbid: string;
  image: LastfmImage[];
  "@attr"?: {
    nowplaying?: "true";
  };
}

const Dashboard: React.FC = () => {
  // O estado agora usa a nova interface
  const [currentlyPlaying, setCurrentlyPlaying] = useState<LastfmTrack | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [albumPalette, setAlbumPalette] = useState<ColorPaletteResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 3. Atualizamos a função de logout
  const handleLogout = () => {
    window.localStorage.removeItem("lastfm_sk");
    window.localStorage.removeItem("lastfm_user");
    navigate("/");
  };

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      // 4. Verificamos as novas chaves no localStorage
      const user = window.localStorage.getItem("lastfm_user");
      // A chave de sessão (sk) não é necessária para esta chamada, mas sua presença confirma o login.
      const sk = window.localStorage.getItem("lastfm_sk");

      if (!user || !sk) {
        setIsLoading(false);
        navigate("/");
        return;
      }

      try {
        // 5. Usamos nosso serviço para chamar a API
        const data = await lastfmApi.getRecentTracks(user);

        const track = data?.recenttracks?.track?.[0];

        // 6. Verificamos se a música está realmente "tocando agora"
        if (track && track["@attr"]?.nowplaying === "true") {
          // Usamos o nome da música e do artista como uma "ID" para verificar se a música mudou
          const currentTrackId = currentlyPlaying
            ? currentlyPlaying.artist["#text"] + currentlyPlaying.name
            : null;
          const newTrackId = track.artist["#text"] + track.name;

          if (currentTrackId !== newTrackId) {
            setCurrentlyPlaying(track);

            // 7. Extraímos a URL da imagem do novo formato de dados
            const imageUrl = track.image.find(
              (img: { size: string }) => img.size === "extralarge"
            )?.["#text"];
            if (imageUrl) {
              try {
                const palette = await extractColorPalette(imageUrl);
                setAlbumPalette(palette);
              } catch (e) {
                console.error("Erro ao extrair paleta de cores:", e);
                setAlbumPalette(null);
              }
            }
          }
        } else {
          // Se nenhuma música estiver tocando, limpa os estados
          setCurrentlyPlaying(null);
          setAlbumPalette(null);
        }
      } catch (err) {
        console.error("Erro ao buscar música atual:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentlyPlaying();
    const intervalId = setInterval(fetchCurrentlyPlaying, 3000); // Aumentei um pouco o intervalo
    return () => clearInterval(intervalId);
  }, [navigate, currentlyPlaying]);

  // O resto do seu componente (lógica de temas, menu e JSX) permanece praticamente o mesmo!
  // Apenas precisamos ajustar como os dados são exibidos no JSX.

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
      />
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
              Carregando
            </Text>
            <Text
              $fontFamily={"Instrument Serif"}
              $fontStyle={"italic"}
              $fontSize={"1.2rem"}
              $fontWeight={"400"}
            >
              Buscando sua frequência...
            </Text>
          </Box>
        ) : currentlyPlaying ? (
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
              $color={textColor}
            >
              {currentlyPlaying.name}
            </Text>
            {/* 8. Ajustamos a exibição do nome do artista */}
            <Text
              $fontFamily={"Instrument Serif"}
              $fontStyle={"italic"}
              $fontSize={"1.2rem"}
              $fontWeight={"400"}
              $color={textColor}
            >
              {currentlyPlaying.artist["#text"]}
            </Text>
          </Box>
        ) : (
          <Text
            $fontFamily={"Instrument Serif"}
            $fontStyle={"italic"}
            $fontSize={"1.3rem"}
            $fontWeight={"400"}
          >
            Nenhuma música está sendo "scrobblada" no momento.
          </Text>
        )}
      </Box>
    </AuraBG>
  );
};

export default Dashboard;
