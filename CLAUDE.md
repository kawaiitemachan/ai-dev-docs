# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
このプロジェクトは、Tailwind CSS と Next.js を使用した技術ドキュメントサイト「Seminar Public Docs」です。主にコーディングエージェント、最新AIサービス、AI統合型IDEに関するチュートリアルと資料を提供しています。

## 開発コマンド

### 基本コマンド
```bash
# 開発サーバーの起動（localhost:3000）
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバーの起動（ビルド後）
npm start

# Lintの実行
npm run lint

# コードフォーマット（Prettier使用）
npm run format
```

## アーキテクチャ構造

### コアテクノロジー
- **Next.js 15** - App Router を使用
- **Tailwind CSS v4** - スタイリング（`@tailwindcss/postcss` 使用）
- **MDX** - マークダウンベースのコンテンツ管理（`@next/mdx` 設定済み）
- **TypeScript** - 型安全性（厳格モード）
- **Shiki** - コードハイライト

### ディレクトリ構造
- `/src/app/` - Next.js App Router のルートとレイアウト
  - `(sidebar)/` - サイドバー付きレイアウトのページ群（ドキュメント）
  - `(centered)/` - 中央配置レイアウトのページ群（インタビュー、リソース）
  - `(auth)/` - 認証関連ページ（ログイン、OTP）
- `/src/components/` - 再利用可能なReactコンポーネント
- `/src/data/` - データと設定
  - `lessons.ts` - レッスンのメタデータと構造定義
  - `lessons/*.mdx` - 各レッスンのMDXコンテンツ
  - `interviews.ts` - インタビューデータ
  - `interviews/*.mdx` - 各インタビューのMDXコンテンツ

### コンテンツ管理
- レッスンは`/src/data/lessons.ts`でモジュール（カテゴリ）別に管理
- 各レッスンのコンテンツは`/src/data/lessons/[id].mdx`として保存
- 静的生成（`force-static`）により Cloudflare Workers でのデプロイに対応
- 動画情報（thumbnail、duration、url）はレッスンメタデータに含まれる

### MDX画像の取り扱い
- 画像は必ずサイズ指定が必要: `![Alt text|幅x高さ](画像パス)`
- ライト/ダークモード対応: `![Alt text|幅x高さ](my-image.{scheme}.png)`
  - `my-image.light.png` - ライトモード用
  - `my-image.dark.png` - ダークモード用
- リモート画像を使用する場合は `next.config.mjs` の `images.remotePatterns` を更新

### 重要な設計パターン
- **静的サイト生成**: `generateStaticParams`を使用して全ページを事前レンダリング
- **MDXコンポーネント**: `CodeCopy`など、MDX内で使用される特殊コンポーネント（`mdx-components.tsx`で定義）
- **レイアウトシステム**: 3つの異なるレイアウト（sidebar、centered、auth）を用途別に使用
- **パスエイリアス**: `@/`は`./src/`を指す（tsconfig.json で設定）
- **メタデータ生成**: 各ページで `generateMetadata` を使用してSEO最適化

### コーディング規約
- TypeScriptの厳格モード（`strict: true`）を使用
- コンポーネントは関数コンポーネントで実装
- 非同期処理には`async/await`を使用
- 画像はNext.jsの`<Image>`コンポーネントを使用し、サイズ指定必須
- Prettierでフォーマット（Tailwind CSSプラグイン、インポート整理プラグイン含む）