import React, { useEffect, useState } from "react";
import { AuraBG, Box, Button, Text, Dropdown } from "../../components";
import { useNavigate } from "react-router-dom";
import { themes } from "../../styles/themes";

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
          console.error(
            "Token do Spotify expirado. Redirecionando para login."
          );
          handleLogout();
          return;
        }

        if (response.status === 200) {
          const data = await response.json();
          setCurrentlyPlaying((prevTrack) =>
            prevTrack?.id !== data.item?.id ? data.item : prevTrack
          );
        } else if (response.status === 204) {
          setCurrentlyPlaying(null);
        }
      } catch (err) {
        console.error("Erro ao buscar música atual:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentlyPlaying();
    const intervalId = setInterval(fetchCurrentlyPlaying, 10000);
    return () => clearInterval(intervalId);
  }, [navigate]);

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

  const menuOptions = [
    { label: "Minha Aura", onClick: () => navigate("/dashboard") },
    { label: "Energia da Semana", onClick: () => navigate("/dashboard") },
    {
      label: "Synesthesic",
      onClick: () => navigate("/dashboard"),
      disabled: true,
    },
    { label: "Sair", onClick: handleLogout },
  ];

  return (
    <AuraBG
      width={"100dvw"}
      height={"100dvh"}
      colors={currentTheme.colors}
      backgroundColor={currentTheme.backgroundColor}
      interactive={true}
      grainy={true}
    >
      <Box
        $width={"100dvw"}
        $height={"100dvh"}
        $padding={"70px 40px 70px 40px"}
        $flexDirection={"column"}
        $gap={"8px"}
        $justifyContent={"space-between"}
      >
        <Box
          $width={"95%"}
          $justifyContent={"space-between"}
          $flexDirection="row"
          $alignItems={"center"}
        >
          {/* Aura button */}
          <Box
            $width={"30px"}
            $height={"30px"}
            $background={
              "radial-gradient(circle, #ff0000ae 0%, #ffff00ae 30%, #0077ffae 70%)"
            }
            $borderRadius={"100px"}
          >
            <Button $width={"100%"} $height={"100%"} onClick={toggleMenu} />
          </Box>
          <Text
            fontFamily={"Instrument Serif"}
            fontSize={"1.2rem"}
            fontWeight={"400"}
          >
            Tocando agora
          </Text>
          <Box
            $width={"30px"}
            $height={"30px"}
            $background={"#ffffff6e"}
            $borderRadius={"100px"}
          ></Box>
        </Box>
        {isLoading ? (
          <Box
            $width={"100%"}
            $alignItems={"flex-start"}
            $flexDirection="column"
            $gap="6px"
          >
            <Text
              fontFamily={"Instrument Serif"}
              fontSize={"3.5rem"}
              fontWeight={"400"}
              lineHeight="auto"
            >
              {"Carregando"}
            </Text>
            <Text
              fontFamily={"Instrument Serif"}
              fontStyle={"italic"}
              fontSize={"1.2rem"}
              fontWeight={"400"}
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
              fontFamily={"Instrument Serif"}
              fontSize={"3.5rem"}
              fontWeight={"400"}
              lineHeight="auto"
            >
              {isLoading ? "Carregando" : currentlyPlaying.name}
            </Text>
            <Text
              fontFamily={"Instrument Serif"}
              fontStyle={"italic"}
              fontSize={"1.2rem"}
              fontWeight={"400"}
            >
              {isLoading
                ? "Carregando"
                : currentlyPlaying.artists.map((a) => a.name).join(", ")}
            </Text>
          </Box>
        ) : (
          <Text
            fontFamily={"Instrument Serif"}
            fontStyle={"italic"}
            fontSize={"1.3rem"}
            fontWeight={"400"}
          >
            Nenhuma música está tocando no momento.
          </Text>
        )}
      </Box>
      <Dropdown
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        menuOptions={menuOptions}
      />
    </AuraBG>
  );
};

export default Dashboard;
