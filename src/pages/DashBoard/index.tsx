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
