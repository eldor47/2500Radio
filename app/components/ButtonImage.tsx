"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./ButtonImage.module.css"; // Assuming you use CSS Modules or styled-components

interface ButtonImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick?: () => void; // Optional onClick handler,
  disabled?: boolean;
}

const ButtonImage: React.FC<ButtonImageProps> = ({
  src,
  alt,
  width,
  height,
  onClick,
}) => {
  return (
    <motion.button
      className={styles.buttonImage}
      whileTap={{ scale: 0.95 }} // Scale down on click
      whileHover={{ scale: 1.05 }} // Slightly scale up on hover
      initial={{ scale: 1 }}
      onClick={onClick} // Optional click handler
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </motion.button>
  );
};

export default ButtonImage;
