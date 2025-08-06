interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HumorResult {
  mood: string;
  poem: string;
}

// Nossa paleta de 9 humores/cores base
const moodPalette = [
  {
    name: "Vermelho",
    rgb: { r: 255, g: 0, b: 0 },
    mood: "Pulsar",
    poem: "No ritmo do coração, a energia que inflama a alma.",
  },
  {
    name: "Laranja",
    rgb: { r: 255, g: 127, b: 0 },
    mood: "Despertar",
    poem: "A cor da aurora que anuncia a força criativa.",
  },
  {
    name: "Amarelo",
    rgb: { r: 255, g: 255, b: 0 },
    mood: "Revelar",
    poem: "A luz que desvenda a essência e ilumina o caminho.",
  },
  {
    name: "Verde",
    rgb: { r: 0, g: 255, b: 0 },
    mood: "Florescer",
    poem: "O sopro da vida que nutre o espírito e expande o ser.",
  },
  {
    name: "Azul",
    rgb: { r: 0, g: 0, b: 255 },
    mood: "Mergulhar",
    poem: "Nas profundezas do sentir, onde a verdadeira canção reside.",
  },
  {
    name: "Anil",
    rgb: { r: 75, g: 0, b: 130 },
    mood: "Perceber",
    poem: "O véu se ergue entre os mundos, a intuição se faz melodia.",
  },
  {
    name: "Violeta",
    rgb: { r: 148, g: 0, b: 211 },
    mood: "Transcender",
    poem: "A ponte entre o eu e o universo, a vibração que nos une.",
  },
  {
    name: "Branco",
    rgb: { r: 255, g: 255, b: 255 },
    mood: "Libertar",
    poem: "O silêncio que contém todos os sons, o espaço para ser.",
  },
  {
    name: "Preto",
    rgb: { r: 0, g: 0, b: 0 },
    mood: "Ancorar",
    poem: "A força serena do centro, a raiz que firma a nossa dança.",
  },
];

// Função auxiliar para converter um código hexadecimal em RGB
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

/**
 * Analisa uma cor hexadecimal e retorna uma palavra de humor baseada na cor mais próxima
 * de uma paleta de 9 cores.
 * @param hexColor A cor predominante da capa do álbum (ex: '#f0a38b').
 * @returns Uma string com a palavra do humor (ex: 'Criativo').
 */
export function getHumorFromColor(hexColor: string): HumorResult | null {
  const inputRgb = hexToRgb(hexColor);
  if (!inputRgb) return null; // Retorna nulo se a cor for inválida

  let closestResult: HumorResult | null = null;
  let minDistance = Infinity;

  // Itera sobre nossa paleta para encontrar a cor mais próxima
  for (const color of moodPalette) {
    // Calcula a "distância" euclidiana entre as duas cores no espaço RGB
    const distance = Math.sqrt(
      Math.pow(inputRgb.r - color.rgb.r, 2) +
        Math.pow(inputRgb.g - color.rgb.g, 2) +
        Math.pow(inputRgb.b - color.rgb.b, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestResult = { mood: color.mood, poem: color.poem };
    }
  }

  return closestResult;
}
