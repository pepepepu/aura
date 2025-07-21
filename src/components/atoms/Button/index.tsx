import React from "react";
import styled from "styled-components";

type Size = string | number;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $width?: Size;
  $minWidth?: Size;
  $height?: Size;
  $color?: string;
  $border?: string;
  $borderRadius?: string;
  $hoverBackground?: string;
  $hoverColor?: string;
  $transition?: string;
  $cursor?: string;
  $children?: React.ReactNode;
  $background?: string;
  $padding?: string;
  $boxShadow?: string;
}

const formatSize = (value?: Size) => {
  if (typeof value === "number") return `${value}px`;
  return value || "auto";
};

const StyledButton = styled.button<ButtonProps>`
  width: ${({ $width }) => formatSize($width)};
  min-width: ${({ $minWidth }) => formatSize($minWidth || "auto")};
  height: ${({ $height }) => formatSize($height)};
  background: ${({ $background }) => $background || "transparent"};
  color: ${({ $color }) => $color || "#fff"};
  padding: ${({ $padding }) => $padding || "0px"};
  border: ${({ $border }) => $border || "none"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "6px"};
  cursor: ${({ $cursor }) => $cursor || "pointer"};
  box-shadow: ${({ $boxShadow }) => $boxShadow};
  transition: ${({ $transition }) => $transition || "all 0.15s ease-in-out"};

  &:hover {
    background: ${({ $hoverBackground }) => $hoverBackground};
    color: ${({ $hoverColor }) => $hoverColor};
  }

  &:active {
    box-shadow: none;
    scale: 0.98
  }
`;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <StyledButton ref={ref} {...rest}>{children}</StyledButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
