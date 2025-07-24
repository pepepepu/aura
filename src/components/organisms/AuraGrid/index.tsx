import React from "react";
import { Box, AuraBlobs } from "../..";

interface AuraGradeProps {
  colorSets: string[][];
}

const AuraGrade: React.FC<AuraGradeProps> = ({ colorSets }) => {
  const displayItems = [...colorSets];
  while (displayItems.length < 9) {
    displayItems.push(["#1c1c1c", "#555555", "#000000"]);
  }

  return (
    <Box
      $display="grid"
      $gridTemplateColumns="repeat(3, 1fr)"
      $width="100%"
      $aspectRatio="1 / 2"
    >
      {displayItems.slice(0, 9).map((colors, index) => (
        <Box key={index} $width="100%" $height="100%" $overflow="hidden">
          {colors.length >= 3 && (
            <AuraBlobs
              backgroundColor={colors[0]} // Cor predominante
              color1={colors[1]} // Cor mais clara
              color2={colors[2]} // Cor mais escura
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default AuraGrade;
