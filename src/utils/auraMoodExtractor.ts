interface RGB {
  r: number;
  g: number;
  b: number;
}

// A interface agora reflete os novos nomes das cores que você pediu
export interface AuraMoodColors {
  vibrant: string;
  predominant: string;
  intermediate: string;
  primary: string;
}

function rgbToHex({ r, g, b }: RGB): string {
  if (isNaN(r) || isNaN(g) || isNaN(b)) return "#333333";
  const toHex = (c: number) => Math.round(c).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Função para calcular a "distância" matemática entre duas cores
function colorDistance(rgb1: RGB, rgb2: RGB): number {
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
  );
}

const PROXY_URL = "https://api.allorigins.win/raw?url=";

export async function extractAuraMoodColors(
  imageUrl: string | null | undefined
): Promise<AuraMoodColors | null> {
  if (!imageUrl) return null;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return resolve(null);

      canvas.width = 100;
      canvas.height = 100;
      context.drawImage(img, 0, 0, 100, 100);

      try {
        const imageData = context.getImageData(0, 0, 100, 100).data;
        const allPixels: RGB[] = [];
        const colorCounts = new Map<string, { count: number; rgb: RGB }>();

        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i],
            g = imageData[i + 1],
            b = imageData[i + 2],
            a = imageData[i + 3];
          if (a < 128) continue;

          allPixels.push({ r, g, b });

          const key = `${Math.round(r / 10)},${Math.round(g / 10)},${Math.round(
            b / 10
          )}`;
          const entry = colorCounts.get(key) || { count: 0, rgb: { r, g, b } };
          entry.count++;
          colorCounts.set(key, entry);
        }

        if (allPixels.length === 0) {
          throw new Error("Nenhum pixel válido encontrado na imagem.");
        }

        // --- CÁLCULO DAS 4 NOVAS CORES ---

        // 1. Cor Mais Predominante (mais frequente)
        let maxCount = 0;
        let predominantColor: RGB = { r: 0, g: 0, b: 0 };
        for (const { count, rgb } of colorCounts.values()) {
          if (count > maxCount) {
            maxCount = count;
            predominantColor = rgb;
          }
        }

        // 2. Cor Mais Vibrante (mais saturada)
        let maxSaturation = -1;
        let vibrantColor: RGB = { r: 0, g: 0, b: 0 };
        for (const pixel of allPixels) {
          const max = Math.max(pixel.r, pixel.g, pixel.b);
          const min = Math.min(pixel.r, pixel.g, pixel.b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          if (saturation > maxSaturation) {
            maxSaturation = saturation;
            vibrantColor = pixel;
          }
        }

        // 3. Cor Intermediária (a média de todas as cores da imagem)
        const total = allPixels.reduce(
          (acc, curr) => {
            acc.r += curr.r;
            acc.g += curr.g;
            acc.b += curr.b;
            return acc;
          },
          { r: 0, g: 0, b: 0 }
        );
        const intermediateColor: RGB = {
          r: total.r / allPixels.length,
          g: total.g / allPixels.length,
          b: total.b / allPixels.length,
        };

        // 4. Cor Mais Primária (o pixel da imagem mais próximo de um tom primário puro)
        const primaryColors: RGB[] = [
          { r: 255, g: 0, b: 0 }, // Vermelho
          { r: 0, g: 255, b: 0 }, // Verde
          { r: 0, g: 0, b: 255 }, // Azul
          { r: 255, g: 255, b: 0 }, // Amarelo
        ];
        let closestPrimaryPixel: RGB = allPixels[0];
        let minDistance = Infinity;
        for (const pixel of allPixels) {
          for (const primary of primaryColors) {
            const distance = colorDistance(pixel, primary);
            if (distance < minDistance) {
              minDistance = distance;
              closestPrimaryPixel = pixel;
            }
          }
        }

        resolve({
          vibrant: rgbToHex(vibrantColor),
          predominant: rgbToHex(predominantColor),
          intermediate: rgbToHex(intermediateColor),
          primary: rgbToHex(closestPrimaryPixel),
        });
      } catch (error) {
        console.error("Erro ao processar imagem, usando fallback:", error);
        resolve({
          vibrant: "#FF416C",
          predominant: "#FF4B2B",
          intermediate: "#00c6ff",
          primary: "#8A2387",
        });
      }
    };
    img.onerror = () => {
      console.error("Erro ao carregar imagem, usando fallback.");
      resolve({
        vibrant: "#FF416C",
        predominant: "#FF4B2B",
        intermediate: "#00c6ff",
        primary: "#8A2387",
      });
    };
    img.src = `${PROXY_URL}${encodeURIComponent(imageUrl)}`;
  });
}
