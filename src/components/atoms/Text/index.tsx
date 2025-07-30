import styled, { css } from "styled-components";
import {
  handleResponsiveProp,
  type ResponsiveProp
} from "../../../utils/styledHelpers";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  $fontSize?: ResponsiveProp<string>;
  $fontWeight?: ResponsiveProp<string | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900">;
  $textAlign?: ResponsiveProp<"center" | "left" | "right" | "justify">;
  $fontStyle?: ResponsiveProp<"normal" | "italic" | "bold">;
  $color?: string;
  $margin?: ResponsiveProp<string>;
  $padding?: ResponsiveProp<string>;
  $lineHeight?: ResponsiveProp<string>;
  $letterSpacing?: ResponsiveProp<string>;
  $maxWidth?: ResponsiveProp<string>;
  $fontFamily?: string;
  $textDecoration?: "overline" | "line-through" | "underline" | "underline overline" | string;
  $hoverColor?: string;
  $transition?: string;
}
const Text = styled.p<TextProps>`
  ${({ $fontSize = "1rem" }) => handleResponsiveProp('font-size', $fontSize)}
  ${({ $fontWeight = "normal" }) => handleResponsiveProp('font-weight', $fontWeight)}
  ${({ $textAlign = "left" }) => handleResponsiveProp('text-align', $textAlign)}
  ${({ $fontStyle = "normal" }) => handleResponsiveProp('font-style', $fontStyle)}
  ${({ $margin = "0" }) => handleResponsiveProp('margin', $margin)}
  ${({ $padding = "0" }) => handleResponsiveProp('padding', $padding)}
  ${({ $lineHeight = "normal" }) => handleResponsiveProp('line-height', $lineHeight)}
  ${({ $letterSpacing = "normal" }) => handleResponsiveProp('letter-spacing', $letterSpacing)}
  ${({ $maxWidth = "none" }) => handleResponsiveProp('max-width', $maxWidth)}

  font-family: ${({ $fontFamily }) => $fontFamily || "Inter"};
  color: ${({ $color }) => $color || "#141414"};
  transition: ${({ $transition }) => $transition};
  text-decoration: ${({ $textDecoration }) => $textDecoration || "none"};
  word-wrap: break-word;
  
  /* Valores estáticos */
  position: relative;
  display: inline-block;
  transition: color 0.3s ease;

  /* Lógica de hover atualizada */
  ${({ $hoverColor }) =>
    $hoverColor &&
    css`
      &:hover {
        color: ${$hoverColor};
      }
    `}
`;

export default Text;