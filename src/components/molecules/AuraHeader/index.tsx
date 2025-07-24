import React from "react";
import { Box, Button, Text } from "../../atoms"; // Seus componentes de UI

/**
 * Define as propriedades que o componente AuraHeader aceita.
 * @param {string} title - O título a ser exibido no centro do cabeçalho.
 * @param {string} textColor - A cor do texto do título.
 * @param {() => void} onMenuClick - A função a ser chamada quando o botão de menu for clicado.
 */
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
  return (
    <Box
      // --- ALTERAÇÕES ADICIONADAS ---
      $position="absolute" // Posiciona o header de forma absoluta em relação ao container pai.
      $top="50px" // Define a distância de 30px do topo.
      $zIndex={2} // Garante que o header fique sobre outros elementos.
      // Lógica para garantir que o header permaneça centralizado horizontalmente
      $left="50%"
      $transform="translateX(-50%)"
      // --- PROPRIEDADES ORIGINAIS MANTIDAS ---
      $width={"85dvw"}
      $justifyContent={"space-between"}
      $flexDirection="row"
      $alignItems={"center"}
    >
      {/* Botão para abrir o menu dropdown */}
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

      {/* Título da tela */}
      <Text
        fontFamily={"Instrument Serif"}
        fontSize={"1.2rem"}
        fontWeight={"400"}
        color={textColor}
      >
        {title}
      </Text>

      {/* Espaçador para manter o título centralizado */}
      <Box
        $width={"30px"}
        $height={"30px"}
        $borderRadius={"100px"}
        $background={"#ffffff4a"}
      />
    </Box>
  );
};

export default AuraHeader;
