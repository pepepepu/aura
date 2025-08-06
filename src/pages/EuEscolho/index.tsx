import React, { useContext, useEffect, useState } from "react";
import { AuraHeader, AuraMood, Box, Dropdown, Text } from "../../components";
import { UserContext } from "../../context/userContext";
import {
  getCoverArtFromSpotify,
  getNowPlaying,
  type AuraTrack,
} from "../../services/lastFMServices";
import {
  extractAuraMoodColors,
  type AuraMoodColors,
} from "../../utils/auraMoodExtractor";
import {
  getHumorFromColor,
  type HumorResult,
} from "../../utils/getHumorFromColor";

interface CurrentTrackInfo {
  name: string;
  artist: string;
  colors: AuraMoodColors | null;
  humor: HumorResult | null;
}

const IChoose: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrackInfo | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    let isFetching = false;
    let currentSongName: string | null = null;

    const fetchCurrentSong = async () => {
      if (isFetching) return;

      isFetching = true;

      try {
        const track: AuraTrack | null = await getNowPlaying();
        if (track && track.name !== currentSongName) {
          currentSongName = track.name;

          const imageUrl = await getCoverArtFromSpotify(
            track.name,
            track.artists[0].name
          );
          const colors = await extractAuraMoodColors(imageUrl);
          const humor = colors ? getHumorFromColor(colors.predominant) : null;

          setCurrentTrack({
            name: track.name,
            artist: track.artists[0].name,
            colors: colors,
            humor: humor,
          });
        } else if (!track) {
          currentSongName = null;
          setCurrentTrack(null);
        }
      } catch (error) {
        console.error("Erro no fluxo de IChoose:", error);
        setCurrentTrack(null);
      } finally {
        isFetching = false;
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };

    fetchCurrentSong();
    const intervalId = setInterval(fetchCurrentSong, 3500);

    return () => clearInterval(intervalId);
  }, [isLoading]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box
      $width="100dvw"
      $height="100dvh"
      $background="#EAEAEA"
      $color="#020202"
      $flexDirection="column"
      $gap="30px"
    >
      <Dropdown
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="I Choose"
      />
      <AuraHeader
        title="I Choose"
        textColor={"#020202"}
        onMenuClick={toggleMenu}
        profileImageUrl={userInfo?.imageUrl}
      />
      <Box
        $width="100%"
        $height="100%"
        $justifyContent="center"
        $alignItems="center"
        $flexDirection="column"
        $padding={"70px 40px"}
      >
        {isLoading ? (
          <Text $color="#555555" $fontFamily={"Instrument Serif"}>
            Sintonizando...
          </Text>
        ) : currentTrack ? (
          <Box $width={"100%"} $gap={"15px"}>
            <AuraMood colors={currentTrack.colors} />
            <Box $flexDirection="column" $alignItems="center">
              <Box $width={"100%"} $flexDirection={"row"}>
                <Text
                  $color="#020202"
                  $fontSize="1.2rem"
                  $fontStyle={"italic"}
                  $textAlign="center"
                  $fontFamily={"Instrument Serif"}
                >
                  hoje
                </Text>
                <Text
                  $color="#020202"
                  $fontSize="1.2rem"
                  $textAlign="center"
                  $fontWeight={"bold"}
                  $fontFamily={"Instrument Serif"}
                >
                  , eu escolho
                </Text>
              </Box>
              {currentTrack.humor && (
                <Text
                  $fontFamily={"Instrument Serif"}
                  $fontSize="1.5rem"
                  $color="#020202"
                  $fontStyle={"italic"}
                >
                  {currentTrack.humor.mood}
                </Text>
              )}
            </Box>
          </Box>
        ) : (
          <Text
            $color="#555555"
            $fontSize="1.2rem"
            $textAlign="center"
            $fontFamily={"Instrument Serif"}
          >
            Nenhuma música tocando. <br /> Dê play e sinta a energia!
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default IChoose;
