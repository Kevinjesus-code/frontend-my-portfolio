// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { renderToString } from "react-dom/server";

// interface Icon {
//   x: number;
//   y: number;
//   z: number;
//   scale: number;
//   opacity: number;
//   id: number;
// }

// interface IconCloudProps {
//   icons?: React.ReactNode[];
//   images?: string[];
// }

// function easeOutCubic(t: number): number {
//   return 1 - Math.pow(1 - t, 3);
// }

// const IconCloud = ({ icons, images }: IconCloudProps) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   const techLogos = [
//     "/assets/img/logos/js.png",
//     "/assets/img/logos/react.png",
//     "/assets/img/logos/angular.png",
//     "/assets/img/logos/typescript.png",
//     "/assets/img/logos/nextjs.png",
//     "/assets/img/logos/tailwind.png",
//     "/assets/img/logos/git.png",
//     "/assets/img/logos/github.png",
//     "/assets/img/logos/figma.png",
//     "/assets/img/logos/Bootstrap.png",
//     "/assets/img/logos/flutter.png",
// 	"/assets/img/logos/python.png",
// 	"/assets/img/logos/node.js.png",
// 	"/assets/img/logos/swift.png",
// 	"/assets/img/logos/java.png",
//   ];

//   // items: prefer icons (React nodes) if hay icons, luego images (URLs), luego techLogos
//   const items: (string | React.ReactNode)[] =
//     icons && icons.length
//       ? icons
//       : images && images.length
//       ? images
//       : techLogos;

//   const [iconPositions, setIconPositions] = useState<Icon[]>([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [targetRotation, setTargetRotation] = useState<{
//     x: number;
//     y: number;
//     startX: number;
//     startY: number;
//     distance: number;
//     startTime: number;
//     duration: number;
//   } | null>(null);

//   const animationFrameRef = useRef<number>(0);
//   const rotationRef = useRef({ x: 0, y: 0 }); // usar ref directo (evita estado sin uso)
//   const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
//   const imagesLoadedRef = useRef<boolean[]>([]);

//   // Cargar items (URLs o React nodes) a canvases offscreen
//   useEffect(() => {
//     if (!items || items.length === 0) return;

//     imagesLoadedRef.current = new Array(items.length).fill(false);

//     const newIconCanvases = items.map((item, index) => {
//       const offscreen = document.createElement("canvas");
//       offscreen.width = 40;
//       offscreen.height = 40;
//       const offCtx = offscreen.getContext("2d");

//       if (!offCtx) return offscreen;

//       // Si es string -> URL de imagen
//       if (typeof item === "string") {
//         const img = new Image();
//         img.crossOrigin = "anonymous";
//         img.src = item;
//         img.onload = () => {
//           offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
//           offCtx.save();
//           offCtx.beginPath();
//           offCtx.arc(20, 20, 20, 0, Math.PI * 2);
//           offCtx.closePath();
//           offCtx.clip();
//           offCtx.drawImage(img, 0, 0, 40, 40);
//           offCtx.restore();
//           imagesLoadedRef.current[index] = true;
//         };
//         img.onerror = () => {
//           // fallback: dibujar un círculo si falla la carga
//           offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
//           offCtx.fillStyle = "#666";
//           offCtx.beginPath();
//           offCtx.arc(20, 20, 18, 0, Math.PI * 2);
//           offCtx.fill();
//           imagesLoadedRef.current[index] = true;
//         };
//       } else {
//         // React node -> renderizar a svg string y cargar como imagen
//         try {
//           const svgString = renderToString(item as React.ReactElement);
//           const img = new Image();
//           img.src = "data:image/svg+xml;base64," + btoa(svgString);
//           img.onload = () => {
//             offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
//             offCtx.drawImage(img, 0, 0, 40, 40);
//             imagesLoadedRef.current[index] = true;
//           };
//           img.onerror = () => {
//             offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
//             offCtx.fillStyle = "#666";
//             offCtx.beginPath();
//             offCtx.arc(20, 20, 18, 0, Math.PI * 2);
//             offCtx.fill();
//             imagesLoadedRef.current[index] = true;
//           };
//         } catch (err) {
//           offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
//           offCtx.fillStyle = "#666";
//           offCtx.beginPath();
//           offCtx.arc(20, 20, 18, 0, Math.PI * 2);
//           offCtx.fill();
//           imagesLoadedRef.current[index] = true;
//         }
//       }

//       return offscreen;
//     });

//     iconCanvasesRef.current = newIconCanvases;
//   }, [items]); // recalcular cuando items cambien

//   // Generar posiciones iniciales según la cantidad de items
//   useEffect(() => {
//     const newIcons: Icon[] = [];
//     const numIcons = items.length || 20;

//     const offset = 2 / numIcons;
//     const increment = Math.PI * (3 - Math.sqrt(5));

//     for (let i = 0; i < numIcons; i++) {
//       const y = i * offset - 1 + offset / 2;
//       const r = Math.sqrt(1 - y * y);
//       const phi = i * increment;

//       const x = Math.cos(phi) * r;
//       const z = Math.sin(phi) * r;

//       newIcons.push({
//         x: x * 100,
//         y: y * 100,
//         z: z * 100,
//         scale: 1,
//         opacity: 1,
//         id: i,
//       });
//     }
//     setIconPositions(newIcons);
//   }, [items.length]);

//   // Manejo de interacción (mousedown/mousemove/mouseup)
//   const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const rect = canvasRef.current?.getBoundingClientRect();
//     if (!rect || !canvasRef.current) return;

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const ctx = canvasRef.current.getContext("2d");
//     if (!ctx) return;

//     for (const icon of iconPositions) {
//       const cosX = Math.cos(rotationRef.current.x);
//       const sinX = Math.sin(rotationRef.current.x);
//       const cosY = Math.cos(rotationRef.current.y);
//       const sinY = Math.sin(rotationRef.current.y);

//       const rotatedX = icon.x * cosY - icon.z * sinY;
//       const rotatedZ = icon.x * sinY + icon.z * cosY;
//       const rotatedY = icon.y * cosX + rotatedZ * sinX;

//       const screenX = canvasRef.current!.width / 2 + rotatedX;
//       const screenY = canvasRef.current!.height / 2 + rotatedY;

//       const scale = (rotatedZ + 200) / 300;
//       const radius = 20 * scale;
//       const dx = x - screenX;
//       const dy = y - screenY;

//       if (dx * dx + dy * dy < radius * radius) {
//         const targetX = -Math.atan2(
//           icon.y,
//           Math.sqrt(icon.x * icon.x + icon.z * icon.z)
//         );
//         const targetY = Math.atan2(icon.x, icon.z);

//         const currentX = rotationRef.current.x;
//         const currentY = rotationRef.current.y;
//         const distance = Math.sqrt(
//           Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
//         );
//         const duration = Math.min(2000, Math.max(800, distance * 1000));

//         setTargetRotation({
//           x: targetX,
//           y: targetY,
//           startX: currentX,
//           startY: currentY,
//           distance,
//           startTime: performance.now(),
//           duration,
//         });
//         return;
//       }
//     }

//     setIsDragging(true);
//     setLastMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const rect = canvasRef.current?.getBoundingClientRect();
//     if (rect) {
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       setMousePos({ x, y });
//     }

//     if (isDragging) {
//       const deltaX = e.clientX - lastMousePos.x;
//       const deltaY = e.clientY - lastMousePos.y;

//       rotationRef.current = {
//         x: rotationRef.current.x + deltaY * 0.002,
//         y: rotationRef.current.y + deltaX * 0.002,
//       };

//       setLastMousePos({ x: e.clientX, y: e.clientY });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Animación y renderizado en canvas
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");

//     if (!canvas || !ctx) {
//       console.error("Canvas or context not available");
//       return;
//     }

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const centerX = canvas.width / 2;
//       const centerY = canvas.height / 2;
//       const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
//       const dx = mousePos.x - centerX;
//       const dy = mousePos.y - centerY;
//       const distance = Math.sqrt(dx * dx + dy * dy);
//       const speed = 0.003 + (distance / maxDistance) * 0.01;

//       if (targetRotation) {
//         const elapsed = performance.now() - targetRotation.startTime;
//         const progress = Math.min(1, elapsed / targetRotation.duration);
//         const easedProgress = easeOutCubic(progress);

//         rotationRef.current = {
//           x:
//             targetRotation.startX +
//             (targetRotation.x - targetRotation.startX) * easedProgress,
//           y:
//             targetRotation.startY +
//             (targetRotation.y - targetRotation.startY) * easedProgress,
//         };

//         if (progress >= 1) {
//           setTargetRotation(null);
//         }
//       } else if (!isDragging) {
//         rotationRef.current = {
//           x: rotationRef.current.x + (dy / canvas.height) * speed,
//           y: rotationRef.current.y + (dx / canvas.width) * speed,
//         };
//       }

//       iconPositions.forEach((icon, index) => {
//         const cosX = Math.cos(rotationRef.current.x);
//         const sinX = Math.sin(rotationRef.current.x);
//         const cosY = Math.cos(rotationRef.current.y);
//         const sinY = Math.sin(rotationRef.current.y);

//         const rotatedX = icon.x * cosY - icon.z * sinY;
//         const rotatedZ = icon.x * sinY + icon.z * cosY;
//         const rotatedY = icon.y * cosX + rotatedZ * sinX;

//         const scale = (rotatedZ + 200) / 300;
//         const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));

//         ctx.save();
//         ctx.translate(
//           canvas.width / 2 + rotatedX,
//           canvas.height / 2 + rotatedY
//         );
//         ctx.scale(scale, scale);
//         ctx.globalAlpha = opacity;

//         // dibujar canvas offscreen si ya cargó
//         if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
//           ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40);
//         } else {
//           // fallback visual mientras carga
//           ctx.beginPath();
//           ctx.arc(0, 0, 18, 0, Math.PI * 2);
//           ctx.fillStyle = "#444";
//           ctx.fill();
//         }

//         ctx.restore();
//       });

//       animationFrameRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       if (animationFrameRef.current)
//         cancelAnimationFrame(animationFrameRef.current);
//     };
//   }, [iconPositions, isDragging, mousePos, targetRotation]);

//   return (
//     <div className="w-full h-full flex items-center justify-center">
//       <canvas
//         ref={canvasRef}
//         width={400}
//         height={400}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         className="rounded-lg bg-slate-950"
//         aria-label="Interactive 3D Icon Cloud"
//         role="img"
//       />
//     </div>
//   );
// };

// export default IconCloud;
