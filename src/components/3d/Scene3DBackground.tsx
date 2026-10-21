import React, { useEffect, useRef } from 'react';

interface Scene3DBackgroundProps {
  className?: string;
  particleCount?: number;
  color?: string;
  interactive?: boolean;
}

export const Scene3DBackground: React.FC<Scene3DBackgroundProps> = ({
  className = '',
  particleCount = 28,
  color = 'rgba(16, 185, 129,',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    // Particles with 3D depth (x, y, z)
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * 800 + 100, // Z depth
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 1,
    }));

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const fov = 350;

        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          // Wrap around depth
          if (p.z <= 50) p.z = 900;
          if (p.z > 900) p.z = 50;

          if (p.x > width / 2) p.x = -width / 2;
          if (p.x < -width / 2) p.x = width / 2;
          if (p.y > height / 2) p.y = -height / 2;
          if (p.y < -height / 2) p.y = height / 2;

          const scale = fov / p.z;
          const px = centerX + p.x * scale;
          const py = centerY + p.y * scale;
          const radius = Math.max(0.8, p.size * scale);
          const alpha = Math.min(0.5, Math.max(0.06, (1 - p.z / 900) * 0.55));

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${color} ${alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [particleCount, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};
