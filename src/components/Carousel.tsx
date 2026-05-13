import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../components/Card";

type Difficulty = "facil" | "medio" | "dificil";

interface CardData {
  id: number;
  title: string;
  difficulty: Difficulty;
  isDone: boolean;
  description: string;
  date: string;
}

const MOCK_CARDS: CardData[] = [
  {
    id: 1,
    title: "Docker",
    difficulty: "medio",
    isDone: false,
    description: "Containerização de apps",
    date: "2024-01-01",
  },
  {
    id: 2,
    title: "Kubernetes",
    difficulty: "dificil",
    isDone: false,
    description: "Orquestração de containers",
    date: "2024-02-01",
  },
  {
    id: 3,
    title: "Next.js",
    difficulty: "medio",
    isDone: true,
    description: "Framework React fullstack",
    date: "2024-03-01",
  },
  {
    id: 4,
    title: "Prisma",
    difficulty: "facil",
    isDone: false,
    description: "ORM para Node.js",
    date: "2024-04-01",
  },
  {
    id: 5,
    title: "Redis",
    difficulty: "facil",
    isDone: false,
    description: "Cache em memória",
    date: "2024-05-01",
  },
];

const VISIBLE = 3;

export function Carousel() {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, MOCK_CARDS.length - VISIBLE);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const clampIndex = (next: number) => Math.min(maxIndex, Math.max(0, next));

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIndex((i) => clampIndex(i - 1))}
        disabled={!canPrev}
        className="absolute bottom-4 left-10 p-1 rounded-full bg-white/25 cursor-pointer ring-1 ring-black/20"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => setIndex((i) => clampIndex(i + 1))}
        disabled={!canNext}
        className="absolute bottom-4 left-20 p-1 rounded-full bg-white/25 cursor-pointer ring-1 ring-black/20"
      >
        <ChevronRight size={20} />
      </button>

      <div className="rounded-md bg-transparent ring-1 ring-black/10 w-fit h-110 grid grid-cols-3 grid-rows-1 gap-10 p-10 items-center justify-items-center">
        {MOCK_CARDS.slice(index, index + VISIBLE).map((card) => (
          <Card
            key={card.id}
            title={card.title}
            difficulty={card.difficulty}
            isDone={card.isDone}
            description={card.description}
            date={card.date}
          />
        ))}
      </div>
    </div>
  );
}
