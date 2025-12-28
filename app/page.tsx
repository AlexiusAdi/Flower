"use client";

import Flower from "@/Components/Flower";
import { useState } from "react";

type FlowerData = {
  id: number;
  x: number;
  y: number;
  stemHeight: number;
  petalCount: number;
  size: number;
  color: string;
};

export default function Home() {
  const [flowers, setFlowers] = useState<FlowerData[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newFlower: FlowerData = {
      id: Date.now(),
      x,
      y,
      stemHeight: rand(80, 360),
      petalCount: rand(5, 8),
      size: rand(18, 28),
      color: randomColor(),
    };

    setFlowers((prev) => [...prev, newFlower]);
  };

  return (
    <main
      onClick={handleClick}
      className="relative w-full h-screen bg-black overflow-hidden cursor-crosshair"
    >
      {flowers.length === 0 && (
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-montserrat pointer-events-none">
          Click to add flowers
        </h1>
      )}

      {flowers.map((flower) => (
        <Flower key={flower.id} data={flower} />
      ))}
    </main>
  );
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  const colors = ["#FF5DA2", "#C77DFF", "#FF9F1C"];
  return colors[Math.floor(Math.random() * colors.length)];
}
