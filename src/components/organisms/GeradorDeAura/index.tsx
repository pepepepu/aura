import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { AuraBG, Box } from "../..";
import type { ColorPaletteResult } from "../../../utils/color_functions/extractColorPalette";

interface GeradorDeImagemAuraProps {
  trackName: string;
  artistName: string;
  palette: ColorPaletteResult;
  poeticWords: string[];
}

const GeradorDeImagemAura: React.FC<GeradorDeImagemAuraProps> = ({
  trackName,
  artistName,
  palette,
  poeticWords,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
    });

    const data = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = data;
    link.download = `minha-aura-${trackName
      .toLowerCase()
      .replace(/ /g, "-")}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Box $position="fixed" $bottom="30px" $right="30px" $zIndex={5}>
        <button
          onClick={handleDownloadImage}
          style={{
            background: palette.text,
            color: palette.background,
            border: "none",
            borderRadius: "50px",
            padding: "12px 20px",
            fontFamily: "Instrument Serif, serif",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          Baixar Aura
        </button>
      </Box>

      <div
        ref={printRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "1080px",
          height: "1920px",
          overflow: "hidden",
        }}
      >
        <AuraBG
          width={"100%"}
          height={"100%"}
          colors={palette.auraColors}
          backgroundColor={palette.background}
          interactive={false}
          grainy={true}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "80px",
              boxSizing: "border-box",
              color: palette.text,
              fontFamily: "Instrument Serif, serif",
            }}
          >
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <h1
                style={{
                  fontSize: "120px",
                  margin: 0,
                  lineHeight: 1.1,
                  textTransform: "capitalize",
                }}
              >
                {poeticWords[0]}
              </h1>
              <p
                style={{
                  fontSize: "45px",
                  margin: 0,
                  opacity: 0.9,
                  fontStyle: "italic",
                }}
              >
                {poeticWords.slice(1, 5).join(" • ")}
              </p>
            </div>
            <div style={{ opacity: 0.8, fontSize: "36px" }}>
              <p style={{ margin: 0 }}>{trackName}</p>
              <p style={{ margin: "5px 0 0", fontStyle: "italic" }}>
                {artistName}
              </p>
            </div>
          </div>
        </AuraBG>
      </div>
    </>
  );
};

export default GeradorDeImagemAura;
