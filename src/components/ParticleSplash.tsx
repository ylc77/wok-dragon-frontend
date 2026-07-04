import { useEffect, useRef, useState } from 'react';

type SparkParticle = {
  angle: number;
  color: string;
  life: number;
  radius: number;
  speed: number;
  spin: number;
  x: number;
  y: number;
};

const SPLASH_SEEN_KEY = 'wok-dragon-particle-splash-seen';
const FADE_AFTER_MS = 1200;
const FALLBACK_CLOSE_MS = 2000;

function createParticle(width: number, height: number): SparkParticle {
  const fromCenter = Math.random() > 0.38;
  const centerX = width * (0.46 + Math.random() * 0.08);
  const centerY = height * (0.48 + Math.random() * 0.12);
  const colors = ['#e21b16', '#ffcc66', '#ff8b2f', '#fff1b8'];

  return {
    angle: Math.random() * Math.PI * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 0.35 + Math.random() * 0.65,
    radius: 0.9 + Math.random() * 2.2,
    speed: 0.25 + Math.random() * 1.15,
    spin: (Math.random() - 0.5) * 0.024,
    x: fromCenter ? centerX + (Math.random() - 0.5) * width * 0.22 : Math.random() * width,
    y: fromCenter ? centerY + (Math.random() - 0.5) * height * 0.16 : Math.random() * height,
  };
}

export function ParticleSplash() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const closeTimersRef = useRef<number[]>([]);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;

    try {
      return window.sessionStorage.getItem(SPLASH_SEEN_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isVisible) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function closeSplash() {
      setIsClosing(true);
      window.setTimeout(() => {
        try {
          window.sessionStorage.setItem(SPLASH_SEEN_KEY, 'true');
        } catch {
          // Session storage can be unavailable in private browsing.
        }
        setIsVisible(false);
      }, 320);
    }

    const fadeTimer = window.setTimeout(closeSplash, reduceMotion ? 700 : FADE_AFTER_MS);
    const fallbackTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(SPLASH_SEEN_KEY, 'true');
      } catch {
        // Session storage can be unavailable in private browsing.
      }
      setIsVisible(false);
    }, FALLBACK_CLOSE_MS);
    closeTimersRef.current = [fadeTimer, fallbackTimer];

    if (reduceMotion) {
      return () => {
        closeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      };
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) {
      return () => {
        closeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      };
    }
    const splashCanvas = canvas;
    const splashContext = context;

    let width = 0;
    let height = 0;
    let particles: SparkParticle[] = [];

    function stopAnimation() {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }

    function resizeCanvas() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      splashCanvas.width = Math.floor(width * pixelRatio);
      splashCanvas.height = Math.floor(height * pixelRatio);
      splashCanvas.style.width = `${width}px`;
      splashCanvas.style.height = `${height}px`;
      splashContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = width < 700 ? 38 : 82;
      particles = Array.from({ length: particleCount }, () => createParticle(width, height));
    }

    function draw() {
      splashContext.clearRect(0, 0, width, height);

      const gradient = splashContext.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.45, width * 0.72);
      gradient.addColorStop(0, 'rgba(226, 27, 22, 0.2)');
      gradient.addColorStop(0.42, 'rgba(226, 27, 22, 0.07)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      splashContext.fillStyle = gradient;
      splashContext.fillRect(0, 0, width, height);

      particles = particles.map((particle) => {
        const next = { ...particle };
        next.angle += next.spin;
        next.x += Math.cos(next.angle) * next.speed;
        next.y += Math.sin(next.angle) * next.speed - 0.18;
        next.life -= 0.0035;

        if (next.life <= 0 || next.x < -20 || next.x > width + 20 || next.y < -20 || next.y > height + 20) {
          return createParticle(width, height);
        }

        splashContext.beginPath();
        splashContext.fillStyle = next.color;
        splashContext.globalAlpha = Math.max(0, Math.min(1, next.life));
        splashContext.arc(next.x, next.y, next.radius, 0, Math.PI * 2);
        splashContext.fill();

        splashContext.beginPath();
        splashContext.strokeStyle = next.color;
        splashContext.lineWidth = 0.75;
        splashContext.globalAlpha = Math.max(0, next.life * 0.28);
        splashContext.moveTo(next.x, next.y);
        splashContext.lineTo(next.x - Math.cos(next.angle) * 12, next.y - Math.sin(next.angle) * 12);
        splashContext.stroke();

        splashContext.globalAlpha = 1;
        return next;
      });

      frameRef.current = window.requestAnimationFrame(draw);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stopAnimation();
        return;
      }

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(draw);
      }
    }

    resizeCanvas();
    frameRef.current = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopAnimation();
      closeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`particle-splash ${isClosing ? 'is-closing' : ''}`} aria-hidden="true">
      <canvas ref={canvasRef} className="particle-splash-canvas" />
      <div className="particle-splash-logo">
        <span className="particle-splash-dragon">WD</span>
        <strong>Wok Dragon</strong>
        <small>Express</small>
      </div>
    </div>
  );
}
