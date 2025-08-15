interface RGB {
  r: number;
  g: number;
  b: number;
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (c: number) => Math.round(c).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getLuminance({ r, g, b }: RGB): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

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

        const lightScore = saturation * luminanceNormalized;
        if (lightScore > maxLightScore) {
          maxLightScore = lightScore;
          vibrantLightColor = { r, g, b };
        }

        const darkScore = saturation * (1 - luminanceNormalized);
        if (darkScore > maxDarkScore) {
          maxDarkScore = darkScore;
          vibrantDarkColor = { r, g, b };
        }
      }

      const lightLuminance = getLuminance(vibrantLightColor);
      const darkLuminance = getLuminance(vibrantDarkColor);

      const LUMINANCE_UPPER_THRESHOLD = 230;
      const LUMINANCE_LOWER_THRESHOLD = 25;

      let chosenColor: RGB;
      if (lightLuminance > LUMINANCE_UPPER_THRESHOLD) {
        if (darkLuminance > LUMINANCE_LOWER_THRESHOLD) {
          chosenColor = vibrantDarkColor;
        } else {
          chosenColor = vibrantLightColor;
        }
      } else {
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
