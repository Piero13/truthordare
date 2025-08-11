// src/animations/motionPresets.js
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export const scaleTap = {
  whileTap: { scale: 0.96 },
  transition: { duration: 0.1 }
};

export const glowHover = {
  whileHover: { 
    scale: 1.03,
    boxShadow: "0px 0px 20px rgba(241, 121, 177, 0.6)"
  },
  transition: { duration: 0.15 }
};

export const slideFromBottom = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const modalZoom = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } }
};
