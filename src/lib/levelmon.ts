import { Flame, Music, Leaf, type LucideIcon } from "lucide-react";

export type ClassId = "gladiador" | "bardo" | "druida";

export interface ClassInfo {
  id: ClassId;
  name: string;
  monsterName: string;
  tagline: string;
  color: string; // css var name
  emoji: string;
  Icon: LucideIcon;
  stats: { label: string; value: number }[];
  missions: { title: string; desc: string }[];
}

export const CLASSES: Record<ClassId, ClassInfo> = {
  gladiador: {
    id: "gladiador",
    name: "Gladiador",
    monsterName: "Emberling",
    tagline: "Chamas ardem no seu núcleo.",
    color: "gladiador",
    emoji: "🔥",
    Icon: Flame,
    stats: [
      { label: "FORÇA", value: 92 },
      { label: "RESISTÊNCIA", value: 85 },
      { label: "AGILIDADE", value: 60 },
      { label: "FOCO", value: 45 },
    ],
    missions: [
      { title: "Poção de Hidratação", desc: "Beber 2.5L de água ao longo do dia." },
      { title: "Side Quest: Caminhada", desc: "Alcançar 7.000 passos." },
      { title: "Boss Fight: O Treino", desc: "40 min de atividade física intensa." },
    ],
  },
  bardo: {
    id: "bardo",
    name: "Bardo",
    monsterName: "Melodex",
    tagline: "Sua energia vibra em harmonia.",
    color: "bardo",
    emoji: "🎶",
    Icon: Music,
    stats: [
      { label: "CARISMA", value: 94 },
      { label: "ENERGIA", value: 88 },
      { label: "AGILIDADE", value: 65 },
      { label: "FOCO", value: 55 },
    ],
    missions: [
      { title: "Conexão de Guilda", desc: "Mandar mensagem ou ligar para um amigo." },
      { title: "Explorando a Taverna", desc: "Refeição ou atividade social presencial." },
      { title: "Olho no Olho", desc: "1h sem olhar o celular com alguém." },
    ],
  },
  druida: {
    id: "druida",
    name: "Druida",
    monsterName: "Sproutkin",
    tagline: "Raízes profundas, mente calma.",
    color: "druida",
    emoji: "🌿",
    Icon: Leaf,
    stats: [
      { label: "FOCO", value: 93 },
      { label: "VITALIDADE", value: 87 },
      { label: "CARISMA", value: 55 },
      { label: "FORÇA", value: 50 },
    ],
    missions: [
      { title: "Páginas de Sabedoria", desc: "Ler 10 páginas de um livro físico." },
      { title: "Toque na Grama", desc: "15 min ao ar livre sem telas." },
      { title: "Blackout Noturno", desc: "Desligar PC e celular 1h antes de dormir." },
    ],
  },
};

export interface QuizQuestion {
  q: string;
  options: { label: string; text: string; class: ClassId }[];
}

export const QUIZ: QuizQuestion[] = [
  {
    q: "Se o seu Levelmon pudesse te dar um superpoder na vida real hoje, qual você escolheria?",
    options: [
      { label: "A", text: "Energia infinita para treinar", class: "gladiador" },
      { label: "B", text: "Habilidade de socializar", class: "bardo" },
      { label: "C", text: "Foco inabalável para ler", class: "druida" },
    ],
  },
  {
    q: 'Onde está o seu maior "gargalo" de saúde atualmente?',
    options: [
      { label: "A", text: "Sedentarismo extremo", class: "gladiador" },
      { label: "B", text: "Isolamento social", class: "bardo" },
      { label: "C", text: "Mente acelerada e ansiedade", class: "druida" },
    ],
  },
  {
    q: 'Cenário ideal de "recompensa" após uma semana cansativa:',
    options: [
      { label: "A", text: "Academia ou esporte", class: "gladiador" },
      { label: "B", text: "Reunir a galera presencial", class: "bardo" },
      { label: "C", text: "Chá quente e um livro offline", class: "druida" },
    ],
  },
  {
    q: 'Qual desses "Debuffs" mais te atrapalha hoje?',
    options: [
      { label: "A", text: "Falta de consistência e espelho", class: "gladiador" },
      { label: "B", text: "Timidez e preguiça de sair", class: "bardo" },
      { label: "C", text: "Cansaço visual e vício em Reels", class: "druida" },
    ],
  },
];

export function tallyClass(answers: ClassId[]): ClassId {
  const score: Record<ClassId, number> = { gladiador: 0, bardo: 0, druida: 0 };
  answers.forEach((a) => score[a]++);
  return (Object.entries(score).sort((a, b) => b[1] - a[1])[0][0] as ClassId);
}
