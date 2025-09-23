export type LessonGroup = {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
};

export type Module = {
  id: string;
  /** カテゴリ名（左カラムのラベルに使用） */
  category: string;
  title: string;
  description: string;
  lessons: Lesson[];
  groups?: LessonGroup[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  video: {
    thumbnail: string;
    duration: number;
    url: string;
  } | null;
};

export function getModules(): Module[] {
  return lessons;
}

export async function getLesson(
  slug: string,
): Promise<(Lesson & { module: Module; next: Lesson | null }) | null> {
  let module = lessons.find(({ lessons }) =>
    lessons.some(({ id }) => id === slug),
  );

  if (!module) {
    return null;
  }

  let index = module.lessons.findIndex(({ id }) => id === slug);

  return {
    ...module.lessons[index],
    module,
    next: index < module.lessons.length - 1 ? module.lessons[index + 1] : null,
  };
}

export async function getLessonContent(slug: string) {
  return (await import(`@/data/lessons/${slug}.mdx`)).default;
}

const gitFundamentalsLessons: Lesson[] = [
  {
    id: "git-overview",
    title: "Git基礎1：なぜ必要なのか？",
    description:
      "コマンドなしで Git の価値と AI 開発での使いどころを理解する超入門。",
    video: null,
  },
  {
    id: "git-install",
    title: "Git基礎2：インストールと初期設定",
    description:
      "Windows / macOS での導入手順と初期設定をまとめたハンズオン。",
    video: null,
  },
  {
    id: "git-basics",
    title: "Git基礎3：変更を記録する超基礎サイクル",
    description:
      "git status → git add → git commit → git restore の一連の流れを体験。",
    video: null,
  },
  {
    id: "git-branch-intro",
    title: "Gitブランチ編：安全に試すための分岐運用",
    description:
      "ブランチの考え方と switch / merge / cleanup の基本操作を学ぶ。",
    video: null,
  },
  {
    id: "github-basics",
    title: "GitHub編：リモート連携と共同作業の第一歩",
    description:
      "リモートリポジトリの作成・push/pull・Cloneまでを超初心者向けに整理。",
    video: null,
  },
];

const lessons: Module[] = [
  {
    id: "coding-agents-ide",
    category: "コーディングエージェントとIDE",
    title: "コーディングエージェントとIDE活用",
    description:
      "ローカル/ターミナルのAIコーディング支援ツールから、IDE統合型アシストまでをまとめて解説します。",
    lessons: [
      {
        id: "claude-code-setup",
        title: "ClaudeCode導入＆初期設定",
        description:
          "Windowsでの導入、サブスクでのログイン確認、初期推奨コマンド。",
        video: null,
      },
      {
        id: "codex-cli-getting-started",
        title: "明日から使える『Codex CLI』超入門（Windows & macOS）",
        description:
          "導入 → 基本コマンド → プロンプト実行を一気に体験。",
        video: null,
      },
    ],
  },
  {
    id: "ai-fundamentals",
    category: "AI開発必須知識",
    title: "AI開発必須知識",
    description:
      "AI開発に取り組む前に押さえておきたい基礎概念・設計指針・リスク管理を体系的に整理します。",
    lessons: gitFundamentalsLessons,
    groups: [
      {
        id: "ai-fundamentals-git",
        title: "Git / GitHub 基礎パック",
        lessons: gitFundamentalsLessons,
      },
    ],
  },
  {
    id: "ai-services",
    category: "最新AIサービス",
    title: "最新AIサービス セットアップ＆活用",
    description:
      "主要AIプラットフォームの特徴と導入・比較・ユースケースをまとめます。",
    lessons: [],
  },
];
