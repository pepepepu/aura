// Tipos e dados fornecidos pelo usuário
type Tonalidade = "claro" | "medioClaro" | "medio" | "medioEscuro" | "escuro";

type CorPoetica = {
  cor:
    | "vermelho"
    | "laranja"
    | "amarelo"
    | "verde"
    | "azul"
    | "anil"
    | "violeta"
    | "preto"
    | "branco";
  tons: Record<Tonalidade, string[]>;
};

export const coresPoeticas: CorPoetica[] = [
  {
    cor: "vermelho",
    tons: {
      claro: ["ruboroso", "vivaz", "ardente"],
      medioClaro: ["incandescente", "fulgente", "vibrante"],
      medio: ["apaixonado", "impetuoso", "escarlate"],
      medioEscuro: ["intenso", "abrasado", "febril"],
      escuro: ["sanguíneo", "incendiado", "obscuramente ardente"],
    },
  },
  {
    cor: "laranja",
    tons: {
      claro: ["cintilante", "solar", "animado"],
      medioClaro: ["resplandecente", "alvoroçado", "quente"],
      medio: ["efusivo", "crepitante", "ardoso"],
      medioEscuro: ["latejante", "cobreado", "vibrátil"],
      escuro: ["braseiro", "fogoso", "densamente cálido"],
    },
  },
  {
    cor: "amarelo",
    tons: {
      claro: ["radiante", "dourilho", "esperançoso"],
      medioClaro: ["luminoso", "solarengo", "vivo"],
      medio: ["áureo", "resplandente", "vívido"],
      medioEscuro: ["fulvo", "intenso", "crepuscular"],
      escuro: ["enferrujado", "soturno-dourado", "tépido"],
    },
  },
  {
    cor: "verde",
    tons: {
      claro: ["primaveril", "renascente", "suavejante"],
      medioClaro: ["fresco", "frondoso", "viçoso"],
      medio: ["vigoroso", "fértil", "campestre"],
      medioEscuro: ["selvático", "musgoso", "profundamente natural"],
      escuro: ["esmeraldino", "sombrio", "denso"],
    },
  },
  {
    cor: "azul",
    tons: {
      claro: ["celeste", "etéreo", "tranquilo"],
      medioClaro: ["brando", "oceânico", "reluzente"],
      medio: ["sereno", "profundo", "vítreo"],
      medioEscuro: ["abissal", "tempestuoso", "obscurecido"],
      escuro: ["noctiluz", "marinho", "sideral"],
    },
  },
  {
    cor: "anil",
    tons: {
      claro: ["nebuloso", "místico", "delicado"],
      medioClaro: ["íris", "brilhante", "celestino"],
      medio: ["enigmático", "cósmico", "fascinante"],
      medioEscuro: ["arcano", "insinuante", "encantado"],
      escuro: ["oculto", "introspectivo", "misterioso"],
    },
  },
  {
    cor: "violeta",
    tons: {
      claro: ["liláceo", "sonhador", "etéreo"],
      medioClaro: ["romântico", "intuitivo", "delirante"],
      medio: ["transcendente", "magnético", "profundamente lírico"],
      medioEscuro: ["oculto", "hipnótico", "crepuscular"],
      escuro: ["místico", "feérico", "absorto"],
    },
  },
  {
    cor: "preto",
    tons: {
      claro: ["acinzentado", "nebuloso", "melancólico"],
      medioClaro: ["soturno", "brumoso", "velado"],
      medio: ["denso", "sério", "introspectivo"],
      medioEscuro: ["obscuro", "profundo", "abismal"],
      escuro: ["tenebroso", "sombrio", "absoluto"],
    },
  },
  {
    cor: "branco",
    tons: {
      claro: ["alvo", "límpido", "etéreo"],
      medioClaro: ["nacarado", "neveado", "suave"],
      medio: ["nebulado", "opalescente", "pacífico"],
      medioEscuro: ["embaçado", "frio", "pálido"],
      escuro: ["gizento", "marmóreo", "fantasmático"],
    },
  },
];

// --- FUNÇÕES AUXILIARES ---

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s: number,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

function categorizarCor(
  h: number,
  s: number,
  l: number
): { cor: CorPoetica["cor"]; tom: Tonalidade } {
  let tom: Tonalidade;
  if (l > 0.85) tom = "claro";
  else if (l > 0.65) tom = "medioClaro";
  else if (l > 0.4) tom = "medio";
  else if (l > 0.2) tom = "medioEscuro";
  else tom = "escuro";

  if (s < 0.1) {
    if (l > 0.9) return { cor: "branco", tom };
    if (l < 0.1) return { cor: "preto", tom };
    return l > 0.5 ? { cor: "branco", tom } : { cor: "preto", tom };
  }

  let cor: CorPoetica["cor"];
  if (h >= 340 || h < 15) cor = "vermelho";
  else if (h < 40) cor = "laranja";
  else if (h < 70) cor = "amarelo";
  else if (h < 160) cor = "verde";
  else if (h < 250) cor = "azul";
  else if (h < 280) cor = "anil";
  else cor = "violeta";

  return { cor, tom };
}

// --- FUNÇÃO PRINCIPAL ---

/**
 * Recebe um array de 5 cores hexadecimais e retorna um array de 5 palavras poéticas ÚNICAS.
 * @param coresHex - Um array contendo 5 strings de cores no formato hexadecimal.
 * @returns Um array de 5 strings, cada uma sendo uma palavra poética única.
 */
export function gerarPoesiaDasCores(coresHex: string[]): string[] {
  if (coresHex.length !== 5) {
    throw new Error("A função espera um array com exatamente 5 cores.");
  }

  const palavrasUsadas = new Set<string>();
  const palavrasFinais: string[] = [];

  for (const hex of coresHex) {
    const rgb = hexToRgb(hex);
    if (!rgb) {
      palavrasFinais.push("indefinido");
      continue;
    }

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const categoria = categorizarCor(hsl.h, hsl.s, hsl.l);

    const corPoeticaObj = coresPoeticas.find((c) => c.cor === categoria.cor);
    if (!corPoeticaObj) {
      palavrasFinais.push("misterioso");
      continue;
    }

    // Tenta encontrar uma palavra única na tonalidade exata
    const palavrasDoTom = corPoeticaObj.tons[categoria.tom];
    let palavrasDisponiveis = palavrasDoTom.filter(
      (p) => !palavrasUsadas.has(p)
    );

    let palavraEscolhida: string | undefined;

    if (palavrasDisponiveis.length > 0) {
      // Se há palavras disponíveis no tom exato, escolhe uma
      palavraEscolhida =
        palavrasDisponiveis[
          Math.floor(Math.random() * palavrasDisponiveis.length)
        ];
    } else {
      // Se não há, busca em TODAS as tonalidades da mesma cor por uma palavra disponível
      const todasAsPalavrasDaCor = Object.values(corPoeticaObj.tons).flat();
      palavrasDisponiveis = todasAsPalavrasDaCor.filter(
        (p) => !palavrasUsadas.has(p)
      );

      if (palavrasDisponiveis.length > 0) {
        // Se há palavras disponíveis em outras tonalidades, escolhe uma
        palavraEscolhida =
          palavrasDisponiveis[
            Math.floor(Math.random() * palavrasDisponiveis.length)
          ];
      } else {
        // Como último recurso (caso extremamente raro), permite uma repetição para não falhar
        palavraEscolhida =
          palavrasDoTom[Math.floor(Math.random() * palavrasDoTom.length)] ||
          "inefável";
      }
    }

    palavrasUsadas.add(palavraEscolhida);
    palavrasFinais.push(palavraEscolhida);
  }

  return palavrasFinais;
}
