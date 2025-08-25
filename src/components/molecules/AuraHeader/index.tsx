import React from "react";
import { Box, Button, Text } from "../../atoms";
import { FaQuestionCircle } from "react-icons/fa";

interface AuraHeaderProps {
  title: string;
  textColor: string;
  onMenuClick: () => void;
  onHelpClick: () => void;
}

const AuraHeader: React.FC<AuraHeaderProps> = ({
  title,
  textColor,
  onMenuClick,
  onHelpClick,
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
      <Button
        onClick={onMenuClick}
        $background="transparent"
        $border="none"
        aria-label="Menu Principal"
        $cursor="pointer"
        $width={"30px"} $height={"30px"}
        $padding={"0px"}
      >
        <Box
          $width={"100%"} $height={"100%"}
          $background={
            "radial-gradient(circle, #ff0000ae 0%, #ffff00ae 30%, #0077ffae 70%)"
          }
          $borderRadius={"100px"}
          $margin={"0px"}
          $cursor="pointer"
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

      <Button
        $width={"30px"} $height={"30px"}
        onClick={onHelpClick}
        $background="transparent"
        $border="none"
        aria-label="Ajuda"
        $cursor="pointer"
        $padding={"0px"}
      >
        <Box $width={"100%"} $height={"100%"}>
          <FaQuestionCircle size={20} color={textColor} />
        </Box>
      </Button>
    </Box>
  );
};

export default AuraHeader;
