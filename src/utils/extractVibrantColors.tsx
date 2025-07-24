/**
 * Define uma estrutura para representar uma cor no formato RGB.
 */
interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Converte um objeto de cor RGB para uma string hexadecimal.
 */
function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (c: number) => Math.round(c).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Calcula a luminância percebida de uma cor.
 * @returns Um valor entre 0 (preto) e 255 (branco).
 */
function getLuminance({ r, g, b }: RGB): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/**
 * Analisa uma imagem e extrai uma cor vibrante "inteligente", evitando extremos de branco e preto.
 *
 * @param {string | HTMLImageElement} imageSource A URL da imagem ou o elemento HTML.
 * @returns {Promise<string | null>} Uma Promise que resolve com a string da cor hexadecimal escolhida.
 */
export async function extractVibrantColor(
  imageSource: string | HTMLImageElement
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const img =
      imageSource instanceof HTMLImageElement ? imageSource : new Image();

    if (typeof imageSource === "string") {
      img.crossOrigin = "Anonymous";
    }

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", {
        colorSpace: "display-p3",
        willReadFrequently: true,
      });
      if (!context) {
        console.error("Não foi possível obter o contexto 2D do canvas.");
        return resolve(null);
      }

      const newWidth = Math.min(img.width, 100);
      const newHeight = img.height * (newWidth / img.width);
      canvas.width = newWidth;
      canvas.height = newHeight;
      context.drawImage(img, 0, 0, newWidth, newHeight);

      const imageData = context.getImageData(0, 0, newWidth, newHeight).data;

      // --- Coleta de Dados ---
      let vibrantLightColor: RGB = { r: 255, g: 255, b: 255 };
      let vibrantDarkColor: RGB = { r: 0, g: 0, b: 0 };
      let maxLightScore = -1;
      let maxDarkScore = -1;

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i],
          g = imageData[i + 1],
          b = imageData[i + 2],
          a = imageData[i + 3];
        if (a < 128) continue;

        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const maxComponent = Math.max(r, g, b),
          minComponent = Math.min(r, g, b);
        const saturation =
          maxComponent === 0 ? 0 : (maxComponent - minComponent) / maxComponent;

        const luminanceNormalized = luminance / 255;

        // 1. Encontra a candidata a cor clara mais vibrante
        const lightScore = saturation * luminanceNormalized;
        if (lightScore > maxLightScore) {
          maxLightScore = lightScore;
          vibrantLightColor = { r, g, b };
        }

        // 2. Encontra a candidata a cor escura mais vibrante
        const darkScore = saturation * (1 - luminanceNormalized);
        if (darkScore > maxDarkScore) {
          maxDarkScore = darkScore;
          vibrantDarkColor = { r, g, b };
        }
      }

      // --- Pós-Processamento e Lógica de Decisão ---
      const lightLuminance = getLuminance(vibrantLightColor);
      const darkLuminance = getLuminance(vibrantDarkColor);

      const LUMINANCE_UPPER_THRESHOLD = 230; // Cores com brilho acima disso são consideradas "muito brancas"
      const LUMINANCE_LOWER_THRESHOLD = 25; // Cores com brilho abaixo disso são consideradas "muito pretas"

      let chosenColor: RGB;

      // Se a cor clara vibrante for muito clara...
      if (lightLuminance > LUMINANCE_UPPER_THRESHOLD) {
        // ...verificamos se a cor escura vibrante está em uma faixa aceitável.
        if (darkLuminance > LUMINANCE_LOWER_THRESHOLD) {
          chosenColor = vibrantDarkColor; // Usa a cor escura como alternativa
        } else {
          chosenColor = vibrantLightColor; // Como último recurso, usa a clara mesmo assim
        }
      } else {
        // Se a cor clara não for muito clara, ela é a escolhida.
        chosenColor = vibrantLightColor;
      }

      resolve(rgbToHex(chosenColor));
    };

    img.onerror = (err) => {
      console.error("Erro ao carregar a imagem:", err);
      reject(new Error("Falha ao carregar a imagem."));
    };

    if (typeof imageSource === "string") {
      img.src = imageSource;
    } else if (img.complete) {
      img.onload(new Event("load"));
    }
  });
}
