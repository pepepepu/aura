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

  for (const genreName of genres) {
    const lowerCaseGenre = genreName.toLowerCase();

    const foundGenre = auraGenres.find((g) =>
      g.keywords.some((keyword) => lowerCaseGenre.includes(keyword))
    );

    if (foundGenre) {
      return {
        x: foundGenre.x,
        y: foundGenre.y,
        energy: foundGenre.energy,
        genreName: foundGenre.name,
      };
    }
  }

  return { ...fallbackGenre, genreName: fallbackGenre.name };
};

const energyWords: Record<Energy, string[]> = {
  Euphoric: [
    "Sirius",
    "Explosão",
    "Radiança",
    "Supernova",
    "Luminescência",
    "Cosmos",
    "Ascensão",
  ],
  Rebellious: [
    "Antares",
    "Ruptura",
    "Erupção",
    "Caos",
    "Colapso",
    "Tempestade",
    "Fragmento",
  ],
  Melancholic: [
    "Algol",
    "Crepúsculo",
    "Neblina",
    "Sombras",
    "Longevidade",
    "Eco",
    "Memória",
  ],
  Introspective: [
    "Polaris",
    "Horizonte",
    "Reflexo",
    "Origem",
    "Constelação",
    "Véu",
    "Profundezas",
  ],
  Sensual: [
    "Vega",
    "Calor",
    "Curvatura",
    "Noite",
    "Pulso",
    "Segredo",
    "Veludo",
  ],
  Upbeat: [
    "Altair",
    "Centelha",
    "Cintilar",
    "Aurora",
    "Vibração",
    "Fluxo",
    "Êxtase",
  ],
  Mystical: [
    "Betelgeuse",
    "Portal",
    "Névoa",
    "Oráculo",
    "Infinito",
    "Vórtice",
    "Espectro",
  ],
  Powerful: [
    "Rigel",
    "Impacto",
    "Trovão",
    "Majestade",
    "Corona",
    "Forja",
    "Eternidade",
  ],
  Chill: [
    "Canopus",
    "Brisa",
    "Serenidade",
    "Onda",
    "Pausa",
    "Aconchego",
    "Calmaria",
  ],
  Unknown: [
    "Deneb",
    "Enigma",
    "Éter",
    "Vazio",
    "Horizonte",
    "Mistério",
    "Singularidade",
  ],
};

export const getEnergyState = (energy: Energy): string[] => {
  return energyWords[energy] || energyWords.Unknown;
};
