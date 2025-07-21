import React, { useRef, useEffect } from "react";

interface AnimatedBlobsProps {
  backgroundColor?: string;
  color1?: string;
  color2?: string;
  className?: string;
  grainy?: boolean;
}

interface Blob {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  numPoints: number;
  angle: number;
  radiusStep: number;
}

const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const createBlob = (
  canvasWidth: number,
  canvasHeight: number,
  color: string
): Blob => {
  return {
    x: random(0, canvasWidth),
    y: random(0, canvasHeight),
    r: random(50, 75),
    vx: random(-0.3, 0.3),
    vy: random(-0.3, 0.3),
    color: color,
    numPoints: random(4, 8),
    angle: random(0, Math.PI * 2),
    radiusStep: random(0.01, 0.03),
  };
};

const AnimatedBlobs: React.FC<AnimatedBlobsProps> = ({
  backgroundColor = "#1e1e1e",
  color1 = "#ff4b2b",
  color2 = "#00c6ff",
  className = "",
  grainy = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const { width, height } = canvas.getBoundingClientRect();

    const allBlobs = Array.from({ length: 2 }, () =>
      createBlob(width, height, color1)
    ).concat(
      Array.from({ length: 3 }, () => createBlob(width, height, color2))
    );

    const update = () => {
      allBlobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x - blob.r < 0 || blob.x + blob.r > width) blob.vx *= -1;
        if (blob.y - blob.r < 0 || blob.y + blob.r > height) blob.vy *= -1;

        blob.angle += blob.radiusStep;
      });
    };

    const drawOrganicShape = (blob: Blob) => {
      ctx.fillStyle = blob.color;
      ctx.beginPath();

      const angleStep = (Math.PI * 2) / blob.numPoints;
      const points = [];
      for (let i = 0; i < blob.numPoints; i++) {
        const currentAngle = i * angleStep;
        const radius =
          blob.r + Math.sin(blob.angle + currentAngle) * (blob.r / 3);
        points.push({
          x: blob.x + Math.cos(currentAngle) * radius,
          y: blob.y + Math.sin(currentAngle) * radius,
        });
      }

      ctx.moveTo(
        (points[0].x + points[points.length - 1].x) / 2,
        (points[0].y + points[points.length - 1].y) / 2
      );

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        const midPoint = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      }

      ctx.closePath();
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      allBlobs.forEach(drawOrganicShape);
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

  const grainOverlayStyles: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    pointerEvents: "none",
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
    opacity: 0.25,
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor,
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          filter: "blur(15px) contrast(1)",
        }}
      />
      {grainy && <div style={grainOverlayStyles} />}
    </div>
  );
};

export default AnimatedBlobs;
