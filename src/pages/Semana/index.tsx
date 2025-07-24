import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuraBG, AuraHeader, Box, Dropdown, Text } from "../../components";
import { checkMainColor } from "../../utils/checkMainColor";
import { extractVibrantColor } from "../../utils/extractVibrantColors";
import {
  getAngelNumberFromColor,
  type AngelNumberResult,
} from "../../utils/angelNumberGenerator";

interface Artist {
  name: string;
}

interface AlbumImage {
  url: string;
  height: number;
  width: number;
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: {
    images: AlbumImage[];
  };
}

const AuraSemanal: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vibrantColors, setVibrantColors] = useState<string[]>([]);
  const [angelInfo, setAngelInfo] = useState<AngelNumberResult | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchAndProcessTracks = async () => {
      setIsLoading(true);
      const token = window.localStorage.getItem("spotify_token");
      if (!token) {
        navigate("/");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const topTracksEndpoint =
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=9";

      try {
        const response = await fetch(topTracksEndpoint, { headers });

        if (response.status === 401) {
          window.localStorage.removeItem("spotify_token");
          navigate("/");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            const colorPromises = data.items.map((track: Track) => {
              const imageUrl = track.album.images[0]?.url;
              if (!imageUrl) return Promise.resolve(null);
              return extractVibrantColor(imageUrl);
            });

            const resolvedColors = await Promise.all(colorPromises);
            const validColors = resolvedColors.filter(
              (color): color is string => color !== null
            );
            setVibrantColors(validColors);

            if (validColors.length > 0) {
              const corPai = checkMainColor(validColors);
              const angelData = getAngelNumberFromColor(corPai);
              setAngelInfo(angelData);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao buscar ou processar as músicas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessTracks();
  }, [navigate]);

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
        $width="100%"
        $height="70%"
        $justifyContent="center"
        $alignItems="center"
        $padding="110px 30px 0px 30px"
      ></Box>

      <Box
        $width="100%"
        $justifyContent="center"
        $alignItems="center"
        $flexDirection="column"
      >
        {isLoading ? (
          <Text color="#EFEFEF">Carregando aura</Text>
        ) : angelInfo ? (
          <>
            <Text
              fontFamily={"Instrument Serif"}
              fontSize={"4rem"}
              color={"#EFEFEF"}
            >
              {angelInfo.angelNumber}
            </Text>
            <Text
              fontFamily={"Instrument Serif"}
              fontStyle={"italic"}
              fontSize={"1.2rem"}
              color={"#EFEFEF"}
            >
              {angelInfo.words}
            </Text>
          </>
        ) : null}
      </Box>
    </AuraBG>
  );
};

export default AuraSemanal;
