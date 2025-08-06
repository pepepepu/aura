import React from "react";
import { Box, Button, Text } from "../../atoms";

interface AuraHeaderProps {
  title: string;
  textColor: string;
  onMenuClick: () => void;
  profileImageUrl?: string | null;
}

const AuraHeader: React.FC<AuraHeaderProps> = ({
  title,
  textColor,
  onMenuClick,
  profileImageUrl,
}) => {
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

      <Box $width={"30px"} $height={"30px"} $borderRadius={"50%"}>
        {profileImageUrl && profileImageUrl.length > 0 ? (
          <img
            src={profileImageUrl}
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
