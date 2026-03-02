import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

const AnimatedText = ({ words, className = "" }: AnimatedTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={`inline-block relative ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={word}
          className="absolute left-0 text-gradient-gold"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : -20,
            filter: index === currentIndex ? "blur(0px)" : "blur(4px)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
      {/* Invisible word for width */}
      <span className="invisible">{words.reduce((a, b) => (a.length > b.length ? a : b))}</span>
    </span>
  );
};

export default AnimatedText;
