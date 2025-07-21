import styled from "styled-components";

// CORREÇÃO: Adicionada a palavra-chave 'export' para que a interface possa ser importada em outros arquivos.
export interface TextProps {
  fontSize?: string;
  fontWeight?: string | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  fontStyle?: string | "italic" | "normal" | "bold";
  color?: string;
  margin?: string;
  padding?: string;
  textAlign?: string | "center" | "left" | "right" | "justify";
  lineHeight?: string;
  letterSpacing?: string;
  maxWidth?: string;
  fontFamily?: string;
  textDecoration?: "overline" | "line-through" | "underline" | "underline overline" | string
  hoverColor?: string;
  style?: React.CSSProperties; // Adicionando a prop 'style' para compatibilidade
}

const Text = styled.p<TextProps>`
  font-size: ${({ fontSize }) => fontSize || "1rem"};
  font-weight: ${({ fontWeight }) => fontWeight || "500"};
  font-family: ${({ fontFamily }) => fontFamily || "League Spartan"};
  color: ${({ color }) => color || "#141414"};
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
  text-align: ${({ textAlign }) => textAlign || "left"};
  line-height: ${({ lineHeight }) => lineHeight || "normal"};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || "normal"};
  max-width: ${({ maxWidth }) => maxWidth || "none"};
  position: relative;
  display: inline-block;
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  font-style: ${({ fontStyle }) => fontStyle || "normal"};
  transition: color 0.3s ease;
  user-select: none;

  &:hover {
    color: ${({ hoverColor, color }) => hoverColor || color || "#141414"};
  }
`;

export default Text;
