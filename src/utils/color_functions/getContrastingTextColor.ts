/**
 * Calcula uma cor de texto contrastante (preto ou branco) para uma determinada cor de fundo.
 * @param hexColor A cor de fundo em formato hexadecimal (ex: "#A7AEC8").
 * @returns Retorna "#000000" (preto) para fundos claros e "#FFFFFF" (branco) para fundos escuros.
 */
export const getContrastingTextColor = (hexColor: string): string => {
  // Se a cor for nula ou inválida, retorna branco como padrão.
  if (!hexColor) return "#FFFFFF";

  // Remove o '#' do início da string
  const cleanHex = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;

  // Converte o hex para valores RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Fórmula para calcular a luminosidade percebida (YIQ)
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;

  // Retorna preto para cores claras (luminosidade > 128) e branco para cores escuras.
  return luminance > 128 ? "#000000" : "#FFFFFF";
};