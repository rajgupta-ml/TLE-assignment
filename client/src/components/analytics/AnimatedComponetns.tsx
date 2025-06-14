import { AnimatedComponentProps } from "@/types/analytics";
import { FC } from "react";
import { motion } from "framer-motion";
export const AnimatedCard: FC<AnimatedComponentProps> = ({
  children,
  className = "",
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay / 1000, duration: 0.5, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);
