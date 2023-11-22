import { AnimatePresence, motion } from 'framer-motion';

const AnimationWrapper = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 0.5 },
  className,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        key={keyValue}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
