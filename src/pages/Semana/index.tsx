import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuraBG, AuraHeader, Box, Dropdown, Text } from "../../components";
import { checkMainColor } from "../../utils/checkMainColor";
import {
  getAngelNumberFromColor,
  type AngelNumberResult,
} from "../../utils/angelNumberGenerator";
import {
  getTopTracksWeekly,
  getCoverArtFromSpotify,
  type AuraTrack,
} from "../../services/lastFMServices";
import { extractVibrantColor } from "../../utils/colorExtractor";

const AuraSemanal: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vibrantColors, setVibrantColors] = useState<string[]>([]);
  const [angelInfo, setAngelInfo] = useState<AngelNumberResult | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("lastfm_session_key");
    window.localStorage.removeItem("lastfm_username");
    navigate("/");
  };

  useEffect(() => {
    const fetchAndProcessTracks = async () => {
      setIsLoading(true);
      try {
        const topTracks = await getTopTracksWeekly();

        if (topTracks && topTracks.length > 0) {
          const colorPromises = topTracks.map(async (track: AuraTrack) => {
            const imageUrl = await getCoverArtFromSpotify(
              track.name,
              track.artists[0].name
            );
            return extractVibrantColor(imageUrl);
          });

          const resolvedColors = await Promise.all(colorPromises);
          const validColors = resolvedColors.filter(
            (c): c is string => c !== null
          );
          setVibrantColors(validColors);

          if (validColors.length > 0) {
            const corPai = checkMainColor(validColors);
            const angelData = getAngelNumberFromColor(corPai);
            setAngelInfo(angelData);
          }
        }
      } catch (error) {
        console.error("Erro no fluxo final do Aura Semanal:", error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessTracks();
  }, []);

  return (
    <AuraBG
      width={"100dvw"}
      height={"100dvh"}
      colors={
        vibrantColors.length > 1
          ? vibrantColors.slice(1)
          : ["#DFB065", "#9097CF", "#EDAB74", "#D991AF", "#e0b5c7"]
      }
      backgroundColor={vibrantColors.length > 0 ? vibrantColors[0] : "#A7AEC8"}
    >
      <AuraHeader
        title="Sua semana foi"
        textColor={"#FFF"}
        onMenuClick={toggleMenu}
      />
      <Dropdown
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="Energia da semana"
      />
      <Box
        $width={"100%"}
        $height={"100%"}
        $justifyContent={"flex-end"}
        $alignItems={"center"}
        $padding={"50px 20px"}
        $flexDirection={"column"}
      >
        {isLoading ? (
          <Text
            $color={"#EFEFEF"}
            $fontFamily={"Instrument Serif"}
            $fontStyle={"italic"}
          >
            Calculando sua energia...
          </Text>
        ) : angelInfo ? (
          <>
            <Text
              $fontFamily={"Instrument Serif"}
              $fontSize={"4rem"}
              $color={"#EFEFEF"}
            >
              {angelInfo.angelNumber}
            </Text>
            <Text
              $fontFamily={"Instrument Serif"}
              $fontStyle={"italic"}
              $fontSize={"1.2rem"}
              $color={"#EFEFEF"}
              $textAlign={"center"}
            >
              {angelInfo.words}
            </Text>
          </>
        ) : (
          <Text
            $color={"#EFEFEF"}
            $textAlign={"center"}
            $fontFamily={"Instrument Serif"}
          >
            Não foi possível calcular sua energia. Ouça mais músicas!
          </Text>
        )}
      </Box>
    </AuraBG>
  );
};

export default AuraSemanal;
