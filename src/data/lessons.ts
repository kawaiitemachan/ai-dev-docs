export type Module = {
  id: string;
  /** カテゴリ名（左カラムのラベルに使用） */
  category: string;
  title: string;
  description: string;
  lessons: Lesson[];
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

const lessons: Module[] = [
  {
    id: "coding-agents",
    category: "コーディングエージェント",
    title: "コーディングエージェント",
    description:
      "ローカル/ターミナルで動く生成AIのコーディング支援ツール群。導入と基本操作、ベストプラクティスをまとめます。",
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
    id: "ai-services",
    category: "最新AIサービス",
    title: "最新AIサービス セットアップ＆活用",
    description:
      "主要AIプラットフォームの特徴と導入・比較・ユースケースをまとめます。",
    lessons: [],
  },
  {
    id: "ai-ide",
    category: "AI統合型IDE",
    title: "AI統合IDEの使いこなし",
    description:
      "VS Code/JetBrains系のAIアシストや拡張の導入・活用ベストプラクティス。",
    lessons: [],
  },
];
