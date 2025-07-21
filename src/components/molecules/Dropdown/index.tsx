import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Box, Button, Text } from '../..';

interface MenuOption {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuOptions: MenuOption[];
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const menuContainerVariants = {
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const menuItemVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose, menuOptions }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // Backdrop
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
          style={{
            position: 'absolute',
            flexDirection: 'column',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#00000030',
            backdropFilter: 'blur(10px)',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box $width={"90%"} $padding={"70px 0px 0px 38px"} $alignItems={"flex-start"}>
            <Button onClick={onClose}>
              <Text fontFamily={"Instrument Serif"} fontSize={"1.5rem"} color={"#dddcdc"}>X</Text>
            </Button>
          </Box>
          <motion.div
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            {menuOptions.map((option) => (
              <motion.div key={option.label} variants={menuItemVariants}>
                <Button
                  onClick={() => {
                    if (option.onClick) {
                      option.onClick();
                    }
                    onClose();
                  }}
                  $background="transparent"
                  $border="none"
                  disabled={option.disabled}
                >
                  <Text fontFamily={"Instrument Serif"} fontSize={"2rem"} color={option.disabled ? "#dddcdc6e" : "#dddcdc"}>
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