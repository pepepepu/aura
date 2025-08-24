export interface TarotCardWithDetailsResult {
  card: string;
  card_en: string;
  meaning: string;
  number: string;
  colorPalette: string[];
}

interface ColorPaletteResult {
  auraColors: string[];
  background: string;
  text: string;
}

const majorArcanaMeanings: TarotCardWithDetailsResult[] = [
  {
    card: "O Louco",
    card_en: "The Fool",
    meaning:
      "O início de uma jornada ousada, um salto de fé no desconhecido. Sua aura é de potencial puro e a coragem de dar o primeiro passo.",
    number: "0",
    colorPalette: [
      "#ffffff", // branco
      "#009fe3", // azul claro
      "#ffc900", // amarelo
      "#f47d31", // laranja
      "#75583b", // marrom
      "#268a2d", // verde
    ],
  },
  {
    card: "O Mago",
    card_en: "The Magician",
    meaning:
      "O poder de manifestar, transformar intenções em realidade. Sua aura é de foco, habilidade e a capacidade de usar todas as ferramentas ao seu redor.",
    number: "I",
    colorPalette: [
      "#f81a1a", // vermelho vibrante
      "#e60000", // vermelho profundo
      "#f9c600", // dourado
      "#0055ff", // azul
      "#a40871", // magenta
      "#000000", // preto
    ],
  },
  {
    card: "A Sacerdotisa",
    card_en: "The High Priestess",
    meaning:
      "A guardiã dos mistérios, a voz da intuição e do conhecimento oculto. Sua aura é de silêncio, calma e a sabedoria que reside no subconsciente.",
    number: "II",
    colorPalette: [
      "#003366", // azul escuro
      "#ffffff", // branco
      "#000000", // preto
      "#c2c2c2", // cinza claro
      "#f9c600", // dourado
      "#888888", // cinza médio
    ],
  },
  {
    card: "A Imperatriz",
    card_en: "The Empress",
    meaning:
      "A força da criação, da abundância e da beleza. Sua aura é de fertilidade, nutrição e o poder de gerar vida e crescimento.",
    number: "III",
    colorPalette: [
      "#f47d31", // laranja
      "#e60000", // vermelho
      "#268a2d", // verde
      "#ffff00", // amarelo
      "#0055ff", // azul
      "#ffffff", // branco
    ],
  },
  {
    card: "O Imperador",
    card_en: "The Emperor",
    meaning:
      "O arquiteto da ordem e da estrutura, a força da autoridade e da liderança. Sua aura é de estabilidade, disciplina e realização material.",
    number: "IV",
    colorPalette: [
      "#b42b2b", // vermelho escuro
      "#ffc900", // amarelo dourado
      "#000000", // preto
      "#908d8d", // cinza
      "#282a5c", // azul marinho
      "#00539f", // azul
    ],
  },
  {
    card: "O Hierofante",
    card_en: "The Hierophant",
    meaning:
      "A busca por sabedoria, tradição e propósito espiritual. Sua aura é de orientação, respeito e a conexão com o que é sagrado.",
    number: "V",
    colorPalette: [
      "#ffffff", // branco
      "#e60000", // vermelho
      "#f9c600", // dourado
      "#000000", // preto
      "#b68958", // bege
      "#0055ff", // azul (reforço espiritual)
    ],
  },
  {
    card: "Os Enamorados",
    card_en: "The Lovers",
    meaning:
      "A encruzilhada da vida, a escolha entre caminhos e a união de opostos. Sua aura é de harmonia, amor e a necessidade de tomar uma decisão de coração.",
    number: "VI",
    colorPalette: [
      "#e60000", // vermelho
      "#f81a1a", // vermelho vivo
      "#268a2d", // verde
      "#b0d9e4", // azul claro
      "#ffff00", // amarelo
      "#ffffff", // branco
    ],
  },
  {
    card: "O Carro",
    card_en: "The Chariot",
    meaning:
      "A vitória através da vontade e do controle. Sua aura é de determinação, conquista e o avanço imparável em direção ao seu objetivo.",
    number: "VII",
    colorPalette: [
      "#000000", // preto
      "#e60000", // vermelho
      "#f9c600", // dourado
      "#0055ff", // azul
      "#ffffff", // branco
      "#908d8d", // cinza
    ],
  },
  {
    card: "A Força",
    card_en: "Strength",
    meaning:
      "A coragem que vem de dentro, a força que doma o espírito sem violência. Sua aura é de resiliência, compaixão e poder interior.",
    number: "VIII",
    colorPalette: [
      "#ffff00", // amarelo
      "#ffffff", // branco
      "#e60000", // vermelho
      "#268a2d", // verde
      "#c98a5d", // bege
      "#000000", // preto
    ],
  },
  {
    card: "O Eremita",
    card_en: "The Hermit",
    meaning:
      "A busca por introspecção e a luz da sabedoria interior. Sua aura é de reflexão, isolamento voluntário e a jornada solitária em busca da verdade.",
    number: "IX",
    colorPalette: [
      "#8c201d", // bordô
      "#575757", // cinza
      "#ffc900", // dourado
      "#413c3b", // marrom escuro
      "#6d6a69", // cinza médio
      "#3b2f27", // marrom
    ],
  },
  {
    card: "A Roda da Fortuna",
    card_en: "Wheel of Fortune",
    meaning:
      "O ciclo da vida, a mudança inevitável e o destino. Sua aura é de sorte, sincronicidade e a certeza de que a roda está sempre girando.",
    number: "X",
    colorPalette: [
      "#4b2a8f", // roxo
      "#ffc900", // dourado
      "#000000", // preto
      "#268a2d", // verde
      "#f47d31", // laranja
      "#ffffff", // branco
    ],
  },
  {
    card: "A Justiça",
    card_en: "Justice",
    meaning:
      "Equilíbrio, verdade e a busca pela equidade. Sua aura é de clareza, integridade e imparcialidade.",
    number: "XI",
    colorPalette: [
      "#0055ff", // azul (ajuste)
      "#e60000", // vermelho
      "#f9c600", // dourado
      "#ffffff", // branco
      "#268a2d", // verde
      "#000000", // preto
    ],
  },
  {
    card: "O Enforcado",
    card_en: "The Hanged Man",
    meaning:
      "Uma nova perspectiva através da suspensão e do sacrifício. Sua aura é de rendição, paciência e a iluminação que surge ao ver as coisas de cabeça para baixo.",
    number: "XII",
    colorPalette: [
      "#268a2d", // verde (árvore)
      "#f9c600", // dourado
      "#0055ff", // azul
      "#ffffff", // branco
      "#b68958", // bege
      "#000000", // preto
    ],
  },
  {
    card: "A Morte",
    card_en: "Death",
    meaning:
      "O fim de um ciclo, a transformação e o renascimento. Sua aura é de desapego, de deixar o velho para trás e abraçar um novo começo com coragem.",
    number: "XIII",
    colorPalette: [
      "#000000", // preto
      "#ffffff", // branco
      "#888888", // cinza
      "#2d6596", // azul escuro
      "#f9c600", // dourado
      "#2d2d2d", // cinza escuro
    ],
  },
  {
    card: "A Temperança",
    card_en: "Temperance",
    meaning:
      "O equilíbrio perfeito, a cura e a moderação. Sua aura é de harmonia, paciência e a fusão de energias para um bem maior.",
    number: "XIV",
    colorPalette: [
      "#0055ff", // azul
      "#f9c600", // dourado
      "#268a2d", // verde
      "#f47d31", // laranja
      "#b0d9e4", // azul claro
      "#ffffff", // branco
    ],
  },
  {
    card: "O Diabo",
    card_en: "The Devil",
    meaning:
      "A tentação, a sombra e a superação de vícios. Sua aura é de paixão intensa, materialismo e o chamado para a liberdade de espírito.",
    number: "XV",
    colorPalette: [
      "#000000", // preto
      "#b42b2b", // vermelho escuro
      "#b68958", // bege
      "#268a2d", // verde
      "#ffffff", // branco
      "#888888", // cinza
    ],
  },
  {
    card: "A Torre",
    card_en: "The Tower",
    meaning:
      "A libertação de estruturas falsas, o caos necessário e a revelação. Sua aura é de mudança súbita e o despertar que abala os alicerces.",
    number: "XVI",
    colorPalette: [
      "#000000", // preto
      "#3272d7", // azul
      "#e60000", // vermelho
      "#b42b2b", // bordô
      "#f9c600", // dourado
      "#ffffff", // branco
    ],
  },
  {
    card: "A Estrela",
    card_en: "The Star",
    meaning:
      "A esperança, a inspiração e a cura espiritual. Sua aura é de renovação, fé e a serenidade que vem de saber que o futuro é brilhante.",
    number: "XVII",
    colorPalette: [
      "#0055ff", // azul
      "#b0d9e4", // azul claro
      "#ffff00", // amarelo
      "#268a2d", // verde (ajuste no lugar do marrom)
      "#ffffff", // branco
      "#888888", // cinza claro como apoio
    ],
  },
  {
    card: "A Lua",
    card_en: "The Moon",
    meaning:
      "O subconsciente, a ilusão e a exploração de medos. Sua aura é de intuição, mistério e a jornada através da escuridão para encontrar a luz.",
    number: "XVIII",
    colorPalette: [
      "#000000", // preto
      "#003366", // azul escuro
      "#ffff00", // amarelo
      "#b0d9e4", // azul claro
      "#6a0dad", // roxo (ajuste no lugar do verde)
      "#666666", // cinza
    ],
  },
  {
    card: "O Sol",
    card_en: "The Sun",
    meaning:
      "A alegria pura, o sucesso e a vitalidade sem fim. Sua aura é de otimismo, clareza e a manifestação de felicidade em sua forma mais simples.",
    number: "XIX",
    colorPalette: [
      "#ffff00", // amarelo
      "#f47d31", // laranja
      "#ffffff", // branco
      "#e60000", // vermelho
      "#000000", // preto
      "#0000ff", // azul
    ],
  },
  {
    card: "O Julgamento",
    card_en: "Judgement",
    meaning:
      "O despertar, a renovação e a avaliação de um ciclo. Sua aura é de perdão, renascimento e a capacidade de se erguer e seguir em frente.",
    number: "XX",
    colorPalette: [
      "#0055ff", // azul
      "#e60000", // vermelho
      "#ffffff", // branco
      "#f9c600", // dourado
      "#000000", // preto
      "#d9c3a3", // bege claro (ajuste no lugar do magenta)
    ],
  },
  {
    card: "O Mundo",
    card_en: "The World",
    meaning:
      "A completude, a realização e a integração total. Sua aura é de sucesso, totalidade e a conclusão de uma jornada perfeita.",
    number: "XXI",
    colorPalette: [
      "#268a2d", // verde
      "#b0d9e4", // azul claro
      "#f9c600", // dourado
      "#ffffff", // branco
      "#ffc900", // amarelo
      "#b68958", // bege
    ],
  },
];

const hexToRgbSum = (hex: string): number => {
  if (!hex || hex.length < 7) return 0;
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return r + g + b;
};

export function mapPaletteToMajorArcana(
  palette: ColorPaletteResult
): TarotCardWithDetailsResult {
  const allColors = [palette.background, ...palette.auraColors].filter(
    (c) => c
  );

  if (!allColors.length) {
    return majorArcanaMeanings[0];
  }

  const colorSum = allColors.reduce(
    (sum, color) => sum + hexToRgbSum(color),
    0
  );
  const index = colorSum % majorArcanaMeanings.length;

  return majorArcanaMeanings[index];
}
