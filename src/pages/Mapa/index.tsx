import React, { useContext, useEffect, useState } from "react";
import {
  AuraBG,
  AuraCordinates,
  AuraHeader,
  Box,
  Dropdown,
  Text,
} from "../../components";
import { UserContext } from "../../context/userContext";
import {
  getCoverArtFromSpotify,
  getTopTrackForPeriod,
  getTrackTopGenres,
} from "../../services/lastFMServices";
import { themes } from "../../styles/themes";
import {
  generateMapColorPalette,
  type MapColorPaletteResult,
} from "../../utils/generateMapColorPalette";
import {
  genreClassifier,
  getEnergyState,
  type AuraData,
} from "../../utils/mapUtils";

const MapaDaAlma: React.FC = () => {
  const { userInfo } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [albumPalette, setAlbumPalette] =
    useState<MapColorPaletteResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [auraData, setAuraData] = useState<AuraData | null>(null);
  const [poeticWords, setPoeticWords] = useState<string[]>([]);
  const [topTrackName, setTopTrackName] = useState<string>("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchAuraData = async () => {
      setIsLoading(true);
      try {
        const track = await getTopTrackForPeriod("7day");
        if (!track) throw new Error("Nenhuma música encontrada.");

        setTopTrackName(`${track.name} por ${track.artists[0].name}`);

        const genres = await getTrackTopGenres(
          track.name,
          track.artists[0].name
        );

        const classifiedAura = genreClassifier(genres);
        setAuraData(classifiedAura);

        const words = getEnergyState(classifiedAura.energy);
        setPoeticWords(words);

        const imageUrl = await getCoverArtFromSpotify(
          track.name,
          track.artists[0].name
        );
        if (imageUrl) {
          const paletteResult = await generateMapColorPalette(imageUrl);
          setAlbumPalette(paletteResult);
        }
      } catch (err) {
        console.error("Erro ao buscar dados para o Mapa da Alma:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuraData();
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
    ? albumPalette.palette[albumPalette.palette.length - 1]
    : currentTheme.backgroundColor;
  const textColor = albumPalette ? albumPalette.textColor : "#000";
  const auraBgColors = albumPalette
    ? albumPalette.palette
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
        title="Constelação"
        textColor={textColor}
        onMenuClick={toggleMenu}
        profileImageUrl={userInfo?.imageUrl}
      />

      <Dropdown
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="Constelação"
      />

      <Box
        $width={"85%"}
        $height={"100%"}
        $justifyContent={"center"}
        $alignItems={"center"}
        $padding={"10vh 20px 20px 20px"}
        $gap={"20px"}
      >
        {isLoading ? (
          <Text $color={textColor} $fontFamily={"Instrument Serif"}>
            Observando as estrelas da sua alma...
          </Text>
        ) : auraData ? (
          <>
            <Box
              $width={{ base: "70dvw", lg: "40dvh", md: "60dvw" }}
              $height={{ base: "90dvw", lg: "50dvh", md: "70dvw" }}
              $borderColor={textColor}
              $border="1px solid"
              $alignItems={"flex-start"}
              $padding={"20px"}
            >
              <Text
                $color={textColor}
                $fontFamily={"Instrument Serif"}
                $fontStyle={"italic"}
              >
                Fig. 1
              </Text>
              <AuraCordinates
                estiloMusical={auraData.genreName}
                corBase="transparent"
                corTraco={textColor}
                corGlow="transparent"
                fatorX={auraData.x}
                fatorY={auraData.y}
              />
            </Box>
            <Box
              $width={{ base: "90%", lg: "30%", md: "60%" }}
              $gap={"10px"}
              $alignItems={{ base: "flex-end", lg: "center", md: "center" }}
            >
              <Box $width={"100%"} $alignItems={"flex-start"}>
                <Text
                  as="span"
                  $color={textColor}
                  $fontFamily={"Instrument Serif"}
                  $fontSize={"2.2rem"}
                >
                  {`1. ${poeticWords[0]}`}
                </Text>{" "}
                <Text
                  as="span"
                  $color={textColor}
                  $fontFamily={"Instrument Serif"}
                  $fontSize={"1rem"}
                  $textAlign={"justify"}
                >
                  {poeticWords
                    .slice(1)
                    .map((word, index) => `${index + 2}. ${word}`)
                    .join(" ")}
                </Text>
              </Box>
              <Text
                $color={textColor}
                $fontFamily={"Instrument Serif"}
                $fontSize={".9rem"}
                $fontStyle={"italic"}
                $textAlign={"right"}
              >
                Baseado em: {topTrackName}, de {userInfo?.name}
              </Text>
            </Box>
          </>
        ) : (
          <Text $color={textColor} $fontFamily={"Instrument Serif"}>
            Não foi possível ver as estrelas sua alma. Tente ouvir mais músicas
            para expandir o cosmos.
          </Text>
        )}
      </Box>
    </AuraBG>
  );
};

export default MapaDaAlma;
