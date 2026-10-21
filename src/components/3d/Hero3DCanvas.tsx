import React, { useEffect, useRef } from 'react';

export const Hero3DCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetMouseX = x * 0.8;
      targetMouseY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Nodes generation (Sphere + Ring)
    const numPoints = 64;
    const radius = Math.min(width, height) * 0.32;
    const points: { x: number; y: number; z: number; color: string; size: number }[] = [];

    // Golden spiral sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Color gradation (emerald to teal with accent amber sparks)
      const color =
        i % 9 === 0
          ? 'rgba(245, 158, 11, 0.9)' // Amber spark
          : i % 2 === 0
          ? 'rgba(16, 185, 129, 0.85)' // Emerald
          : 'rgba(20, 184, 166, 0.85)'; // Teal

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        color,
        size: i % 7 === 0 ? 3.5 : 2.2,
      });
    }

    // Outer orbiting ring
    const ringPoints: { x: number; y: number; z: number }[] = [];
    const ringRadius = radius * 1.35;
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      ringPoints.push({
        x: Math.cos(angle) * ringRadius,
        y: Math.sin(angle) * ringRadius * 0.35,
        z: Math.sin(angle) * ringRadius,
      });
    }

    let angleX = 0.2;
    let angleY = 0;
    let isVisible = true;

    // Visibility observer to save battery/CPU when out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const fov = 420;

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Smooth mouse lerp
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        angleY += 0.007;
        angleX = 0.3 + mouseY * 0.4;
        const currentRotY = angleY + mouseX * 0.6;

        const centerX = width / 2;
        const centerY = height / 2;

        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);

        // Render Ring first
        ctx.beginPath();
        const projectedRing: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i < ringPoints.length; i++) {
          const pt = ringPoints[i];

          // Rotate Y
          const x1 = pt.x * cosY - pt.z * sinY;
          const z1 = pt.z * cosY + pt.x * sinY;

          // Rotate X
          const y2 = pt.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + pt.y * sinX;

          const scale = fov / (fov + z2);
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;

          projectedRing.push({ x: px, y: py, z: z2 });
        }

        // Draw ring segments
        for (let i = 0; i < projectedRing.length; i++) {
          const next = projectedRing[(i + 1) % projectedRing.length];
          const alpha = Math.max(0.08, Math.min(0.45, (projectedRing[i].z + radius) / (radius * 2)));
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(projectedRing[i].x, projectedRing[i].y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
        }

        // Project and sort sphere points by depth (Z-buffer)
        const projectedNodes = points.map((p) => {
          // Rotate Y
          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.z * cosY + p.x * sinY;

          // Rotate X
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + p.y * sinX;

          const scale = fov / (fov + z2);
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;

          return { px, py, scale, z: z2, color: p.color, size: p.size };
        });

        projectedNodes.sort((a, b) => b.z - a.z);

        // Draw connections between close nodes
        ctx.lineWidth = 0.8;
        for (let i = 0; i < projectedNodes.length; i++) {
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const dx = projectedNodes[i].px - projectedNodes[j].px;
            const dy = projectedNodes[i].py - projectedNodes[j].py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 55) {
              const alpha = (1 - dist / 55) * 0.22;
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(projectedNodes[i].px, projectedNodes[i].py);
              ctx.lineTo(projectedNodes[j].px, projectedNodes[j].py);
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        for (const node of projectedNodes) {
          const rad = Math.max(1, node.size * node.scale);
          ctx.beginPath();
          ctx.arc(node.px, node.py, rad, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();

          // Ambient node glow
          if (node.scale > 0.9) {
            ctx.beginPath();
            ctx.arc(node.px, node.py, rad * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = node.color.replace(/[\d.]+\)$/, '0.12)');
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};
