import styled from "styled-components";
import {
  handleResponsiveProp,
  formatSize,
  type Size,
  type ResponsiveProp,
} from "../../../utils/styledHelpers";

interface SvgProps extends React.HTMLAttributes<HTMLDivElement> {
  $maxWidth?: ResponsiveProp<Size>;
  $width?: ResponsiveProp<Size>;
  $height?: ResponsiveProp<Size>;
  $margin?: ResponsiveProp<string>;
  $borderRadius?: ResponsiveProp<string>;
  $display?: ResponsiveProp<string>;
  $color?: string;
}

const Svg = styled.div<SvgProps>`
  ${({ $maxWidth }) => handleResponsiveProp("max-width", $maxWidth, formatSize)}
  ${({ $width }) => handleResponsiveProp("width", $width, formatSize)}
  ${({ $height }) => handleResponsiveProp("height", $height, formatSize)}
  ${({ $margin }) => handleResponsiveProp("margin", $margin)}
  ${({ $borderRadius }) => handleResponsiveProp("border-radius", $borderRadius)}
  ${({ $display = "inline-block" }) => handleResponsiveProp("display", $display)}
  color: ${({ $color }) => $color || "inherit"};

  svg {
    width: 100%;
    height: 100%;
    display: block;
    fill: currentColor;
  }
`;

export default Svg;