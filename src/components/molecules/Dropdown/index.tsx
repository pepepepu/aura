import { AnimatePresence, motion, type Variants } from "framer-motion";
import React, { useMemo } from "react";
import { Box, Button, Text } from "../.."; // Seus componentes de UI
import { useNavigate } from "react-router-dom";

interface MenuOption {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: string;
}

// --- Variantes de Animação Otimizadas ---

// NOVO: As variantes do backdrop agora também animam o 'backdropFilter'
const backdropVariants: Variants = {
  visible: {
    opacity: 1,
    backdropFilter: "blur(10px)",
  },
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
};

const menuContainerVariants: Variants = {
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItemVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.3 },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: { ease: "easeIn", duration: 0.2 },
  },
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  onClose,
  currentScreen,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("spotify_token");
    navigate("/");
  };

  const allOptions = useMemo<MenuOption[]>(
    () => [
      { label: "Tocando agora", onClick: () => navigate("/dashboard") },
      { label: "Minha aura", onClick: () => navigate("/minhaAura") },
      { label: "Energia da semana", onClick: () => navigate("/auraSemanal") },
      { label: "Synesthetic", onClick: () => {}, disabled: true },
      { label: "Sair", onClick: handleLogout },
    ],
    [navigate]
  );

  const filteredOptions = allOptions.filter(
    (option) => option.label !== currentScreen
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // O container principal agora controla a animação do fundo e do blur
          key="menu-wrapper"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 10,
            background: "rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            willChange: "opacity, backdrop-filter", // Dica de otimização
          }}
        >
          <Box
            $width={"90%"}
            $padding={"70px 0px 0px 38px"}
            $alignItems={"flex-start"}
          >
            {/* O botão de fechar agora é parte do container de conteúdo animado */}
            <motion.div variants={menuItemVariants}>
              <Button onClick={onClose}>
                <Text
                  fontFamily={"Instrument Serif"}
                  fontSize={"1.5rem"}
                  color={"#dddcdc"}
                >
                  X
                </Text>
              </Button>
            </motion.div>
          </Box>

          <motion.div
            variants={menuContainerVariants}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {filteredOptions.map((option) => (
              <motion.div
                key={option.label}
                variants={menuItemVariants}
                style={{ willChange: "transform, opacity" }}
              >
                <Button
                  onClick={() => {
                    if (!option.disabled) {
                      option.onClick();
                      onClose();
                    }
                  }}
                  $background="transparent"
                  $border="none"
                  disabled={option.disabled}
                  style={{
                    cursor: option.disabled ? "not-allowed" : "pointer",
                  }}
                >
                  <Text
                    fontFamily={"Instrument Serif"}
                    fontSize={"2rem"}
                    color={option.disabled ? "#dddcdc6e" : "#dddcdc"}
                  >
                    {option.label}
                  </Text>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <Box $width={"100%"} $padding={"150px 0px 0px 0px"} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
