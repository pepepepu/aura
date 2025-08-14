interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface MapColorPaletteResult {
  palette: string[];
  textColor: string;
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (c: number) => Math.round(c).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getRelativeLuminance({ r, g, b }: RGB): number {
  const sRGB = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function getContrastRatio(color1: RGB, color2: RGB): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function interpolateColor(color1: RGB, color2: RGB, factor: number): RGB {
  return {
    r: color1.r + factor * (color2.r - color1.r),
    g: color1.g + factor * (color2.g - color1.g),
    b: color1.b + factor * (color2.b - color1.b),
  };
}

export async function generateMapColorPalette(
  imageSource: string | HTMLImageElement
): Promise<MapColorPaletteResult> {
  return new Promise((resolve, reject) => {
    const img =
      imageSource instanceof HTMLImageElement ? imageSource : new Image();

    if (typeof imageSource === "string") {
      img.crossOrigin = "Anonymous";
    }

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        return reject(
          new Error("Não foi possível obter o contexto 2D do canvas.")
        );
      }

      const aspectRatio = img.height / img.width;
      const newWidth = 100;
      const newHeight = newWidth * aspectRatio;
      canvas.width = newWidth;
      canvas.height = newHeight;
      context.drawImage(img, 0, 0, newWidth, newHeight);

      const imageData = context.getImageData(0, 0, newWidth, newHeight).data;

      let mostSaturatedColor: RGB = { r: 128, g: 128, b: 128 };
      let lightestColor: RGB = { r: 0, g: 0, b: 0 };
      let maxSaturation = -1;
      let maxLuminance = -1;

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        if (a < 128) continue;

        const maxComponent = Math.max(r, g, b);
        const minComponent = Math.min(r, g, b);
        const saturation =
          maxComponent === 0 ? 0 : (maxComponent - minComponent) / maxComponent;
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        if (saturation > maxSaturation) {
          maxSaturation = saturation;
          mostSaturatedColor = { r, g, b };
        }
        if (luminance > maxLuminance) {
          maxLuminance = luminance;
          lightestColor = { r, g, b };
        }
      }

      const paletteRgb: RGB[] = [];
      const totalSteps = 5;

      for (let i = 0; i <= totalSteps; i++) {
        const factor = i / totalSteps;
        const interpolatedColor = interpolateColor(
          mostSaturatedColor,
          lightestColor,
          factor
        );
        paletteRgb.push(interpolatedColor);
      }

      const black: RGB = { r: 0, g: 0, b: 0 };
      const white: RGB = { r: 255, g: 255, b: 255 };

      const minContrastForBlack = Math.min(
        ...paletteRgb.map((bgColor) => getContrastRatio(black, bgColor))
      );

      const minContrastForWhite = Math.min(
        ...paletteRgb.map((bgColor) => getContrastRatio(white, bgColor))
      );

      const bestTextColor =
        minContrastForBlack >= minContrastForWhite ? black : white;

      resolve({
        palette: paletteRgb.map(rgbToHex),
        textColor: rgbToHex(bestTextColor),
      });
    };

    img.onerror = (err) =>
      reject(new Error(`Erro ao carregar a imagem: ${err}`));

    if (typeof imageSource === "string") {
      img.src = imageSource;
    } else if (img.complete) {
      img.onload(new Event("load"));
    }
  });
}
