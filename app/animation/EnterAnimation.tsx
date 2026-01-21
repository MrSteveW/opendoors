import * as motion from 'motion/react-client';
import { ReactNode } from 'react';

type childrenType = {
  children: ReactNode;
};

const textStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center' as const,
};

export default function EnterAnimation({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1,
        x: { type: 'spring', bounce: 0.3 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
