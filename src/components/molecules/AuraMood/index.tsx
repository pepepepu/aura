import React, { useRef, useEffect } from "react";
import type { AuraMoodColors } from "../../../utils/data_library/auraMoodExtractor";
import GrainOverlay from "../GrainOverlay";

interface AuraMoodProps {
  colors: AuraMoodColors | null;
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

const random = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const createBlob = (
  canvasWidth: number,
  canvasHeight: number,
  color: string
): Blob => ({
  x: random(canvasWidth * 0.2, canvasWidth * 0.8),
  y: random(canvasHeight * 0.2, canvasHeight * 0.8),
  r: random(canvasWidth / 4, canvasWidth / 3),
  vx: random(-0.5, 0.5),
  vy: random(-0.5, 0.5),
  color: color,
  numPoints: random(5, 10),
  angle: random(0, Math.PI * 2),
  radiusStep: random(0.005, 0.01),
});

const AuraMood: React.FC<AuraMoodProps> = ({ colors }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!colors) return;

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

    const colorArray = [
      colors.intermediate,
      colors.vibrant,
      colors.primary,
      colors.predominant,
    ];
    const allBlobs = colorArray.map((color) =>
      createBlob(width, height, color)
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
          blob.r + Math.sin(blob.angle + currentAngle) * (blob.r / 4);
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
  }, [colors]);

  if (!colors) {
    return (
      <div
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "#333",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          filter: "blur(40px) contrast(10)",
          transform: "scale(1.2)",
        }}
      />
      <GrainOverlay />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          boxShadow: "inset 0 0 2px 1px rgba(255, 255, 255, 0.4)",
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3), rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.2) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default AuraMood;
