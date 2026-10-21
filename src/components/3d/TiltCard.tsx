import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  style = {},
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef<number | null>(null);

  // Disable tilt on touch devices or reduced motion
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      setIsInteractive(false);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = (mouseX / width - 0.5) * 2; // -1 to 1
      const yPct = (mouseY / height - 0.5) * 2; // -1 to 1

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const rotX = -yPct * maxTilt;
        const rotY = xPct * maxTilt;

        setTransformStyle(
          `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
        );

        if (glare) {
          setGlarePos({
            x: (mouseX / width) * 100,
            y: (mouseY / height) * 100,
            opacity: 0.35,
          });
        }
      });
    },
    [isInteractive, maxTilt, perspective, scale, glare]
  );

  const handleMouseEnter = () => {
    if (!isInteractive) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isInteractive) return;
    setIsHovered(false);
    if (rafId.current) cancelAnimationFrame(rafId.current);

    setTransformStyle(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative preserve-3d transition-transform ${
        isHovered ? 'duration-100 ease-out z-20' : 'duration-500 ease-out'
      } ${className}`}
      style={{
        transform: transformStyle,
        ...style,
      }}
      {...rest}
    >
      {children}

      {/* Dynamic Specular 3D Glare */}
      {glare && isInteractive && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, rgba(255, 255, 255, 0) 65%)`,
            opacity: glarePos.opacity > 0 ? 1 : 0,
            zIndex: 30,
          }}
        />
      )}
    </div>
  );
};
