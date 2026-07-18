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

export type Tier = "leve" | "moderado" | "alto";

export function getTier(index: number): Tier {
  if (index <= 3) return "leve";
  if (index <= 7) return "moderado";
  return "alto";
}

export const TIER_META: Record<Tier, { label: string; multiplier: number; emoji: string }> = {
  leve: { label: "Iniciante", multiplier: 1, emoji: "🌱" },
  moderado: { label: "Moderado", multiplier: 1.25, emoji: "⚔️" },
  alto: { label: "Hardcore", multiplier: 1.6, emoji: "🔥" },
};

export const CLASS_TIER_EMOJI: Record<ClassId, string> = {
  gladiador: "⚔️",
  bardo: "🎶",
  druida: "🌿",
};

type Mission = { title: string; desc: string };

export const MISSIONS_BY_TIER: Record<ClassId, Record<Tier, Mission[]>> = {
  gladiador: {
    leve: [
      { title: "Poção de Hidratação", desc: "Beber 2L de água ao longo do dia." },
      { title: "Caminhada Leve", desc: "Alcançar 4.000 passos." },
      { title: "Alongamento", desc: "15 min de alongamento ou caminhada leve." },
    ],
    moderado: [
      { title: "Poção de Hidratação", desc: "Beber 2.5L de água ao longo do dia." },
      { title: "Side Quest: Caminhada", desc: "Alcançar 7.000 passos." },
      { title: "Boss Fight: O Treino", desc: "40 min de musculação/funcional." },
    ],
    alto: [
      { title: "Poção Épica", desc: "Beber 3.5L de água ao longo do dia." },
      { title: "Corrida do Guerreiro", desc: "Corrida/Caminhada de 10.000 passos." },
      { title: "Raid: Treino Intenso", desc: "60 min de treino + bater meta de proteínas." },
    ],
  },
  bardo: {
    leve: [
      { title: "Mensagem de Guilda", desc: "Mandar mensagem para 1 amigo/familiar." },
      { title: "Resposta Pendente", desc: "Responder a uma mensagem nas redes." },
      { title: "Papo sem Tela", desc: "15 min conversando sem olhar o celular." },
    ],
    moderado: [
      { title: "Chamada de Voz", desc: "Ligar (voz/vídeo) para um amigo." },
      { title: "Refeição em Grupo", desc: "Uma refeição presencial com alguém." },
      { title: "Olho no Olho", desc: "1h conversando presencialmente sem celular." },
    ],
    alto: [
      { title: "Organizar Encontro", desc: "Marcar um encontro ou atividade em grupo." },
      { title: "Evento da Comunidade", desc: "Participar de um evento social presencial." },
      { title: "Tarde Offline", desc: "Uma tarde inteira offline interagindo socialmente." },
    ],
  },
  druida: {
    leve: [
      { title: "Páginas de Sabedoria", desc: "Ler 5 páginas de um livro físico." },
      { title: "Toque na Grama", desc: "5 min ao ar livre sem telas." },
      { title: "Blackout Suave", desc: "Desligar telas 15 min antes de dormir." },
    ],
    moderado: [
      { title: "Páginas de Sabedoria", desc: "Ler 10 páginas de um livro físico." },
      { title: "Toque na Grama", desc: "15 min ao ar livre sem telas." },
      { title: "Blackout Noturno", desc: "Desligar PC e celular 1h antes de dormir." },
    ],
    alto: [
      { title: "Tomo Antigo", desc: "Ler 25 páginas de um livro ou documento." },
      { title: "Detox Diurno", desc: "1h consecutiva de detox digital durante o dia." },
      { title: "Sono Sagrado", desc: "Sem telas 2h antes de dormir." },
    ],
  },
};

export function getMissions(classId: ClassId, tier: Tier): Mission[] {
  return MISSIONS_BY_TIER[classId][tier];
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
