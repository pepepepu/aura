import styled, { css, keyframes } from "styled-components";

type Size = string | number;

type GradientType = "linear" | "radial";

const breakpoints = { sm: "576px", md: "768px", lg: "992px", xl: "1200px" };

type ResponsiveProp<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

type GradientBackground = {
  type?: GradientType;
  direction?: string;
  colors: string[];
};

interface BoxProps {
  $width?: ResponsiveProp<Size>;
  $height?: ResponsiveProp<Size>;
  $minWidth?: ResponsiveProp<Size>;
  $minHeight?: ResponsiveProp<Size>;
  $maxWidth?: ResponsiveProp<Size>;
  $maxHeight?: ResponsiveProp<Size>;
  $padding?: ResponsiveProp<string>;
  $margin?: ResponsiveProp<string>;
  $display?: ResponsiveProp<string>;
  $flexDirection?: ResponsiveProp<
    string | "column" | "row" | "column-reverse" | "row-reverse"
  >;
  $justifyContent?: ResponsiveProp<
    | string
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-evenly"
    | "space-around"
  >;
  $alignItems?: ResponsiveProp<
    string | "flex-start" | "flex-end" | "center" | "stretch" | "start" | "end"
  >;
  $gap?: ResponsiveProp<string>;
  $flexWrap?: ResponsiveProp<string | "nowrap" | "wrap" | "wrap-reverse">;
  $background?: string | "transparent";
  $color?: string;
  $border?: string;
  $borderColor?: string;
  $borderRadius?: ResponsiveProp<string>;
  $boxShadow?: string;
  $position?: string | "static" | "relative" | "fixed" | "absolute" | "sticky";
  $zIndex?: number;
  $flex?: number;
  $right?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $transform?: string;
  $transition?: string;
  $cursor?: string;
  $userSelect?: string;
  $opacity?: number | string;
  $overflow?: string | "visible" | "hidden" | "scroll" | "auto";
  $overflowY?: string | "visible" | "hidden" | "scroll" | "auto";
  $overflowX?: string | "visible" | "hidden" | "scroll" | "auto";
  $hideScrollbar?: boolean;
  $boxWithHover?: boolean;
  $hoverBackground?: string;
  $gradientBackground?: GradientBackground;
  $animateGradient?: boolean;
  $backdropFilter?: string;
}
const formatSize = (value?: Size): string => {
  if (typeof value === "number") return `${value}px`;
  return value || "auto";
};
const handleResponsiveProp = (
  cssProperty: string,
  value: any,
  formatter: (v: any) => string = (v) => v
) => {
  if (value === undefined) return null;
  if (typeof value !== "object" || value === null)
    return css`
      ${String.raw`${cssProperty}: ${formatter(value)};`}
    `;
  return css`
    ${value.base !== undefined
      ? `${cssProperty}: ${formatter(value.base)};`
      : ""}
    ${value.sm !== undefined
      ? `@media (min-width: ${breakpoints.sm}) { ${cssProperty}: ${formatter(
          value.sm
        )}; }`
      : ""}
    ${value.md !== undefined
      ? `@media (min-width: ${breakpoints.md}) { ${cssProperty}: ${formatter(
          value.md
        )}; }`
      : ""}
    ${value.lg !== undefined
      ? `@media (min-width: ${breakpoints.lg}) { ${cssProperty}: ${formatter(
          value.lg
        )}; }`
      : ""}
    ${value.xl !== undefined
      ? `@media (min-width: ${breakpoints.xl}) { ${cssProperty}: ${formatter(
          value.xl
        )}; }`
      : ""}
  `;
};
const generateBoxGradient = (gradient?: GradientBackground) => {
  if (!gradient || !gradient.colors?.length) return undefined;
  const type = gradient.type || "linear";
  const direction =
    gradient.direction || (type === "radial" ? "circle at center" : "to right");
  const colors = gradient.colors.join(", ");
  return `${type}-gradient(${direction}, ${colors})`;
};
const animateGradientKeyframes = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Box = styled.div<BoxProps>`
  ${({ $width }) => handleResponsiveProp("width", $width, formatSize)}
  ${({ $height }) => handleResponsiveProp("height", $height, formatSize)}
  ${({ $minWidth }) => handleResponsiveProp("min-width", $minWidth, formatSize)}
  ${({ $minHeight }) =>
    handleResponsiveProp("min-height", $minHeight, formatSize)}
  ${({ $maxWidth }) => handleResponsiveProp("max-width", $maxWidth, formatSize)}
  ${({ $maxHeight }) =>
    handleResponsiveProp("max-height", $maxHeight, formatSize)}
  ${({ $padding }) => handleResponsiveProp("padding", $padding)}
  ${({ $margin }) => handleResponsiveProp("margin", $margin)}

  /* 2. Layout (Flexbox) - CORREÇÃO PRINCIPAL DE LAYOUT */
  ${({ $display = "flex" }) => handleResponsiveProp("display", $display)}
  ${({ $flexDirection = "column" }) =>
    handleResponsiveProp("flex-direction", $flexDirection)}
  ${({ $justifyContent = "center" }) =>
    handleResponsiveProp("justify-content", $justifyContent)}
  ${({ $alignItems = "center" }) =>
    handleResponsiveProp("align-items", $alignItems)}
  ${({ $gap = "0" }) => handleResponsiveProp("gap", $gap)}
  ${({ $flexWrap = "nowrap" }) => handleResponsiveProp("flex-wrap", $flexWrap)}
  
  /* 3. Estilos Visuais */
  -webkit-backdrop-filter: ${({ $backdropFilter }) =>
    $backdropFilter || "none"};
  backdrop-filter: ${({ $backdropFilter }) => $backdropFilter || "none"};
  background: ${({ $gradientBackground, $background }) =>
    generateBoxGradient($gradientBackground) || $background || "transparent"};
  color: ${({ $color }) => $color || "inherit"};
  border: ${({ $border }) => $border || "none"};
  border-color: ${({ $borderColor }) => $borderColor || "none"};
  box-shadow: ${({ $boxShadow }) => $boxShadow || "none"};
  ${({ $borderRadius }) => handleResponsiveProp("border-radius", $borderRadius)}
  opacity: ${({ $opacity }) => ($opacity !== undefined ? $opacity : 1)};

  /* 4. Posicionamento */
  position: ${({ $position }) => $position || "static"};
  right: ${({ $right }) => $right || "auto"};
  top: ${({ $top }) => $top || "auto"};
  bottom: ${({ $bottom }) => $bottom || "auto"};
  flex: ${({ $flex }) => $flex};
  left: ${({ $left }) => $left || "auto"};
  z-index: ${({ $zIndex }) => $zIndex || "auto"};
  box-sizing: border-box;

  /* 5. Comportamento e Interação */
  transform: ${({ $transform }) => $transform || "none"};
  cursor: ${({ $cursor }) => $cursor || "default"};
  user-select: ${({ $userSelect }) => $userSelect || "auto"};
  transition: ${({ $transition }) => $transition || "background 0.9s ease"};
  will-change: transform;

  ${({ $overflow }) => $overflow && handleResponsiveProp("overflow", $overflow)}
  ${({ $overflowY }) =>
    $overflowY && handleResponsiveProp("overflow-y", $overflowY)}
  ${({ $overflowX }) =>
    $overflowX && handleResponsiveProp("overflow-x", $overflowX)}
  
  /* Efeitos e Animações */
  ${({ $boxWithHover, $hoverBackground }) =>
    $boxWithHover &&
    css`
      &:hover {
        background: ${$hoverBackground || "rgba(0, 0, 0, 0.0)"};
      }
    `}

  ${({ $gradientBackground, $animateGradient }) =>
    $gradientBackground &&
    $animateGradient &&
    css`
      background-size: 200% 200%;
      animation: ${animateGradientKeyframes} 8s ease infinite;
    `}

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
          &::-webkit-scrollbar {
            width: 8px;
          }
          &::-webkit-scrollbar-track {
            background: transparent;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #ffffff44;
            border-radius: 9999px;
            border: 2px solid transparent;
            background-clip: content-box;
          }
          scrollbar-width: thin;
          scrollbar-color: #ffffff44 transparent;
        `}
`;

export default Box;
