import styled, { css, keyframes } from "styled-components";

// --- TIPOS --- (Sem alterações)

type Size = string | number;
type GradientType = "linear" | "radial";

type GradientBackground = {
  type?: GradientType;
  direction?: string;
  colors: string[];
};

interface BoxProps {
  $width?: Size;
  $height?: Size;
  $minWidth?: Size;
  $minHeight?: Size;
  $padding?: string;
  $margin?: string;
  $background?: string | "transparent";
  $borderRadius?: string;
  $display?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $flexDirection?: string;
  $gap?: string;
  $color?: string;
  $border?: string;
  $borderColor?: string;
  $boxShadow?: string;
  $position?: string;
  $zIndex?: number;
  $boxWithHover?: boolean;
  $hoverBackground?: string;
  $right?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $transform?: string;
  $cursor?: string;
  $userSelect?: string;
  $transition?: string;
  $hideScrollbar?: boolean;
  $overflow?: string;
  $overflowY?: string;
  $overflowX?: string; // Adicionada para consistência
  $flexWrap?: string;
  $opacity?: number | string;
  $gradientBackground?: GradientBackground;
  $animateGradient?: boolean;
}

// --- FUNÇÕES AUXILIARES --- (Sem alterações)

const formatSize = (value?: Size) => {
  if (typeof value === "number") return `${value}px`;
  return value || "auto";
};

const generateBoxGradient = (gradient?: GradientBackground) => {
  if (!gradient || !gradient.colors?.length) return undefined;
  const type = gradient.type || "linear";
  const direction =
    gradient.direction || (type === "radial" ? "circle at center" : "to right");
  const colors = gradient.colors.join(", ");
  return `${type}-gradient(${direction}, ${colors})`;
};

const animateGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// --- COMPONENTE ESTILIZADO ---

const Box = styled.div<BoxProps>`
  width: ${({ $width }) => formatSize($width)};
  height: ${({ $height }) => formatSize($height)};
  min-width: ${({ $minWidth }) => formatSize($minWidth)};
  min-height: ${({ $minHeight }) => formatSize($minHeight)};
  padding: ${({ $padding }) => $padding || "0"};
  margin: ${({ $margin }) => $margin || "0"};
  background: ${({ $gradientBackground, $background }) =>
    generateBoxGradient($gradientBackground) || $background || "transparent"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "0"};
  display: ${({ $display }) => $display || "flex"};
  justify-content: ${({ $justifyContent }) => $justifyContent || "center"};
  align-items: ${({ $alignItems }) => $alignItems || "center"};
  flex-direction: ${({ $flexDirection }) => $flexDirection || "column"};
  gap: ${({ $gap }) => $gap || "0px"};
  color: ${({ $color }) => $color || "inherit"};
  border: ${({ $border }) => $border || "none"};
  border-color: ${({ $borderColor }) => $borderColor || "none"};
  box-shadow: ${({ $boxShadow }) => $boxShadow || "none"};
  position: ${({ $position }) => $position || "relative"};
  right: ${({ $right }) => $right || "auto"};
  top: ${({ $top }) => $top || "auto"};
  bottom: ${({ $bottom }) => $bottom || "auto"};
  left: ${({ $left }) => $left || "auto"};
  transform: ${({ $transform }) => $transform || "none"};
  cursor: ${({ $cursor }) => $cursor || "default"};
  user-select: ${({ $userSelect }) => $userSelect || "auto"};
  transition: ${({ $transition }) => $transition || "background 0.9s ease"};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || "nowrap"};
  opacity: ${({ $opacity }) => ($opacity !== undefined ? $opacity : 1)};
  z-index: ${({ $zIndex }) => $zIndex || "auto"};

  /* CORREÇÃO PRINCIPAL: Removidas as aspas de "border-box".
    Esta é a causa do problema de layout no Safari.
  */
  box-sizing: border-box;

  /*
    CORREÇÃO DA LÓGICA DE OVERFLOW: Agora o overflow geral só é aplicado
    se as propriedades específicas (overflowX, overflowY) não forem usadas.
  */
  ${({ $overflow, $overflowX, $overflowY }) =>
    $overflow
      ? `overflow: ${$overflow};`
      : css`
          overflow-x: ${$overflowX || "hidden"};
          overflow-y: ${$overflowY || "hidden"};
        `}

  /* Lógica de Hover */
  ${({ $boxWithHover, $hoverBackground }) =>
    $boxWithHover &&
    css`
      &:hover {
        background: ${$hoverBackground || "rgba(0, 0, 0, 0.0)"};
      }
    `}

  /* Lógica de Animação do Gradiente */
  ${({ $gradientBackground, $animateGradient }) =>
    $gradientBackground &&
    $animateGradient &&
    css`
      background-size: 200% 200%;
      animation: ${animateGradient} 8s ease infinite;
    `}

  /* Lógica da Barra de Rolagem */
  ${({ $hideScrollbar }) =>
    $hideScrollbar
      ? css`
          scrollbar-width: none;
          -ms-overflow-style: none;
          &::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
          /* Scrollbar personalizada */
          &::-webkit-scrollbar {
            width: 8px;
          }
          &::-webkit-scrollbar-track {
            background: transparent;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #bfbfbf;
            border-radius: 9999px;
            border: 2px solid transparent;
            background-clip: content-box;
          }
          /* Firefox */
          scrollbar-width: thin;
          scrollbar-color: #bfbfbf transparent;
        `}
`;

export default Box;
