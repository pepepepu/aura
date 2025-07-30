import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuraBG, AuraHeader, Box, Dropdown, Text } from "../../components";
import { themes } from "../../styles/themes";
import {
  extractColorPalette,
  type ColorPaletteResult,
} from "../../utils/extractColorPalette";

interface Artist {
  name: string;
  id: string;
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: {
    images: { url: string }[];
  };
}

const Dashboard: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [albumPalette, setAlbumPalette] = useState<ColorPaletteResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("spotify_token");
    navigate("/");
  };

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      const token = window.localStorage.getItem("spotify_token");
      if (!token) {
        setIsLoading(false);
        navigate("/");
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
      const spotifyApiBase = "https://api.spotify.com/v1/me";
      try {
        const response = await fetch(
          `${spotifyApiBase}/player/currently-playing`,
          { headers }
        );

        if (response.status === 401) {
          handleLogout();
          return;
        }

        if (response.status === 200) {
          const data = await response.json();
          if (currentlyPlaying?.id !== data.item?.id) {
            setCurrentlyPlaying(data.item);

            if (data.item?.album?.images?.[0]?.url) {
              const imageUrl = data.item.album.images[0].url;
              try {
                const palette = await extractColorPalette(imageUrl);
                setAlbumPalette(palette);
              } catch (e) {
                console.error("Erro ao extrair paleta de cores:", e);
                setAlbumPalette(null);
              }
            }
          }
        } else if (response.status === 204) {
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
    const intervalId = setInterval(fetchCurrentlyPlaying, 2000);
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
              {"Carregando"}
            </Text>
            <Text
              $fontFamily={"Instrument Serif"}
              $fontStyle={"italic"}
              $fontSize={"1.2rem"}
              $fontWeight={"400"}
            >
              {"Carregando"}
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
              {isLoading ? "Carregando" : currentlyPlaying.name}
            </Text>
            <Text
              $fontFamily={"Instrument Serif"}
              $fontStyle={"italic"}
              $fontSize={"1.2rem"}
              $fontWeight={"400"}
              $color={textColor}
            >
              {isLoading
                ? "Carregando"
                : currentlyPlaying.artists.map((a) => a.name).join(", ")}
            </Text>
          </Box>
        ) : (
          <Text
            $fontFamily={"Instrument Serif"}
            $fontStyle={"italic"}
            $fontSize={"1.3rem"}
            $fontWeight={"400"}
          >
            Nenhuma música está tocando no momento.
          </Text>
        )}
      </Box>
    </AuraBG>
  );
};

export default Dashboard;
