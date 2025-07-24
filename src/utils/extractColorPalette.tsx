/**
 * Define uma estrutura para representar uma cor no formato RGB.
 */
interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Define a estrutura do objeto de paleta retornado.
 */
export interface ColorPaletteResult {
  background: string;
  text: string;
  auraColors: string[];
}

/**
 * Converte um objeto de cor RGB para uma string hexadecimal.
 */
function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (c: number) => Math.round(c).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Interpola duas cores RGB para encontrar a cor que está no meio delas.
 */
function getIntermediateColor(color1: RGB, color2: RGB): RGB {
  return {
    r: (color1.r + color2.r) / 2,
    g: (color1.g + color2.g) / 2,
    b: (color1.b + color2.b) / 2,
  };
}

/**
 * Calcula a luminância relativa de uma cor, conforme as diretrizes WCAG.
 */
function getRelativeLuminance({ r, g, b }: RGB): number {
  const sRGB = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calcula a taxa de contraste entre duas cores, conforme as diretrizes WCAG.
 */
function getContrastRatio(color1: RGB, color2: RGB): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Analisa uma imagem e extrai uma paleta de cores otimizada para legibilidade e estética.
 *
 * @param {string | HTMLImageElement} imageSource A URL da imagem ou o elemento HTML.
 * @param {number} [quantizationQuality=10] Fator de quantização para a cor predominante.
 * @param {number} [contrastThreshold=4.5] O limite mínimo de contraste WCAG (4.5 para AA).
 * @param {number} [monochromeThreshold=0.1] O limite de saturação para considerar uma imagem monocromática.
 * @returns {Promise<ColorPaletteResult>} Uma Promise que resolve com um objeto contendo cores de fundo, texto e para a aura.
 */
export async function extractColorPalette(
  imageSource: string | HTMLImageElement,
  quantizationQuality: number = 10,
  contrastThreshold: number = 4.5,
  monochromeThreshold: number = 0.1
): Promise<ColorPaletteResult> {
  return new Promise((resolve, reject) => {
    const img =
      imageSource instanceof HTMLImageElement ? imageSource : new Image();

    if (typeof imageSource === "string") {
      img.crossOrigin = "Anonymous";
    }

    img.onload = () => {
      const canvas = document.createElement("canvas");
      // CORREÇÃO FINAL: Força o canvas a usar o espaço de cor 'display-p3'.
      // Isso instrui o Chrome (e outros navegadores) a processar as cores na mesma
      // gama ampla que o Safari usa por padrão, resultando em cores mais ricas e fiéis.
      const context = canvas.getContext("2d", {
        colorSpace: "display-p3",
        willReadFrequently: true,
      });
      if (!context) {
        return reject(
          new Error("Não foi possível obter o contexto 2D do canvas.")
        );
      }

      const newWidth = Math.min(img.width, 100);
      const newHeight = img.height * (newWidth / img.width);
      canvas.width = newWidth;
      canvas.height = newHeight;
      context.drawImage(img, 0, 0, newWidth, newHeight);

      const imageData = context.getImageData(0, 0, newWidth, newHeight).data;

      // --- Coleta de Dados ---
      let vibrantDarkColor: RGB = { r: 0, g: 0, b: 0 };
      let vibrantLightColor: RGB = { r: 255, g: 255, b: 255 };
      let mostSaturatedColor: RGB = { r: 128, g: 128, b: 128 };
      let darkestColor: RGB = { r: 255, g: 255, b: 255 };
      let lightestColor: RGB = { r: 0, g: 0, b: 0 };
      let maxDarkScore = -1,
        maxLightScore = -1,
        minLuminance = Infinity,
        maxLuminance = -Infinity,
        maxOverallSaturation = 0;
      let totalR = 0,
        totalG = 0,
        totalB = 0,
        pixelCount = 0;
      const colorCounts = new Map<string, number>();

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i],
          g = imageData[i + 1],
          b = imageData[i + 2],
          a = imageData[i + 3];
        if (a < 128) continue;
        pixelCount++;

        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const maxComponent = Math.max(r, g, b),
          minComponent = Math.min(r, g, b);
        const saturation =
          maxComponent === 0 ? 0 : (maxComponent - minComponent) / maxComponent;

        if (saturation > maxOverallSaturation) {
          maxOverallSaturation = saturation;
          mostSaturatedColor = { r, g, b };
        }

        const luminanceNormalized = luminance / 255;
        const darkScore = saturation * (1 - luminanceNormalized),
          lightScore = saturation * luminanceNormalized;
        if (darkScore > maxDarkScore) {
          maxDarkScore = darkScore;
          vibrantDarkColor = { r, g, b };
        }
        if (lightScore > maxLightScore) {
          maxLightScore = lightScore;
          vibrantLightColor = { r, g, b };
        }
        if (luminance < minLuminance) {
          minLuminance = luminance;
          darkestColor = { r, g, b };
        }
        if (luminance > maxLuminance) {
          maxLuminance = luminance;
          lightestColor = { r, g, b };
        }

        const r_q = Math.round(r / quantizationQuality),
          g_q = Math.round(g / quantizationQuality),
          b_q = Math.round(b / quantizationQuality);
        colorCounts.set(
          `${r_q},${g_q},${b_q}`,
          (colorCounts.get(`${r_q},${g_q},${b_q}`) || 0) + 1
        );
        totalR += r;
        totalG += g;
        totalB += b;
      }

      // --- Pós-Processamento e Cálculo das Cores Base ---
      let maxCount = 0,
        dominantKey = "";
      for (const [key, count] of colorCounts.entries()) {
        if (count > maxCount) {
          maxCount = count;
          dominantKey = key;
        }
      }
      const [r_q, g_q, b_q] = dominantKey.split(",").map(Number);
      const predominantColor: RGB = {
        r: r_q * quantizationQuality,
        g: g_q * quantizationQuality,
        b: b_q * quantizationQuality,
      };

      // --- Montagem da Paleta Final ---
      if (maxOverallSaturation < monochromeThreshold) {
        // CASO MONOCROMÁTICO
        const mediumColor: RGB = {
          r: totalR / pixelCount,
          g: totalG / pixelCount,
          b: totalB / pixelCount,
        };
        const intermediate = getIntermediateColor(darkestColor, lightestColor);

        resolve({
          background: rgbToHex(predominantColor),
          text:
            getContrastRatio(predominantColor, lightestColor) >
            getContrastRatio(predominantColor, darkestColor)
              ? rgbToHex(lightestColor)
              : rgbToHex(darkestColor),
          auraColors: [
            darkestColor,
            lightestColor,
            predominantColor,
            mediumColor,
            intermediate,
          ].map(rgbToHex),
        });
      } else {
        // CASO COLORIDO
        let background = predominantColor;
        let text = mostSaturatedColor;

        // Garante contraste para o texto
        const primaryContrast = getContrastRatio(background, text);
        if (primaryContrast < contrastThreshold) {
          const contrastWithLight = getContrastRatio(
            background,
            vibrantLightColor
          );
          const contrastWithDark = getContrastRatio(
            background,
            vibrantDarkColor
          );
          text =
            contrastWithLight > contrastWithDark
              ? vibrantLightColor
              : vibrantDarkColor;
        }

        // Gera cores intermediárias para enriquecer a paleta da aura
        const harmonicMediumColor = getIntermediateColor(
          vibrantDarkColor,
          vibrantLightColor
        );
        const saturatedToLight = getIntermediateColor(
          mostSaturatedColor,
          vibrantLightColor
        );

        // Monta a paleta da aura com 5 cores garantidas
        const auraColors = [
          vibrantDarkColor,
          vibrantLightColor,
          mostSaturatedColor,
          harmonicMediumColor,
          saturatedToLight,
        ];

        resolve({
          background: rgbToHex(background),
          text: rgbToHex(text),
          auraColors: auraColors.map(rgbToHex),
        });
      }
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
