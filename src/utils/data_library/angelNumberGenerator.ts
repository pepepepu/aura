type AngelColorAssociation = {
  color: string;
  angelNumber: string;
  words: string[];
};

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

export type AngelNumberResult = {
  angelNumber: string;
  words: string;
};

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

export function getAngelNumberFromColor(
  mainColor: ParentColor
): AngelNumberResult {
  const lowerCaseColor = mainColor.toLowerCase();

  const association = angelColorAssociations.find(
    (assoc) => assoc.color.toLowerCase() === lowerCaseColor
  );

  if (association) {
    return {
      angelNumber: association.angelNumber,
      words: association.words.join(" - "),
    };
  }

  return {
    angelNumber: "000",
    words: "Indefinida - Misteriosa - Oculta",
  };
}
