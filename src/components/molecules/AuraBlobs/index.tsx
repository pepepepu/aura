// src/components/AnimatedBlobs.tsx

import React, { useRef, useEffect } from 'react';

// --- Interfaces e Tipos ---
interface AnimatedBlobsProps {
  backgroundColor?: string;
  color1?: string;
  color2?: string;
  className?: string;
  grainy?: boolean; // Adicionada a prop para controlar a granulação
}

// AJUSTE: A interface agora inclui propriedades para a ondulação da forma
interface Blob {
  x: number;
  y: number;
  r: number; // Raio base
  vx: number; // Velocidade no eixo X
  vy: number; // Velocidade no eixo Y
  color: string;
  // Propriedades para a forma orgânica
  numPoints: number; // Quantidade de "pontas" na forma
  angle: number; // Ângulo inicial da ondulação
  radiusStep: number; // Quão rápido a forma ondula
}

// --- Funções Auxiliares ---

const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// AJUSTE: createBlob agora inicializa as propriedades da forma
const createBlob = (canvasWidth: number, canvasHeight: number, color: string): Blob => {
  return {
    x: random(0, canvasWidth),
    y: random(0, canvasHeight),
    // AJUSTE: Raios menores para caber em espaços pequenos
    r: random(50, 75),
    vx: random(-0.3, 0.3),
    vy: random(-0.3, 0.3),
    color: color,
    numPoints: random(4, 8),
    angle: random(0, Math.PI * 2),
    radiusStep: random(0.01, 0.03),
  };
};

// --- Componente React ---

const AnimatedBlobs: React.FC<AnimatedBlobsProps> = ({
  backgroundColor = '#1e1e1e',
  color1 = '#ff4b2b',
  color2 = '#00c6ff',
  className = '',
  grainy = true, // Valor padrão para a granulação
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const { width, height } = canvas.getBoundingClientRect();

    // Usando a contagem de bolhas que você definiu
    const allBlobs = Array.from({ length: 2 }, () => createBlob(width, height, color1))
      .concat(Array.from({ length: 3 }, () => createBlob(width, height, color2)));

    const update = () => {
      allBlobs.forEach((blob) => {
        // Move a bolha
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Inverte a direção se atingir as bordas
        if (blob.x - blob.r < 0 || blob.x + blob.r > width) blob.vx *= -1;
        if (blob.y - blob.r < 0 || blob.y + blob.r > height) blob.vy *= -1;

        // AJUSTE: Faz a forma da bolha ondular com o tempo
        blob.angle += blob.radiusStep;
      });
    };

    // AJUSTE PRINCIPAL: Função que desenha uma forma orgânica em vez de um círculo
    const drawOrganicShape = (blob: Blob) => {
      ctx.fillStyle = blob.color;
      ctx.beginPath();

      const angleStep = (Math.PI * 2) / blob.numPoints;

      // Calcula os pontos da forma
      const points = [];
      for (let i = 0; i < blob.numPoints; i++) {
        const currentAngle = i * angleStep;
        // AJUSTE: Aumentei a variação do raio para criar formas mais irregulares
        const radius = blob.r + Math.sin(blob.angle + currentAngle) * (blob.r / 3);
        points.push({
          x: blob.x + Math.cos(currentAngle) * radius,
          y: blob.y + Math.sin(currentAngle) * radius,
        });
      }

      // Move para o ponto médio entre o último e o primeiro ponto
      ctx.moveTo((points[0].x + points[points.length - 1].x) / 2, (points[0].y + points[points.length - 1].y) / 2);

      // Desenha curvas quadráticas entre os pontos para suavizar
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length]; // O próximo ponto, voltando ao início
        const midPoint = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      }

      ctx.closePath();
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenha o fundo
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // AJUSTE: Valores de blur e contrast adaptados para os novos tamanhos
      ctx.filter = 'blur(25px) contrast(1)';

      // Desenha todas as bolhas
      allBlobs.forEach(drawOrganicShape);

      // Limpa o filtro
      ctx.filter = 'none';
    };

    const animate = () => {
      update();
      draw();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [backgroundColor, color1, color2]);

  // Estilos para o overlay de granulação
  const grainOverlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none',
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
    opacity: 0.25,
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} className={className}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
      {grainy && <div style={grainOverlayStyles} />}
    </div>
  );
};

export default AnimatedBlobs;
