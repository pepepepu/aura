export type Energy =
  | "Euphoric"
  | "Rebellious"
  | "Melancholic"
  | "Introspective"
  | "Sensual"
  | "Upbeat"
  | "Mystical"
  | "Powerful"
  | "Chill"
  | "Unknown";

export interface GenreData {
  name: string;
  x: number;
  y: number;
  energy: Energy;
  keywords: string[];
}

export interface AuraData {
  x: number;
  y: number;
  energy: Energy;
  genreName: string;
}

const auraGenres: GenreData[] = [
  {
    name: "Rock",
    x: 0.8,
    y: 1.6,
    energy: "Powerful",
    keywords: [
      "rock",
      "hard rock",
      "classic rock",
      "garage rock",
      "grunge",
      "glam rock",
      "progressive rock",
      "post-rock",
      "southern rock",
      "surf rock",
      "math rock",
      "brazilian rock",
    ],
  },
  {
    name: "Pop",
    x: 1.2,
    y: 1.4,
    energy: "Upbeat",
    keywords: [
      "pop",
      "dance-pop",
      "synthpop",
      "k-pop",
      "j-pop",
      "indie pop",
      "electropop",
      "teen pop",
      "pop rock",
      "britpop",
      "chamber pop",
      "brazilian pop",
      "clap clap clap",
    ],
  },
  {
    name: "Hip-Hop",
    x: 1.4,
    y: 1.3,
    energy: "Powerful",
    keywords: [
      "hip hop",
      "rap",
      "trap",
      "boom bap",
      "drill",
      "gangsta rap",
      "conscious rap",
      "lofi hip hop",
      "freestyle rap",
      "twerk",
      "brazilian rap",
      "brazilian trap",
      "conscious funk",
    ],
  },
  {
    name: "Electronic",
    x: 1.8,
    y: 1.7,
    energy: "Euphoric",
    keywords: [
      "electronic",
      "edm",
      "house",
      "techno",
      "trance",
      "drum and bass",
      "dubstep",
      "electro",
      "synthwave",
      "future bass",
      "progressive house",
      "deep house",
      "big room",
      "idm",
      "breakbeat",
      "tecnobrega",
      "brega funk",
    ],
  },
  {
    name: "R&B",
    x: 1.1,
    y: 0.9,
    energy: "Sensual",
    keywords: [
      "r&b",
      "soul",
      "neo soul",
      "contemporary r&b",
      "motown",
      "quiet storm",
      "rhythm and blues",
      "samba soul",
    ],
  },
  {
    name: "Jazz",
    x: 0.5,
    y: 0.8,
    energy: "Chill",
    keywords: [
      "jazz",
      "smooth jazz",
      "bebop",
      "cool jazz",
      "latin jazz",
      "swing",
      "bossa jazz",
      "fusion",
    ],
  },
  {
    name: "Classical",
    x: 0.2,
    y: 0.7,
    energy: "Introspective",
    keywords: [
      "classical",
      "orchestral",
      "baroque",
      "romantic",
      "modern classical",
      "chamber music",
      "opera",
      "symphony",
      "string quartet",
    ],
  },
  {
    name: "Folk",
    x: 0.3,
    y: 0.6,
    energy: "Introspective",
    keywords: [
      "folk",
      "singer-songwriter",
      "americana",
      "celtic",
      "traditional folk",
      "bluegrass",
      "indie folk",
      "neo-folk",
      "mpb",
      "tropicalia",
      "brazilian folk",
    ],
  },
  {
    name: "Metal",
    x: 0.9,
    y: 1.9,
    energy: "Rebellious",
    keywords: [
      "metal",
      "death metal",
      "black metal",
      "thrash metal",
      "power metal",
      "doom metal",
      "progressive metal",
      "nu metal",
      "metalcore",
      "brazilian metal",
    ],
  },
  {
    name: "Indie",
    x: 0.7,
    y: 1.2,
    energy: "Introspective",
    keywords: [
      "indie",
      "indie rock",
      "indie pop",
      "indie folk",
      "indietronica",
      "lo-fi indie",
      "alternative",
      "brazilian indie",
    ],
  },
  {
    name: "Reggae",
    x: 0.6,
    y: 1.0,
    energy: "Chill",
    keywords: [
      "reggae",
      "ska",
      "dub",
      "roots reggae",
      "dancehall",
      "ragga",
      "brazilian reggae",
    ],
  },
  {
    name: "Punk",
    x: 0.8,
    y: 1.8,
    energy: "Rebellious",
    keywords: [
      "punk",
      "punk rock",
      "hardcore",
      "post-punk",
      "ska punk",
      "pop punk",
      "anarcho-punk",
      "brazilian punk",
    ],
  },
  {
    name: "Ambient",
    x: 1.5,
    y: 0.2,
    energy: "Mystical",
    keywords: [
      "ambient",
      "drone",
      "dark ambient",
      "space ambient",
      "meditation music",
      "brazilian ambient",
    ],
  },
  {
    name: "Funk",
    x: 0.8,
    y: 1.5,
    energy: "Upbeat",
    keywords: [
      "funk",
      "disco",
      "boogie",
      "p-funk",
      "neo-funk",
      "funk carioca",
      "brazilian funk",
    ],
  },
  {
    name: "Blues",
    x: 0.4,
    y: 0.9,
    energy: "Melancholic",
    keywords: [
      "blues",
      "delta blues",
      "chicago blues",
      "electric blues",
      "country blues",
      "soul blues",
    ],
  },
  {
    name: "Country",
    x: 0.4,
    y: 1.1,
    energy: "Melancholic",
    keywords: [
      "country",
      "alt-country",
      "bluegrass country",
      "honky tonk",
      "outlaw country",
      "folk country",
      "sertanejo",
      "university sertanejo",
      "viola caipira",
    ],
  },
  {
    name: "Latin",
    x: 0.6,
    y: 1.6,
    energy: "Upbeat",
    keywords: [
      "latin",
      "salsa",
      "merengue",
      "bachata",
      "reggaeton",
      "cumbia",
      "samba",
      "bossa nova",
      "pagode",
      "forro",
      "mpb",
      "tango",
      "axe",
      "frevo",
      "maracatu",
    ],
  },
  {
    name: "Psychedelic",
    x: 1.0,
    y: 1.4,
    energy: "Mystical",
    keywords: [
      "psychedelic",
      "acid rock",
      "space rock",
      "psych folk",
      "neo-psychedelia",
      "psytrance",
      "brazilian psychedelia",
    ],
  },
  {
    name: "Gospel",
    x: 0.5,
    y: 1.3,
    energy: "Euphoric",
    keywords: [
      "gospel",
      "worship",
      "christian",
      "contemporary christian music",
      "ccm",
      "praise",
      "brazilian gospel",
    ],
  },
  {
    name: "Lo-fi",
    x: 1.3,
    y: 0.4,
    energy: "Chill",
    keywords: [
      "lo-fi",
      "lofi",
      "lofi hip hop",
      "lofi chill",
      "chillhop",
      "brazilian lo-fi",
    ],
  },
];

const fallbackGenre: GenreData = {
  name: "Desconhecido",
  x: 1.0,
  y: 1.0,
  energy: "Unknown",
  keywords: [],
};

export const genreClassifier = (genres: string[]): AuraData => {
  if (!genres || genres.length === 0) {
    return { ...fallbackGenre, genreName: fallbackGenre.name };
  }

  const foundMatches: GenreData[] = [];

  // 1. Encontra as duas primeiras correspondências distintas
  for (const genreName of genres) {
    if (foundMatches.length >= 2) break; // Para quando já temos 2

    const lowerCaseGenre = genreName.toLowerCase();
    const foundGenre = auraGenres.find((g) =>
      g.keywords.some((keyword) => lowerCaseGenre.includes(keyword))
    );

    // Adiciona apenas se encontrou um gênero E se ele ainda não foi adicionado
    if (
      foundGenre &&
      !foundMatches.some((match) => match.name === foundGenre.name)
    ) {
      foundMatches.push(foundGenre);
    }
  }

  // 2. Trata os resultados com base em quantas correspondências foram encontradas
  switch (foundMatches.length) {
    case 0:
      // Não encontrou nenhuma correspondência
      return { ...fallbackGenre, genreName: fallbackGenre.name };

    case 1:
      // Encontrou apenas uma correspondência
      const genreA = foundMatches[0];
      return {
        x: genreA.x,
        y: genreA.y,
        energy: genreA.energy,
        genreName: genreA.name,
      };

    case 2:
      const genreA_ = foundMatches[0];
      const genreB_ = foundMatches[1];
      const newX = genreA_.x * 0.3 + genreB_.x * 0.3;
      const newY = genreA_.y * 0.7 + genreB_.y * 0.3;

      return {
        x: newX,
        y: newY,
        energy: genreA_.energy, // Usa a energia do gênero principal
        genreName: `${genreA_.name} / ${genreB_.name}`, // Cria um nome combinado
      };

    default:
      return { ...fallbackGenre, genreName: fallbackGenre.name };
  }
};

const energyWords: Record<Energy, string[]> = {
  Euphoric: [
    "Sirius", // A Estrela do Cão — o brilho mais intenso no céu noturno
    "Fama", // associada à fama e prestígio :contentReference[oaicite:0]{index=0}
    "Iluminação", // simboliza iluminação espiritual :contentReference[oaicite:1]{index=1}
    "Sabedoria", // guardiã do conhecimento hermético :contentReference[oaicite:2]{index=2}
    "Portão", // considerada um portal entre mundos (Egito antigo) :contentReference[oaicite:3]{index=3}
    "Companhia", // guardiã, como cão vigilante nos mitos :contentReference[oaicite:4]{index=4}
    "Renovação", // sua ascensão marcava as cheias do Nilo e início de vida nova :contentReference[oaicite:5]{index=5}
  ],
  Rebellious: [
    "Antares", // a “Rival de Ares” e “Coração do Escorpião”
    "Transformação", // portal de purificação e renascimento :contentReference[oaicite:6]{index=6}
    "Coragem", // concede coragem estratégica :contentReference[oaicite:7]{index=7}
    "Fúria", // energia marciana de destruição :contentReference[oaicite:8]{index=8}
    "Resiliência", // associado com superar bloqueios profundos :contentReference[oaicite:9]{index=9}
    "Destino", // marcando caminhos extraordinários com ciclos intensos :contentReference[oaicite:10]{index=10}
    "Guardião", // estrela real considerada guardiã celeste :contentReference[oaicite:11]{index=11}
  ],
  Melancholic: [
    "Algol", // “a Estrela-demônio”, associada a ciclos sombrios
    "Medo", // símbolo de perigo oculto e temor esotérico
    "Obscuridade", // evocando mistério sombrio e introspecção
    "Ciclos", // simbolizando retorno e repetição cíclica
    "Dualidade", // ia/volta entre luz e escuridão, vida e morte
    "Presságio", // conotação mítica de mau agouro
    "Tristeza", // sonoridade melancólica e associações sombrias
  ],
  Introspective: [
    "Polaris", // a Estrela Polar, ponto fixo de orientação
    "Guia", // guia para o interior e para o Norte (em mapa e alma)
    "Foco", // símbolo de estabilidade mental e direção
    "Origem", // ponto de partida existencial e espiritual
    "Constância", // presença firme apesar das mudanças terrestres
    "Centro", // ancorando a bússola interna
    "Silêncio", // quietude profunda da alma que busca sentido
  ],
  Sensual: [
    "Vega", // estrela sensual na Lira, luz suave e envolvente
    "Atração", // encanto luminoso que seduz
    "Harmonia", // musicalidade e afeto refinado
    "Noite", // atmosfera noturna, íntima e quente
    "Mistério", // seduz pelo indizível
    "Eco", // reverberação de sentimentos íntimos
    "Sedução", // luz que chama e envolve
  ],
  Upbeat: [
    "Altair", // estrela brilhante e vibrante da Águia
    "Agilidade", // rápida no céu — energia em movimento
    "Vivacidade", // representando vigor e entusiasmo
    "Ascensão", // simboliza movimento ascendente
    "Estímulo", // chama de motivação interna
    "Brilho", // luz viva, inspiradora
    "Ritmo", // cadência dinâmica da vida e criação
  ],
  Mystical: [
    "Betelgeuse", // gigante vermelha de Órion, enigmática e profunda
    "Profundidade", // densidade existencial e mistério cósmico
    "Ressonância", // eco ancestral no universo
    "Oráculo", // fala através do tempo e do espaço
    "Transcendência", // ultrapassa limites da matéria
    "Vórtice", // energia que suga e transporta a consciência
    "Infinito", // conexão com o eterno e desconhecido
  ],
  Powerful: [
    "Rigel", // estrela azul potente de Órion, imponente
    "Força", // impacto físico e simbólico
    "Majestade", // presença orgulhosa no céu
    "Autoridade", // influência dominante e inflexível
    "Dominância", // energia que impõe respeito
    "Imortalidade", // perene através do eon estelar
    "Expansão", // crescimento em escala cósmica
  ],
  Chill: [
    "Canopus", // segunda mais brilhante do céu, navegadora
    "Serenidade", // seu uso na navegação transmite calma
    "Profundidade", // tranquilidade e amplitude
    "Fluxo", // guia constante em longas jornadas
    "Equilíbrio", // estabilidade para os navegantes
    "Refúgio", // ponto de segurança no mar aberto
    "Silêncio", // calma noturna, longe do ruído mundano
  ],
  Unknown: [
    "Deneb", // estrela distante e elegante na Cauda do Cisne
    "Mistério", // presente pelo alcance limítrofe do olhar
    "Vácuo", // espaço entre estrelas, vasto e cheio de perguntas
    "Potencial", // energia latente à espera de despertar
    "Limite", // fronteira entre o conhecido e o desconhecido
    "Vozes", // ecos de mundos além dos sentidos
    "Horizonte", // linha onde o hoje encontra o talvez
  ],
};

export const getEnergyState = (energy: Energy): string[] => {
  return energyWords[energy] || energyWords.Unknown;
};
