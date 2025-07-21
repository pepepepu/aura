import styled from "styled-components";

interface GrainOverlayProps {
  opacity?: number;
}

const GrainOverlay = styled.div<GrainOverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>');
  opacity: ${({ opacity }) => opacity || 0.25};
`;

export default GrainOverlay;
