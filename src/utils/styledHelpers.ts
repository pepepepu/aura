import { css } from "styled-components";

export type Size = string | number;

export const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

export type ResponsiveProp<T> =
  | T
  | {
      base?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
    };

export const formatSize = (value?: Size): string => {
  if (typeof value === "number") return `${value}px`;
  return value || "auto";
};

export const handleResponsiveProp = (
  cssProperty: string,
  value: any,
  formatter: (v: any) => string = (v) => v
) => {
  if (value === undefined) {
    return null;
  }
  if (typeof value !== "object" || value === null) {
    return css`
      ${String.raw`${cssProperty}: ${formatter(value)};`}
    `;
  }
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
