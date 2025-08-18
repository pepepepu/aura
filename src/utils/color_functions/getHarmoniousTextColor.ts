import { hexToHsl, hslToHex } from './hslConverter';

/**
 * Gera uma cor de texto legível e harmoniosa baseada na cor de fundo.
 * A cor gerada terá a mesma matiz do fundo, mas com luminosidade e saturação ajustadas.
 * @param hexColor A cor de fundo em formato hexadecimal.
 * @returns Uma cor de texto em formato hexadecimal.
 */
export const getHarmoniousTextColor = (hexColor: string): string => {
  if (!hexColor) return '#FFFFFF';

  const [h, s, l] = hexToHsl(hexColor);

  // Se a cor de fundo for clara (luminosidade > 50%)
  if (l > 0.5) {
    // Retorna uma cor escura
    // Matiz (h) é a mesma
    // Saturação (s) é reduzida para a cor não ser muito "vibrante"
    // Luminosidade (l) é bem baixa para garantir o contraste
    const textSaturation = s > 0.3 ? 0.3 : s;
    const textLightness = 0.1; // Valor bem escuro
    return hslToHex(h, textSaturation, textLightness);
  } else {
    // Se a cor de fundo for escura, retorna uma cor clara
    // Matiz (h) é a mesma
    // Saturação (s) é reduzida
    // Luminosidade (l) é bem alta
    const textSaturation = s > 0.3 ? 0.4 : s;
    const textLightness = 0.95; // Valor bem claro, quase branco
    return hslToHex(h, textSaturation, textLightness);
  }
};