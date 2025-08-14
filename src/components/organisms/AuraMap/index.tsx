import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Adicionar fatorX e fatorY à interface de props.
interface ConstelacaoMusicalProps {
  estiloMusical: string;
  corBase: string;
  corTraco: string;
  corGlow: string;
  fatorX: number;
  fatorY: number;
}

type Ponto = { x: number; y: number };

const gerarHashNumerico = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

// 2. Modificar a função para receber fatorX e fatorY e remover o 'switch'.
const gerarCoordenadas = (
  estilo: string,
  cor: string,
  largura: number,
  altura: number,
  fatorX: number, // Recebe como parâmetro
  fatorY: number // Recebe como parâmetro
): Ponto[] => {
  if (largura === 0 || altura === 0) return [];

  const pontos: Ponto[] = [];
  const hashEstilo = gerarHashNumerico(estilo);
  const hashCor = gerarHashNumerico(cor);

  // O bloco 'switch' foi removido daqui.

  for (let i = 0; i < 7; i++) {
    const seed = hashEstilo + hashCor + i * 37;
    // Usa os fatores passados por parâmetro diretamente.
    const x = (Math.sin(seed * fatorX) * 0.4 + 0.5) * largura;
    const y = (Math.cos(seed * fatorY) * 0.4 + 0.5) * altura;
    pontos.push({
      x: Math.max(20, Math.min(largura - 20, x)),
      y: Math.max(20, Math.min(altura - 20, y)),
    });
  }

  return pontos;
};

// 3. Atualizar o componente para aceitar e usar as novas props.
const ConstelacaoMusical: React.FC<ConstelacaoMusicalProps> = ({
  estiloMusical,
  corBase,
  corTraco,
  corGlow,
  fatorX = 1.0, // Adiciona um valor padrão para segurança
  fatorY = 1.0, // Adiciona um valor padrão para segurança
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [visiblePoints, setVisiblePoints] = useState(0);
  const [showLines, setShowLines] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const pontos = useMemo(
    () =>
      gerarCoordenadas(
        estiloMusical,
        corBase,
        dimensions.width,
        dimensions.height,
        fatorX, // Passa o fatorX para a função
        fatorY // Passa o fatorY para a função
      ),
    // 4. Adicionar fatorX e fatorY ao array de dependências do useMemo.
    [
      estiloMusical,
      corBase,
      dimensions.width,
      dimensions.height,
      fatorX,
      fatorY,
    ]
  );

  const STAGGER_DELAY = 500;
  const DURACAO_TRACADO = 2;

  useEffect(() => {
    if (pontos.length === 0) return;

    setVisiblePoints(0);
    setShowLines(false);

    pontos.forEach((_, i) => {
      setTimeout(() => {
        setVisiblePoints((prev) => prev + 1);
      }, i * STAGGER_DELAY);
    });

    setTimeout(() => {
      setShowLines(true);
    }, pontos.length * STAGGER_DELAY);
  }, [pontos]);

  const pathData = pontos
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  // ... (resto do código do componente permanece o mesmo)
  const pontoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 50 },
    },
  } as const;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      aria-label={`Constelação para o estilo ${estiloMusical}`}
    >
      {dimensions.width > 0 && (
        <svg
          width={dimensions.width}
          height={dimensions.height}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {showLines && (
            <>
              <motion.path
                d={pathData}
                fill="none"
                stroke={corGlow}
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: DURACAO_TRACADO,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d={pathData}
                fill="none"
                stroke={corTraco}
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: DURACAO_TRACADO,
                  ease: "easeInOut",
                }}
              />
            </>
          )}
        </svg>
      )}
      <AnimatePresence>
        {pontos.slice(0, visiblePoints).map((ponto, index) => (
          <motion.div
            key={`${estiloMusical}-${corBase}-${index}`}
            variants={pontoVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              position: "absolute",
              top: ponto.y,
              left: ponto.x,
              x: "-50%",
              y: "-50%",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: corTraco,
              }}
            />
            <span
              style={{
                color: corTraco,
                position: "absolute",
                top: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "12px",
                fontWeight: "bold",
                fontFamily: "Instrument Serif",
              }}
            >
              {index + 1}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ConstelacaoMusical;
