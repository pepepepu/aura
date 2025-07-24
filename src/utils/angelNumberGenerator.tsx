/**
 * Define a estrutura para a associação entre uma cor, seu angel number e palavras.
 */
type AngelColorAssociation = {
  color: string;
  angelNumber: string;
  words: string[];
};

/**
 * Define os tipos de "cores pai" que a função aceita como entrada.
 */
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

/**
 * Define a estrutura do objeto de retorno da função.
 */
export type AngelNumberResult = {
  angelNumber: string;
  words: string;
};

/**
 * A lista de associações entre as cores, seus angel numbers e palavras poéticas.
 */
export const angelColorAssociations: AngelColorAssociation[] = [
  {
    color: "branco",
    angelNumber: "111",
    words: ["Imaculada", "Primordial", "Luminosa"],
  },
  {
    color: "verde",
    angelNumber: "222",
    words: ["Harmoniosa", "Fraterna", "Florescente"],
  },
  {
    color: "amarelo",
    angelNumber: "333",
    words: ["Radiante", "Jubilosa", "Inspirada"],
  },
  {
    color: "azul",
    angelNumber: "444",
    words: ["Serena", "Firme", "Celeste"],
  },
  {
    color: "laranja",
    angelNumber: "555",
    words: ["Vibrante", "Liberta", "Inquieta"],
  },
  {
    color: "anil",
    angelNumber: "666",
    words: ["Introspectiva", "Mística", "Consciente"],
  },
  {
    color: "violeta",
    angelNumber: "777",
    words: ["Etérea", "Transcendental", "Sábia"],
  },
  {
    color: "vermelho",
    angelNumber: "888",
    words: ["Infinita", "Próspera", "Vigorosa"],
  },
  {
    color: "preto",
    angelNumber: "999",
    words: ["Conclusiva", "Profunda", "Renovadora"],
  },
];

/**
 * Encontra o angel number e as palavras correspondentes a uma "cor pai".
 * @param {ParentColor} mainColor - A cor pai (ex: "vermelho", "azul").
 * @returns {AngelNumberResult} Um objeto com o angel number e as palavras formatadas.
 */
export function getAngelNumberFromColor(
  mainColor: ParentColor
): AngelNumberResult {
  // Converte a cor de entrada para minúsculas para garantir a correspondência
  const lowerCaseColor = mainColor.toLowerCase();

  // Procura a associação na lista
  const association = angelColorAssociations.find(
    (assoc) => assoc.color.toLowerCase() === lowerCaseColor
  );

  // Se uma associação for encontrada, formata e retorna os dados
  if (association) {
    return {
      angelNumber: association.angelNumber,
      words: association.words.join(" - "),
    };
  }

  // Retorna um valor de fallback se nenhuma associação for encontrada
  return {
    angelNumber: "000",
    words: "Indefinida - Misteriosa - Oculta",
  };
}
