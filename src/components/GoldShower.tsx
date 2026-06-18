"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  fadeSpeed: number;
}

interface GoldShowerProps {
  trigger?: any;
}

export const GoldShower: React.FC<GoldShowerProps> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    // Bumed particle count to 220 for a much more visible, dense gold shower
    const particleCount = 220;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Deep, saturated gold colors that stand out strongly against white backgrounds
    const goldColors = [
      "rgba(184, 134, 11, ",  // Dark Goldenrod (#B8860B) - Excellent contrast
      "rgba(212, 175, 55, ",  // Premium Metallic Gold (#D4AF37)
      "rgba(197, 160, 89, ",  // Theme Kasavu Gold (#C5A059)
      "rgba(178, 143, 70, ",  // Deep Bronze Gold (#B28F46)
      "rgba(156, 124, 55, ",  // Saturated Dark Gold
    ];

    // Initialize particles cascading from the top of the screen
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 80, // spread start positions vertically above viewport
        size: Math.random() * 3.8 + 1.8, // Larger particles: 1.8px to 5.6px
        speedY: Math.random() * 2.8 + 1.8, // Slightly faster fall speed for active motion
        speedX: Math.random() * 1.4 - 0.7, // gentle horizontal drift
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.12,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        opacity: Math.random() * 0.35 + 0.65, // Highly opaque starting values (0.65 to 1.0)
        fadeSpeed: Math.random() * 0.0035 + 0.002, // Slower fade rate so particles accumulate on screen
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.opacity > 0 && p.y < canvas.height) {
          activeCount++;

          // Update physics
          p.y += p.speedY;
          // Apply a gentle sway based on sine wave
          p.x += p.speedX + Math.sin(p.y * 0.015) * 0.2;
          p.rotation += p.rotationSpeed;
          p.opacity -= p.fadeSpeed;

          if (p.opacity < 0) p.opacity = 0;

          // Draw the gold dust particle (diamond shape)
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          
          // Darker gold outline stroke to create high contrast on white background
          ctx.strokeStyle = `rgba(139, 90, 0, ${p.opacity * 0.45})`;
          ctx.lineWidth = 0.6;
          
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          
          // Add a soft glow to larger particles
          if (p.size > 3.0) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(212, 175, 55, 0.55)";
          }
          
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      }

      // Keep animating if there are active, visible particles
      if (activeCount > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};

export default GoldShower;
