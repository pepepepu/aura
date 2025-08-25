import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuraBG,
  AuraHeader,
  AuraInfo,
  Box,
  Dropdown,
  GrainOverlay,
  Text,
  SVG
} from "../../components";
import {
  getCoverArtFromSpotify,
  getTopTrackForPeriod,
} from "../../services/lastFMServices";
import {
  extractColorPalette,
  type ColorPaletteResult,
} from "../../utils/color_functions/extractColorPalette";
import {
  mapPaletteToMajorArcana,
  type TarotCardWithDetailsResult,
} from "../../utils/data_library/tarot";
import { themes } from "../../styles/themes";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import Aura from "../../assets/svg/aura.svg?react"

const magicGlow = keyframes`
  0% { opacity: 0.8; transform: scale(1.0); }
  50% { opacity: 1; transform: scale(1.5); }
  100% { opacity: 0.8; transform: scale(1.0); }
`;

const CardWrapper = styled(Box) <{ glowColor: string }>`
  position: relative;
  cursor: pointer;
  perspective: 1000px;

  &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    width: calc(100% + 30px);
    height: calc(100% + 30px);
    background: radial-gradient(
      circle,
      ${({ glowColor }) => `${glowColor}`} 0%,
      transparent 70%
    );
    filter: blur(50px);
    z-index: -1;
    animation: ${magicGlow} 5s infinite ease-in-out;
  }
`;

const cardFaceStyles: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Tarot: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tarotCard, setTarotCard] = useState<TarotCardWithDetailsResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isRevealed, setIsRevealed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [albumPalette, setAlbumPalette] = useState<ColorPaletteResult | null>(
    null
  );
  const [showInitialText, setShowInitialText] = useState(true);

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleOpenInfo = () => setIsInfoOpen(true);
  const handleCloseInfo = () => setIsInfoOpen(false);

  const handleLogout = () => {
    window.localStorage.removeItem("lastfm_session_key");
    window.localStorage.removeItem("lastfm_username");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchTopTrack = async () => {
      setIsLoading(true);

      try {
        const track = await getTopTrackForPeriod("7day");

        if (track) {
          const imageUrl = await getCoverArtFromSpotify(
            track.name,
            track.artists[0].name
          );

          if (imageUrl) {
            const palette = await extractColorPalette(imageUrl);
            setAlbumPalette(palette);
            if (palette) {
              const cardData = mapPaletteToMajorArcana(palette);
              setTarotCard(cardData);
            }
          }
        }
      } catch (err) {
        console.error("Erro ao buscar top track em MinhaAura:", err);

        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTrack();
  }, []);

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const currentTheme = themes[currentThemeIndex];

  const backgroundColor = albumPalette
    ? albumPalette.background
    : currentTheme.backgroundColor;

  const textColor = albumPalette ? albumPalette.text : "#000";

  const handleReveal = () => {
    if (!isRevealed) {
      setShowInitialText(false);
      setIsRevealed(true);
    }
  };

  return (
    <Box
      $width={"100dvw"}
      $height={"100dvh"}
      $background={backgroundColor}
      $justifyContent={"center"}
      $padding={"10vh 0px 0px 0px"}
      $overflow="hidden"
    >
      <AuraHeader
        title="Seu Tarot Musical"
        textColor={textColor}
        onMenuClick={toggleMenu}
        onHelpClick={handleOpenInfo}
      />
      <Dropdown
        textColor={textColor}
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="Tarot"
      />

      {isInfoOpen && <AuraInfo onClose={handleCloseInfo} textColor={textColor} />}

      {isLoading ? (
        <Box>
          <Text $color={textColor} $fontFamily={"Instrument Serif"}>
            Consultando os arcanos da sua alma...
          </Text>
        </Box>
      ) : tarotCard ? (
        <Box
          $width={"100%"}
          $height={"100%"}
          $flexDirection={{ base: "column", lg: "row" }}
          $gap={{ base: "10px", lg: "40px" }}
          $alignItems="center"
          $justifyContent="center"
        >
          <CardWrapper glowColor={textColor} onClick={handleReveal}>
            <motion.div
              style={{
                width: "210px",
                height: "315px",
                position: "relative",
                transformStyle: "preserve-3d",
              }}
              animate={{ rotateY: isRevealed ? 180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onAnimationComplete={() => {
                if (isRevealed) {
                  setShowDescription(true);
                }
              }}
            >
              <motion.div
                style={{ ...cardFaceStyles, transform: "rotateY(0deg)" }}
              >
                <Box
                  $border={`2px solid ${textColor}`}
                  $background={textColor}
                  $height={"100%"}
                  $width={"100%"}
                  $padding={"10px"}
                >
                  <GrainOverlay opacity={0.3} />
                  <Box
                    $width={"100%"}
                    $height={"100%"}
                    $border={`1px solid ${backgroundColor}`}
                    $overflow={"hidden"}
                  >
                    <SVG $width="200px" $color={backgroundColor}>
                      <Aura />
                    </SVG>
                  </Box>
                </Box>
              </motion.div>
              <motion.div
                style={{
                  ...cardFaceStyles,
                  transform: "rotateY(180deg) translateZ(1px)",
                }}
              >
                <Box
                  $border={`2px solid ${textColor}`}
                  $height={"100%"}
                  $width={"100%"}
                >
                  <AuraBG
                    width={"100%"}
                    height={"100%"}
                    colors={tarotCard.colorPalette.slice(1)}
                    backgroundColor={tarotCard.colorPalette[0]}
                    interactive={false}
                    grainy={true}
                  >
                    <Box
                      $width={"100%"}
                      $height={"100%"}
                      $justifyContent={"space-between"}
                    >
                      <Box $width={"100%"} $padding={"20px"}>
                        <Text
                          $color={textColor}
                          $fontSize="1.1rem"
                          $fontFamily={"Instrument Serif"}
                        >
                          {tarotCard.number}
                        </Text>
                      </Box>
                      <Box
                        $width={"100%"}
                        $padding={"10px"}
                        $background={textColor}
                      >
                        <GrainOverlay opacity={0.3} />
                        <Text
                          $color={backgroundColor}
                          $fontSize="1rem"
                          $fontFamily={"Instrument Serif"}
                          $fontStyle={"italic"}
                          $fontWeight={"800"}
                        >
                          {tarotCard.card_en}
                        </Text>
                      </Box>
                    </Box>
                  </AuraBG>
                </Box>
              </motion.div>
            </motion.div>
          </CardWrapper>
          <Box
            $padding={"10px"}
            $width={{ base: "70%", lg: "30%" }}
            $gap={"5px"}
            $alignItems={{ base: "center", lg: "flex-start" }}
            $justifyContent={"flex-start"}
            $height="150px"
          >
            <AnimatePresence>
              {showInitialText && (
                <motion.div
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Text
                    $color={textColor}
                    $fontSize={"1rem"}
                    $fontFamily={"Instrument Serif"}
                    $fontStyle={"italic"}
                    $textAlign={"center"}
                  >
                    Sua carta aguarda. Toque para revelar seu destino.
                  </Text>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showDescription && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    alignItems: "inherit",
                  }}
                >
                  <Text
                    $color={textColor}
                    $fontSize={"2.5rem"}
                    $fontFamily={"Instrument Serif"}
                    $lineHeight={"1"}
                  >
                    {tarotCard.card}
                  </Text>
                  <Text
                    $color={textColor}
                    $fontSize={"1rem"}
                    $fontFamily={"Instrument Serif"}
                    $textAlign={{ base: "center", lg: "left" }}
                    $lineHeight={"1.3"}
                  >
                    {tarotCard.meaning}
                  </Text>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      ) : (
        <Box $width={"70%"}>
          <Text
            $color={textColor}
            $fontSize="1.1rem"
            $fontFamily={"Instrument Serif"}
            $textAlign={"center"}
          >
            Não foi possível gerar sua carta. Tente ouvir mais músicas para
            definir sua aura.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Tarot;
