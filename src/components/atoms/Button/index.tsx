import React from "react";
import styled, { css } from "styled-components";
import {
  handleResponsiveProp,
  formatSize,
  type Size,
  type ResponsiveProp,
} from "../../../utils/styledHelpers";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $width?: ResponsiveProp<Size>;
  $minWidth?: ResponsiveProp<Size>;
  $height?: ResponsiveProp<Size>;
  $background?: string;
  $color?: string;
  $padding?: ResponsiveProp<string>;
  $border?: string;
  $borderRadius?: ResponsiveProp<string>;
  $fontSize?: ResponsiveProp<string>;
  $fontWeight?: ResponsiveProp<
    | string
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
  >;
  $cursor?: string;
  $transition?: string;
  $position?: string;

  $right?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;

  // Props de lógica customizada
  $hoverBackground?: string;
  $hoverColor?: string;
  $underlineOnHover?: boolean;
  $isUnderlineActive?: boolean;
  $afterBackground?: string;
  $boxShadow?: string;
  $gap?: string;
}

const StyledButton = styled.button<ButtonProps>`
  ${({ $width }) => handleResponsiveProp("width", $width, formatSize)}
  ${({ $minWidth }) => handleResponsiveProp("min-width", $minWidth, formatSize)}
  ${({ $height }) => handleResponsiveProp("height", $height, formatSize)}
  ${({ $padding }) => handleResponsiveProp("padding", $padding)}
  ${({ $borderRadius = "6px" }) =>
    handleResponsiveProp("border-radius", $borderRadius)}
  ${({ $fontSize }) => handleResponsiveProp("font-size", $fontSize)}
  ${({ $fontWeight }) => handleResponsiveProp("font-weight", $fontWeight)}
  ${({ $gap = "0" }) => handleResponsiveProp("gap", $gap)}
  
  position: ${({ $position }) => $position || "static"};
  right: ${({ $right }) => $right || "auto"};
  top: ${({ $top }) => $top || "auto"};
  bottom: ${({ $bottom }) => $bottom || "auto"};
  left: ${({ $left }) => $left || "auto"};

  background: ${({ $background }) => $background || "transparent"};
  color: ${({ $color }) => $color || "#fff"};
  border: ${({ $border }) => $border || "none"};
  cursor: ${({ $cursor }) => $cursor || "pointer"};
  transition: ${({ $transition }) =>
    $transition || "box-shadow 0.2s, background-color 0.5s, color 0.3s"};
  box-shadow: ${({ $boxShadow }) => $boxShadow || "none"};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 15%;
    height: 2px;
    border-radius: 0;
    width: ${({ $underlineOnHover, $isUnderlineActive }) =>
      $isUnderlineActive ? "70%" : $underlineOnHover ? "0" : "0"};
    background: ${({ $afterBackground }) => $afterBackground || "transparent"};
    transition: ${({ $underlineOnHover }) =>
      $underlineOnHover ? "width 0.3s ease-in-out" : "none"};
  }
  &:hover::after {
    width: ${({ $underlineOnHover }) => ($underlineOnHover ? "70%" : "0")};
  }

  &:hover {
    ${({ $hoverBackground }) =>
      $hoverBackground &&
      css`
        background: ${$hoverBackground};
      `}
    ${({ $hoverColor }) =>
      $hoverColor &&
      css`
        color: ${$hoverColor};
      `}
  }
`;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <StyledButton ref={ref} {...rest}>
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
