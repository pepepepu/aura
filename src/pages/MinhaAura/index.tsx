import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuraBG, AuraHeader, Box, Dropdown, Text } from "../../components";
import { themes } from "../../styles/themes";
import {
  extractColorPalette,
  type ColorPaletteResult,
} from "../../utils/extractColorPalette";
import { gerarPoesiaDasCores } from "../../utils/poeticColors";
import {
  getTopTrackForPeriod,
  getCoverArtFromSpotify,
  type AuraTrack,
} from "../../services/lastFMServices";

const MinhaAura: React.FC = () => {
  const [topTrack, setTopTrack] = useState<AuraTrack | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [albumPalette, setAlbumPalette] = useState<ColorPaletteResult | null>(
    null
  );
  const [poeticWords, setPoeticWords] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("lastfm_session_key");
    window.localStorage.removeItem("lastfm_username");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const fetchTopTrack = async () => {
      setIsLoading(true);
      try {
        const track = await getTopTrackForPeriod("7day");

        if (track) {
          setTopTrack(track);
          const imageUrl = await getCoverArtFromSpotify(
            track.name,
            track.artists[0].name
          );

          if (imageUrl) {
            const palette = await extractColorPalette(imageUrl);
            setAlbumPalette(palette);

            if (
              palette &&
              palette.auraColors &&
              palette.auraColors.length >= 5
            ) {
              const colorsForPoetry = palette.auraColors.slice(0, 5);
              const words = gerarPoesiaDasCores(colorsForPoetry);
              setPoeticWords(words);
            }
          }
        } else {
          setTopTrack(null);
        }
      } catch (err) {
        console.error("Erro ao buscar top track em MinhaAura:", err);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTrack();
  }, []);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);
  const currentTheme = themes[currentThemeIndex];

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
      <AuraHeader
        title="Minha aura"
        textColor={textColor}
        onMenuClick={toggleMenu}
      />

      <Dropdown
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="Minha aura"
      />

      <Box
        $width={"85%"}
        $height={"100%"}
        $flexDirection={"column"}
        $justifyContent={"center"}
        $alignItems={"center"}
        $padding={"20px"}
      >
        {isLoading ? (
          <Box>
            <Text $color={textColor} $fontFamily={"Instrument Serif"}>
              Analisando sua aura...
            </Text>
          </Box>
        ) : topTrack ? (
          <Box
            $width={"100%"}
            $alignItems={"center"}
            $flexDirection="column"
            $gap="5px"
          >
            <Text
              $fontFamily={"Instrument Serif"}
              $fontSize={"3.5rem"}
              $fontWeight={"400"}
              $lineHeight="1.1"
              $color={textColor}
            >
              {poeticWords ? poeticWords[0].toUpperCase() : "Misterioso"}
            </Text>
            <Text
              $fontFamily={"Instrument Serif"}
              $fontStyle={"italic"}
              $fontSize={"1.1rem"}
              $fontWeight={"400"}
              $color={textColor}
              $textAlign={"center"}
            >
              {poeticWords ? poeticWords.slice(1, 5).join(" • ") : "Misterioso"}
            </Text>
            {poeticWords && (
              <Text
                $fontFamily={"Instrument Serif"}
                $fontSize={"1rem"}
                $fontWeight={"400"}
                $color={textColor}
                style={{ opacity: 0.8, marginTop: "10px" }}
                $textAlign={"center"}
              >
                {topTrack.name} -{" "}
                {topTrack.artists.map((a) => a.name).join(", ")}
              </Text>
            )}
          </Box>
        ) : (
          <Text
            $fontFamily={"Instrument Serif"}
            $fontSize={"1.3rem"}
            $fontWeight={"400"}
            $color={textColor}
            $textAlign="center"
          >
            Não encontramos dados suficientes para definir sua aura. Ouça mais
            músicas!
          </Text>
        )}
      </Box>
    </AuraBG>
  );
};

export default MinhaAura;
