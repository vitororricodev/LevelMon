import { Flame, Leaf, Music, type LucideIcon } from "lucide-react";

export type ClassId = "gladiador" | "bardo" | "druida";
export type EvolutionStage = "baby" | "teen" | "adult";
export type Tier = "leve" | "moderado" | "alto";

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

export function getTier(index: number): Tier {
  if (index <= 3) return "leve";
  if (index <= 7) return "moderado";
  return "alto";
}

export interface Mission {
  id: string;
  title: string;
  desc: string;
  xp: number;
  coins: number;
}

export interface ClassInfo {
  id: ClassId;
  name: string;
  monsterName: string;
  tagline: string;
  color: string;
  emoji: string;
  Icon: LucideIcon;
  stats: { label: string; value: number }[];
  missions: Mission[];
}

const mission = (id: string, title: string, desc: string, xp: number, coins: number): Mission => ({
  id,
  title,
  desc,
  xp,
  coins,
});

export const CLASS_MISSIONS: Record<ClassId, Mission[]> = {
  gladiador: [
    mission("gladiador-hidratacao", "💧 Poção da Hidratação", "Beber 2,5L de água", 80, 20),
    mission("gladiador-caminhada", "👟 Side Quest: Caminhada", "Caminhar 7.000 passos", 120, 30),
    mission("gladiador-boss-fight", "💪 Boss Fight", "Treinar 40 minutos", 200, 60),
    mission("gladiador-alongamento", "🧘 Alongamento Sagrado", "Alongar por 10 minutos", 60, 15),
    mission("gladiador-exploracao", "🚴 Exploração", "Pedalar por 30 minutos", 180, 50),
    mission("gladiador-sprint", "🏃 Sprint da Arena", "Correr por 20 minutos", 160, 45),
    mission("gladiador-escadaria", "🪜 Escadaria do Castelo", "Subir 10 lances de escada", 90, 25),
    mission("gladiador-combo-fitness", "⚡ Combo Fitness", "Fazer 50 agachamentos", 100, 30),
    mission("gladiador-banquete", "🥗 Banquete Saudável", "Comer uma refeição saudável", 70, 20),
    mission("gladiador-solar", "🌞 Missão Solar", "Caminhar 15 minutos ao ar livre", 90, 25),
    mission("gladiador-descanso", "😴 Descanso do Guerreiro", "Dormir pelo menos 8 horas", 100, 30),
    mission(
      "gladiador-intervalo",
      "🚶 Intervalo Ativo",
      "Levantar e caminhar 5 minutos a cada hora",
      80,
      20,
    ),
  ],
  bardo: [
    mission("bardo-conexao", "🗣 Conexão de Guilda", "Conversar com um amigo", 70, 20),
    mission("bardo-taverna", "☕ Explorando a Taverna", "Fazer uma atividade presencial", 120, 30),
    mission("bardo-olho-no-olho", "📵 Olho no Olho", "Conversar 1 hora sem celular", 180, 50),
    mission("bardo-chamado", "📞 Chamado do Reino", "Ligar para um familiar", 70, 20),
    mission(
      "bardo-cooperativa",
      "🎲 Missão Cooperativa",
      "Jogar um jogo de tabuleiro com alguém",
      120,
      35,
    ),
    mission("bardo-banquete", "🍽 Banquete da Guilda", "Almoçar ou jantar acompanhado", 100, 30),
    mission("bardo-evento", "🎉 Evento da Cidade", "Participar de um evento presencial", 200, 60),
    mission("bardo-aliado", "🤝 Novo Aliado", "Conhecer uma pessoa nova", 150, 40),
    mission("bardo-gentileza", "❤️ Missão Gentileza", "Fazer um elogio sincero", 60, 15),
    mission("bardo-ajuda", "🎁 Ajuda Heroica", "Ajudar alguém durante o dia", 90, 25),
    mission("bardo-familia", "👨‍👩‍👧 Tempo em Família", "Passar 1 hora com a família", 120, 35),
    mission(
      "bardo-clube",
      "📚 Clube dos Heróis",
      "Participar de um grupo de estudos ou leitura",
      130,
      40,
    ),
  ],
  druida: [
    mission("druida-paginas", "📚 Páginas da Sabedoria", "Ler 10 páginas", 90, 20),
    mission("druida-grama", "🌳 Toque na Grama", "15 min ao ar livre", 100, 30),
    mission("druida-blackout", "🌙 Blackout Noturno", "1h sem telas antes de dormir", 210, 60),
    mission("druida-detox", "📴 Detox Digital", "Ficar 2 horas sem redes sociais", 180, 50),
    mission("druida-meditacao", "🧠 Meditação", "Meditar por 10 minutos", 100, 30),
    mission("druida-arte", "🎨 Arte do Sábio", "Desenhar ou pintar por 30 minutos", 120, 35),
    mission("druida-diario", "✍️ Diário da Jornada", "Escrever sobre o dia por 10 minutos", 90, 25),
    mission(
      "druida-harmonia",
      "🎵 Harmonia Interior",
      "Ouvir música relaxante por 20 minutos",
      70,
      20,
    ),
    mission(
      "druida-nascer-do-sol",
      "🌅 Nascer do Sol",
      "Assistir ao nascer ou pôr do sol",
      110,
      30,
    ),
    mission("druida-sono", "🛏 Ritual do Sono", "Dormir antes das 23h", 120, 35),
    mission(
      "druida-desafio-mental",
      "🧩 Desafio Mental",
      "Resolver um quebra-cabeça por 20 minutos",
      100,
      30,
    ),
    mission(
      "druida-aprendizado",
      "📖 Aprendizado Extra",
      "Assistir uma aula ou curso por 30 minutos",
      150,
      45,
    ),
  ],
};

export const UNIVERSAL_MISSIONS: Mission[] = [
  mission("universal-agua", "💦 Água Extra", "Beber mais 500 ml de água", 30, 10),
  mission("universal-ar-livre", "🌞 Ar Livre", "Ficar 20 minutos fora de casa", 80, 20),
  mission(
    "universal-menos-tela",
    "📵 Menos Tela",
    "Reduzir 1 hora do tempo de tela em relação ao dia anterior",
    150,
    40,
  ),
  mission(
    "universal-exploracao",
    "🚶 Exploração",
    "Caminhar até um lugar que normalmente iria de carro",
    120,
    35,
  ),
  mission("universal-nutricao", "🍎 Nutrição", "Comer 3 frutas no dia", 90, 25),
  mission(
    "universal-corpo-saudavel",
    "🚭 Corpo Saudável",
    "Não consumir cigarro ou bebida alcoólica no dia",
    120,
    35,
  ),
  mission(
    "universal-organizacao",
    "🧹 Organização",
    "Organizar o quarto ou mesa de estudos",
    60,
    15,
  ),
  mission(
    "universal-foco",
    "🎯 Missão Foco",
    "Estudar ou trabalhar por 45 minutos sem interrupções",
    140,
    40,
  ),
  mission(
    "universal-positiva",
    "😄 Missão Positiva",
    "Escrever 3 coisas boas que aconteceram no dia",
    70,
    20,
  ),
  mission(
    "universal-explorador",
    "🌍 Explorador",
    "Conhecer um parque, praça ou lugar novo",
    180,
    50,
  ),
];

/** Returns the class missions plus a stable daily sample of universal missions. */
export function getMissions(classId: ClassId, _tier: Tier = "moderado"): Mission[] {
  const day = Math.floor(Date.now() / 86_400_000);
  const offset = day % UNIVERSAL_MISSIONS.length;
  const universal = Array.from({ length: 3 }, (_, index) => {
    return UNIVERSAL_MISSIONS[(offset + index) % UNIVERSAL_MISSIONS.length];
  });
  return [...CLASS_MISSIONS[classId], ...universal];
}

export function getEvolutionStage(totalXp: number): EvolutionStage {
  if (totalXp >= 900) return "adult";
  if (totalXp >= 300) return "teen";
  return "baby";
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
    missions: CLASS_MISSIONS.gladiador,
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
    missions: CLASS_MISSIONS.bardo,
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
    missions: CLASS_MISSIONS.druida,
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
  answers.forEach((answer) => score[answer]++);
  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0] as ClassId;
}
