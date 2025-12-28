"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type FlowerData = {
  x: number;
  y: number;
  stemHeight: number;
  petalCount: number;
  size: number;
  color: string;
};

export default function Flower({ data }: { data: FlowerData }) {
  const { x, y, stemHeight, petalCount, size, color } = data;

  const stemRef = useRef<SVGPathElement>(null);
  const petalsRef = useRef<SVGEllipseElement[]>([]);

  useEffect(() => {
    if (!stemRef.current) return;

    const stem = stemRef.current;
    const length = stem.getTotalLength();

    // initial state
    gsap.set(stem, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.set(petalsRef.current, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center",
    });

    // timeline = controlled sequence
    const tl = gsap.timeline();

    tl.to(stem, {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: "power2.out",
    }).to(
      petalsRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(2)",
        stagger: 0.03,
      },
      "-=0.2"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const stemPath = `
    M 60 260
    C ${60 + rand(-20, 20)} 200,
      ${60 + rand(-10, 10)} 140,
      60 ${260 - stemHeight}
  `;

  return (
    <svg
      width="120"
      height={stemHeight + 80}
      viewBox="0 0 120 260"
      style={{
        position: "absolute",
        left: x - 60,
        top: y - stemHeight - 40,
      }}
    >
      {/* Stem */}
      <path
        ref={stemRef}
        d={stemPath}
        stroke="#6BCF8E"
        strokeWidth="3"
        fill="none"
      />

      {/* Petals */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (360 / petalCount) * i;
        return (
          <ellipse
            key={i}
            ref={(el) => {
              if (el) petalsRef.current[i] = el;
            }}
            cx="60"
            cy={260 - stemHeight}
            rx={size}
            ry={size / 2}
            fill={color}
            transform={`rotate(${angle} 60 ${260 - stemHeight})`}
          />
        );
      })}

      {/* Center */}
      <circle cx="60" cy={260 - stemHeight} r={size / 3} fill="#FFD166" />
    </svg>
  );
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
