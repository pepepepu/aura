import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationControls,
  type SpringOptions,
} from "motion/react";
import { Box } from "../..";

type Size = string | number;

interface AuraBackgroundProps {
  width?: Size;
  height?: Size;
  children?: React.ReactNode;
  colors?: string[];
  interactive?: boolean;
  transition?: SpringOptions;
  backgroundColor?: string;
  animationSpeed?: number;
  grainy?: boolean;

  isTransitioning?: boolean;
  onTransitionComplete?: () => void;
  transitionShapeIndex?: number;
}

interface WanderingShapeProps {
  initialStyle: React.CSSProperties;
  color: string;
  speed: number;

  isExpanding: boolean;
  isFadingOut: boolean;
  onExpandComplete?: () => void;
}

const AuraWrapper = styled(Box)`
  position: relative;
  overflow: hidden;
`;

const Shape = styled(motion.div)`
  position: absolute;
  mix-blend-mode: hard-light;
  opacity: 1;
  filter: blur(80px) contrast(2) saturate(2);
  transform: translateZ(0);
  will-change: transform, border-radius, filter;
`;

const GrainOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>');
  opacity: 0.15;
`;

const ContentWrapper = styled(Box)`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: transparent;
`;

const WanderingShape: React.FC<WanderingShapeProps> = ({
  initialStyle,
  color,
  speed,
  isExpanding,
  isFadingOut,
  onExpandComplete,
}) => {
  const controls = useAnimationControls();

  useEffect(() => {
    const getRandomValue = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const getRandomBorderRadius = () => {
      const a = getRandomValue(20, 80);
      const b = getRandomValue(20, 80);
      const c = getRandomValue(20, 80);
      const d = getRandomValue(20, 80);
      return `${a}% ${100 - a}% ${b}% ${100 - b}% / ${c}% ${d}% ${100 - c}% ${
        100 - d
      }%`;
    };
    const wander = async () => {
      await controls.start({
        x: `${getRandomValue(-100, 100)}%`,
        y: `${getRandomValue(-100, 100)}%`,
        rotate: getRandomValue(0, 360),
        scale: getRandomValue(0.8, 1.5),
        borderRadius: getRandomBorderRadius(),
        transition: {
          duration: getRandomValue(8, 15) / speed,
          ease: "easeInOut",
        },
      });
      wander();
    };
    if (isExpanding) {
      controls.stop();
      controls
        .start({
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          width: "250vw",
          height: "250vh",
          filter: "blur(60px) contrast(2) saturate(2)",
          borderRadius: "50%",
          transition: { duration: 1.2, ease: "easeInOut" },
        })
        .then(() => {
          if (onExpandComplete) onExpandComplete();
        });
    } else if (isFadingOut) {
      controls.stop();
      controls.start({ opacity: 0, transition: { duration: 0.5 } });
    } else {
      wander();
    }
  }, [controls, speed, isExpanding, isFadingOut, onExpandComplete]);

  const createGradient = (c: string) =>
    `radial-gradient(circle at center, ${c} 0%, transparent 60%)`;

  return (
    <Shape
      animate={controls}
      style={{ ...initialStyle, background: createGradient(color) }}
    />
  );
};

const AuraBackground: React.FC<AuraBackgroundProps> = ({
  width = "100%",
  height = "100%",
  children,
  colors = ["#ff6b6b", "#f06595", "#cc5de8", "#845ef7", "#5c7cfa", "#339af0"],
  interactive = true,
  transition = { stiffness: 100, damping: 20 },
  backgroundColor = "#000010",
  animationSpeed = 1,
  grainy = true,
  isTransitioning = false,
  onTransitionComplete,
  transitionShapeIndex = 4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);

  useEffect(() => {
    if (!interactive || !containerRef.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    const currentContainer = containerRef.current;
    currentContainer.addEventListener("mousemove", handleMouseMove);
    return () =>
      currentContainer.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  const speed = Math.max(0.1, animationSpeed);

  const initialShapes = [
    { width: "120%", height: "40%", top: "10%", left: "-10%" },
    { width: "50%", height: "100%", top: "-5%", right: "10%" },
    { width: "50%", height: "50%", top: "25%", left: "60%" },
    { width: "100%", height: "60%", bottom: "5%", left: "5%" },
    {
      width: "65%",
      height: "65%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  ];

  return (
    <AuraWrapper
      ref={containerRef}
      $width={width}
      $height={height}
      $background={backgroundColor}
    >
      {initialShapes.map((style, index) => {
        const isExpandingShape = index === transitionShapeIndex;

        return (
          <WanderingShape
            key={index}
            initialStyle={style}
            color={colors[index % colors.length]}
            speed={speed}
            isExpanding={isTransitioning && isExpandingShape}
            isFadingOut={isTransitioning && !isExpandingShape}
            onExpandComplete={onTransitionComplete}
          />
        );
      })}
      {interactive && !isTransitioning && (
        <Shape
          style={{
            background: `radial-gradient(circle at center, ${
              colors[5 % colors.length]
            } 0%, transparent 60%)`,
            width: "80%",
            height: "80%",
            x: springX,
            y: springY,
          }}
        />
      )}

      {grainy && <GrainOverlay />}

      <ContentWrapper>{children}</ContentWrapper>
    </AuraWrapper>
  );
};

export default AuraBackground;
