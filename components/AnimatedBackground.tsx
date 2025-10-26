import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const wallCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Creates a pre-rendered canvas for the wall texture for performance
    const createWallTexture = (w: number, h: number) => {
        const wallCanvas = document.createElement('canvas');
        wallCanvas.width = w;
        wallCanvas.height = h;
        const wallCtx = wallCanvas.getContext('2d');
        if (wallCtx) {
            // Base wall color
            wallCtx.fillStyle = '#080808';
            wallCtx.fillRect(0, 0, w, h);
            
            // Cracks
            wallCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
            wallCtx.lineWidth = 0.5;
            for (let i = 0; i < 40; i++) { // More cracks for texture
                let x = Math.random() * w;
                let y = Math.random() * h;
                let len = Math.random() * 200 + 100;
                wallCtx.beginPath();
                wallCtx.moveTo(x, y);
                for (let j = 0; j < 5; j++) {
                    x += (Math.random() - 0.5) * len * 0.5;
                    y += (Math.random() - 0.5) * len * 0.5;
                    wallCtx.lineTo(x, y);
                }
                wallCtx.stroke();
            }
             // Darkening gradient for atmosphere
            const gradient = wallCtx.createLinearGradient(0, 0, 0, h * 0.8);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
            gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            wallCtx.fillStyle = gradient;
            wallCtx.fillRect(0, 0, w, h);
        }
        return wallCanvas;
    }

    wallCanvasRef.current = createWallTexture(width, height);
    const wallTexture = wallCanvasRef.current;

    class SmokeParticle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;

      constructor(w: number, h: number) {
        this.maxLife = Math.random() * 400 + 200; // Longer life
        this.reset(w, h);
      }
      
      reset(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = h * 0.65 + Math.random() * h * 0.4; // Start lower, on the floor
        this.size = Math.random() * 80 + 40;
        this.opacity = 0;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = -Math.random() * 0.2 - 0.05; // Slower rise
        this.life = this.maxLife;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        
        // Fade in and out smoothly
        const lifeRatio = this.life / this.maxLife;
        this.opacity = Math.sin( (1-lifeRatio) * Math.PI) * 0.3;
        
        if (this.life <= 0) {
            this.reset(w, h);
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.globalAlpha = this.opacity * 0.15; // More subtle smoke
        const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, 'rgba(40, 40, 40, 1)');
        gradient.addColorStop(1, 'rgba(40, 40, 40, 0)');
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;
      }
    }

    const particles: SmokeParticle[] = [];
    for (let i = 0; i < 70; i++) { // More particles for a fuller effect
      particles.push(new SmokeParticle(width, height));
    }

    const drawFloor = (context: CanvasRenderingContext2D, w: number, h: number) => {
        const horizonY = h * 0.6;
        const vanishingPointX = w / 2;
        
        // Floor gradient
        const floorGradient = context.createLinearGradient(0, horizonY, 0, h);
        floorGradient.addColorStop(0, '#101010');
        floorGradient.addColorStop(1, '#000000');
        context.fillStyle = floorGradient;
        context.fillRect(0, horizonY, w, h - horizonY);

        // Wooden planks with perspective
        context.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        context.lineWidth = 1.5;
        const plankCount = 24;
        for (let i = 0; i <= plankCount; i++) {
            const xOnFloor = (i / plankCount - 0.5) * w * 2.5;
            const x1 = vanishingPointX + xOnFloor;
            const y1 = horizonY;

            const x2 = vanishingPointX + xOnFloor * 8; // Increase perspective
            const y2 = h;

            context.beginPath();
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.stroke();
        }
    }

    const animate = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      // Draw static elements
      if (wallTexture) {
          ctx.drawImage(wallTexture, 0, 0);
      }
      drawFloor(ctx, width, height);
      
      // Draw animated smoke
      ctx.globalCompositeOperation = 'lighter';
      particles.forEach(p => {
        p.update(width, height);
        p.draw(ctx);
      });
      ctx.globalCompositeOperation = 'source-over';
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      wallCanvasRef.current = createWallTexture(width, height);
      particles.forEach(p => p.reset(width, height));
    };
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="background-canvas" className="fixed top-0 left-0 w-full h-full z-[-1]"></canvas>;
};

export default AnimatedBackground;
