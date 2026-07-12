import React, { useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const MatrixRain: React.FC = () => {
  const { matrixActive } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matrixActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&%*+-=';
    const charArr = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    let animationFrameId: number;

    const draw = () => {
      // Fade canvas slightly to create trails
      ctx.fillStyle = 'rgba(5, 8, 22, 0.06)'; // Blend with custom bgMain
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FFB3'; // Glow green/highlight
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drops when they reach the bottom, with random offset
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [matrixActive]);

  if (!matrixActive) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-40 opacity-20"
    />
  );
};
