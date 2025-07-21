import styled from "styled-components";

export type Size = string | number;

interface ImageProps {
  maxWidth?: Size;
  width?: Size;
  height?: Size;
  margin?: string;
  borderRadius?: string;
  boxShadow?: string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  display?: string;
  position?: string;
  zIndex?: number;
  border?: string;
}

const formatSize = (value?: Size) => {
  if (typeof value === "number") return `${value}px`;
  return value || "auto";
};

const Image = styled.img<ImageProps>`
  max-width: ${({ maxWidth }) => formatSize(maxWidth)};
  width: ${({ width }) => formatSize(width)};
  height: ${({ height }) => formatSize(height)};
  margin: ${({ margin }) => margin || "0"};
  border-radius: ${({ borderRadius }) => borderRadius || "0"};
  box-shadow: ${({ boxShadow }) => boxShadow || "none"};
  object-fit: ${({ objectFit }) => objectFit || "cover"};
  display: ${({ display }) => display || "block"};
  position: ${({ position }) => position || "static"};
  z-index: ${({ zIndex }) => zIndex || 0};
  border: ${({ border }) => border || "none"};
`;

export default Image;
