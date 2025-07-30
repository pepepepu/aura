import styled from "styled-components";
// Importe os helpers e tipos do arquivo central
import {
  handleResponsiveProp,
  formatSize,
  type Size,
  type ResponsiveProp
} from "../../../utils/styledHelpers"; // Ajuste o caminho se necessário

// Defina a interface de props aqui ou no seu arquivo de tipos
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  $maxWidth?: ResponsiveProp<Size>;
  $width?: ResponsiveProp<Size>;
  $height?: ResponsiveProp<Size>;
  $margin?: ResponsiveProp<string>;
  $borderRadius?: ResponsiveProp<string>;
  $boxShadow?: string;
  $objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  $display?: ResponsiveProp<string>;
  $position?: string;
  $zIndex?: number;
  $border?: string;
}

const Image = styled.img<ImageProps>`
  /* Aplicando a lógica responsiva */
  ${({ $maxWidth }) => handleResponsiveProp('max-width', $maxWidth, formatSize)}
  ${({ $width }) => handleResponsiveProp('width', $width, formatSize)}
  ${({ $height }) => handleResponsiveProp('height', $height, formatSize)}
  ${({ $margin }) => handleResponsiveProp('margin', $margin)}
  ${({ $borderRadius }) => handleResponsiveProp('border-radius', $borderRadius)}
  ${({ $display = "block" }) => handleResponsiveProp('display', $display)}

  /* Props que não precisam ser responsivas (mas poderiam ser) */
  box-shadow: ${({ $boxShadow }) => $boxShadow || "none"};
  object-fit: ${({ $objectFit }) => $objectFit || "cover"};
  position: ${({ $position }) => $position || "static"};
  z-index: ${({ $zIndex }) => $zIndex || 0};
  border: ${({ $border }) => $border || "none"};
`;

export default Image;