import React, { useEffect, useRef, useState, useCallback } from "react";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface Position {
  x: number;
  y: number;
}

interface TargetRotation {
  x: number;
  y: number;
  startX: number;
  startY: number;
  distance: number;
  startTime: number;
  duration: number;
}

const CANVAS_SIZE = 500;
const ICON_SIZE = 40;
const RADIUS = 20;
const SPHERE_RADIUS = 150;
const ROTATION_SPEED = 0.002;
const MIN_OPACITY = 0.2;

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const calculateRotatedPosition = (icon: Icon, rotation: Position) => {
  const { x, y, z } = icon;
  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  
  const rotatedX = x * cosY - z * sinY;
  const rotatedZ = x * sinY + z * cosY;
  const rotatedY = y * cosX + rotatedZ * sinX;
  
  return { rotatedX, rotatedY, rotatedZ };
};

const useIconAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  icons: Icon[],
  rotationRef: React.MutableRefObject<Position>,
  isDragging: boolean,
  mousePos: Position,
  targetRotation: TargetRotation | null,
  setTargetRotation: React.Dispatch<React.SetStateAction<TargetRotation | null>>,
  iconCanvasesRef: React.MutableRefObject<HTMLCanvasElement[]>,
  imagesLoadedRef: React.MutableRefObject<boolean[]>,
  animationFrameRef: React.MutableRefObject<number | null>,
) => {
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      const centerX = canvasEl.width / 2;
      const centerY = canvasEl.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.003 + (distance / maxDistance) * 0.01;

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);
        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        };
        if (progress >= 1) setTargetRotation(null);
      } else if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvasEl.height) * speed,
          y: rotationRef.current.y + (dx / canvasEl.width) * speed,
        };
      }

      icons.forEach((icon, index) => {
        const { rotatedX, rotatedY, rotatedZ } = calculateRotatedPosition(icon, rotationRef.current);
        const scale = (rotatedZ + 200) / 300;
        const opacity = Math.max(MIN_OPACITY, Math.min(1, (rotatedZ + 150) / 200));

        ctx.save();
        ctx.translate(canvasEl.width / 2 + rotatedX, canvasEl.height / 2 + rotatedY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
          ctx.drawImage(iconCanvasesRef.current[index], -RADIUS, -RADIUS, ICON_SIZE, ICON_SIZE);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = "#4444ff";
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasRef, icons, isDragging, mousePos, targetRotation, setTargetRotation, iconCanvasesRef, imagesLoadedRef, animationFrameRef]);
};

function FrontendIconCloud() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState<Position>({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState<TargetRotation | null>(null);
  const rotationRef = useRef<Position>({ x: 0, y: 0 });
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const slugs = [
    "typescript", "javascript", "dart", "java", "react",
    "flutter", "android", "html5", "css3", "nodedotjs",
    "express", "nextdotjs", "prisma", "amazonaws", "postgresql",
    "firebase", "nginx", "vercel", "testinglibrary", "jest",
    "cypress", "docker", "git", "jira", "github",
    "gitlab", "visualstudiocode", "androidstudio", "sonarqube", "figma",
  ];

  const frontendTechs = slugs.map(slug => `https://cdn.simpleicons.org/${slug}/${slug}`);

  // --- CREACIÓN DE ICONOS ---
  useEffect(() => {
    const createIconCanvas = (url: string, index: number) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = ICON_SIZE;
      offscreen.height = ICON_SIZE;
      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => {
          offCtx.clearRect(0, 0, ICON_SIZE, ICON_SIZE);
          offCtx.beginPath();
          offCtx.arc(RADIUS, RADIUS, RADIUS, 0, Math.PI * 2);
          offCtx.closePath();
          offCtx.clip();
          offCtx.drawImage(img, 0, 0, ICON_SIZE, ICON_SIZE);
          imagesLoadedRef.current[index] = true;
        };
      }
      return offscreen;
    };

    imagesLoadedRef.current = new Array(frontendTechs.length).fill(false);
    iconCanvasesRef.current = frontendTechs.map(createIconCanvas);
  }, []);

  // --- POSICIONES INICIALES ---
  useEffect(() => {
    const generateInitialPositions = () => {
      const numIcons = frontendTechs.length;
      const offset = 2 / numIcons;
      const increment = Math.PI * (3 - Math.sqrt(5));
      
      return Array.from({ length: numIcons }, (_, i) => {
        const y = i * offset - 1 + offset / 2;
        const r = Math.sqrt(1 - y * y);
        const phi = i * increment;
        return {
          x: Math.cos(phi) * r * SPHERE_RADIUS,
          y: y * SPHERE_RADIUS,
          z: Math.sin(phi) * r * SPHERE_RADIUS,
          scale: 1,
          opacity: 1,
          id: i,
        };
      });
    };

    setIconPositions(generateInitialPositions());
  }, [frontendTechs]);

  // --- EVENTOS DEL MOUSE ---
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const icon of iconPositions) {
      const { rotatedX, rotatedY, rotatedZ } = calculateRotatedPosition(icon, rotationRef.current);
      const scale = (rotatedZ + 200) / 300;
      const radius = RADIUS * scale;
      const dx = x - (canvas.width / 2 + rotatedX);
      const dy = y - (canvas.height / 2 + rotatedY);

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);
        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );
        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return;
      }
    }

    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [iconPositions, setTargetRotation]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    const newMousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setMousePos(newMousePos);

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * ROTATION_SPEED,
        y: rotationRef.current.y + deltaX * ROTATION_SPEED,
      };
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, lastMousePos]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Efecto para la limpieza de recursos
  useEffect(() => {
    return () => {
      iconCanvasesRef.current.forEach(canvas => {
        if (canvas) {
          canvas.width = 0;
          canvas.height = 0;
        }
      });
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // --- ANIMACIÓN ---
  useIconAnimation(
    canvasRef,
    iconPositions,
    rotationRef,
    isDragging,
    mousePos,
    targetRotation,
    setTargetRotation,
    iconCanvasesRef,
    imagesLoadedRef,
    animationFrameRef
  );

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="rounded-lg cursor-grab active:cursor-grabbing"
          aria-label="Interactive 3D Icon Cloud"
          role="img"
        />
      </div>
    </div>
  );
}

export default FrontendIconCloud;
