import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion } from 'motion/react';

interface InteractiveTiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  maxTiltDeg?: number;
  variant?: 'color' | 'glass' | 'plaque' | 'sand' | 'paper' | 'espresso';
}

export default function InteractiveTiltCard({
  children,
  className = '',
  onClick,
  maxTiltDeg = 2.5,
  variant = 'paper',
}: InteractiveTiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = x / rect.width;
    const pctY = y / rect.height;

    const rotateY = (pctX - 0.5) * (maxTiltDeg * 2);
    const rotateX = (0.5 - pctY) * (maxTiltDeg * 2);

    setTilt({
      rotateX,
      rotateY,
      glowX: pctX * 100,
      glowY: pctY * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, isHovered: false });
  };

  const baseStyles =
    variant === 'glass'
      ? 'liquid-glass liquid-glass-interactive rounded-[1.75rem]'
      : variant === 'sand'
        ? 'linea-card-sand transition-all duration-300'
        : variant === 'espresso' || variant === 'color'
          ? 'linea-card-espresso transition-all duration-300'
          : 'linea-card-paper transition-all duration-300';

  const spotlightColor =
    variant === 'espresso' || variant === 'color' || variant === 'glass'
      ? `radial-gradient(440px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(51,204,122,0.14), rgba(250,245,240,0.06) 45%, transparent 70%)`
      : `radial-gradient(400px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(51,204,122,0.12), rgba(27,20,17,0.04) 45%, transparent 70%)`;

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.isHovered ? 1.01 : 1,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.6 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative overflow-hidden ${baseStyles} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: tilt.isHovered ? 1 : 0,
          background: spotlightColor,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </motion.div>
  );
}
