interface RGB {
  r: number;
  g: number;
  b: number;
}

type ParentColor =
  | "vermelho"
  | "laranja"
  | "amarelo"
  | "verde"
  | "azul"
  | "anil"
  | "violeta"
  | "preto"
  | "branco";

function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s: number,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

function categorizeColor(h: number, s: number, l: number): ParentColor {
  if (s < 0.15) {
    if (l > 0.9) return "branco";
    if (l < 0.1) return "preto";
    return l > 0.5 ? "branco" : "preto";
  }

  if (h >= 340 || h < 15) return "vermelho";
  if (h < 40) return "laranja";
  if (h < 70) return "amarelo";
  if (h < 160) return "verde";
  if (h < 250) return "azul";
  if (h < 280) return "anil";
  return "violeta";
}

export function checkMainColor(colorsHex: string[]): ParentColor {
  if (!Array.isArray(colorsHex) || colorsHex.length === 0) {
    console.warn("A função checkMainColor recebeu um array inválido ou vazio.");
    return "preto";
  }

  const colorCounts: Record<ParentColor, number> = {
    vermelho: 0,
    laranja: 0,
    amarelo: 0,
    verde: 0,
    azul: 0,
    anil: 0,
    violeta: 0,
    preto: 0,
    branco: 0,
  };

  for (const hex of colorsHex) {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const parentColor = categorizeColor(hsl.h, hsl.s, hsl.l);
      colorCounts[parentColor]++;
    }
  }

  let mainColor: ParentColor = "preto";
  let maxCount = 0;

  for (const color in colorCounts) {
    const typedColor = color as ParentColor;
    if (colorCounts[typedColor] > maxCount) {
      maxCount = colorCounts[typedColor];
      mainColor = typedColor;
    }
  }

  return mainColor;
}
