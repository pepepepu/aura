import React, { useState, useEffect } from "react";
import { Box, Button, Text } from "../../atoms";
import { getUserProfile } from "../../../services/getUserProfile";

interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

interface SpotifyUser {
  display_name: string;
  images: SpotifyImage[];
}
interface AuraHeaderProps {
  title: string;
  textColor: string;
  onMenuClick: () => void;
}

const AuraHeader: React.FC<AuraHeaderProps> = ({
  title,
  textColor,
  onMenuClick,
}) => {
  const [user, setUser] = useState<SpotifyUser | null>(null);

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("spotify_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserProfile(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Erro ao buscar perfil no Header:", error);
        });
    }
  }, [token]);

  return (
    <Box
      $position="absolute"
      $top="50px"
      $zIndex={2}
      $left="50%"
      $transform="translateX(-50%)"
      $width={"85dvw"}
      $justifyContent={"space-between"}
      $flexDirection="row"
      $alignItems={"center"}
    >
      <Button onClick={onMenuClick} $background="transparent" $border="none">
        <Box
          $width={"30px"}
          $height={"30px"}
          $background={
            "radial-gradient(circle, #ff0000ae 0%, #ffff00ae 30%, #0077ffae 70%)"
          }
          $borderRadius={"100px"}
        />
      </Button>

      <Text
        $fontFamily={"Instrument Serif"}
        $fontSize={"1.2rem"}
        $fontWeight={"400"}
        $color={textColor}
      >
        {title}
      </Text>


      <Box $width={"30px"} $height={"30px"} $borderRadius={"100px"}>
        {user?.images?.[0]?.url ? (
          <img
            src={user.images[0].url}
            alt="Foto de perfil do usuário"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            $width={"100%"}
            $height={"100%"}
            $borderRadius={"50%"}
            $background={"#ffffff4a"}
          />
        )}
      </Box>
    </Box>
  );
};

export default AuraHeader;