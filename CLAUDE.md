# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
「AI Dev Lab」はAI開発ツール（Claude Code、Cursor、Windsurf等）の実践的なチュートリアルと資料を提供する技術ドキュメントサイトです。

## 開発コマンド

```bash
# 開発サーバーの起動（localhost:3000）
npm run dev

# プロダクションビルド（静的生成）
npm run build

# プロダクションサーバーの起動（ビルド後）
npm start

# Lintの実行（Next.js ESLint）
npm run lint

# コードフォーマット（Prettier使用 - Tailwind CSS、import整理プラグイン含む）
npm run format
```

## アーキテクチャ構造

### 技術スタック
- **Next.js 15** - App Router、ページは静的生成
- **Tailwind CSS v4** - `@tailwindcss/postcss`使用、設定ファイル不要
- **MDX** - `/src/data/lessons/`および`/src/data/interviews/`でコンテンツ管理
- **TypeScript** - 厳格モード（`strict: true`）、パスエイリアス`@/*`を`./src/*`にマップ
- **Shiki** - シンタックスハイライト（`mdx-components.tsx`で設定）

### ルーティング構造
- `(sidebar)` グループ - サイドバー付きレイアウト（ホーム、レッスン詳細）
- `(centered)` グループ - 中央配置レイアウト（インタビュー、リソース）
- `(auth)` グループ - 認証関連ページ（ログイン、OTP）

### データ管理
- **レッスン**: `/src/data/lessons.ts`でメタデータ定義、MDXファイルを動的インポート
- **インタビュー**: `/src/data/interviews.ts`でメタデータ定義
- **静的生成**: `generateStaticParams()`で全ページのslugを事前生成

### MDX画像処理
- サイズ指定必須: `![Alt text|幅x高さ](画像パス)`
- テーマ対応: `{scheme}`プレースホルダーで`light/dark`画像切り替え
- リモート画像: `next.config.mjs`の`images.remotePatterns`で許可リスト管理

### コンテンツ追加
新しいレッスン:
1. `/src/data/lessons.ts`にメタデータ追加
2. `/src/data/lessons/[slug].mdx`ファイル作成

新しいインタビュー:
1. `/src/data/interviews.ts`にメタデータ追加
2. `/src/data/interviews/[slug].mdx`ファイル作成