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

## ドキュメントスタイルガイド（共通ルール）

- `Subheading` コンポーネント（`catalyst-ui-kit/typescript/heading.tsx`）は **レベル2 / 3 の見出しデザインを自動適用**します。`className` で余白を補正する場合も、背景色や枠線を個別指定しないこと。
- レベル2見出しは `prose-heading prose-heading-lg`、レベル3見出しは `prose-heading prose-heading-step` が自動付与されます。デザインは `src/app/typography.css` の `.prose-heading-*` で一元管理されるため、スタイル変更はここで実施してください。
- 既存MDXで手動設定していた `border` / `bg-*` / `shadow` 等は削除済み。今後追加する際も **追加のユーティリティは余白 (`mt-*` など) のみ** に留めます。
- レベル2見出しはスカイ（ブルー）系、レベル3見出しはインディゴ系のカードデザイン。カラーを変更する場合は `src/app/typography.css` の `.prose-heading-lg`／`.prose-heading-step` を更新し、全ドキュメントで統一すること。
- 例え話・ストーリーテリングのボックスは `div.mt-3.analogy-card` を使用し、`src/app/typography.css` に定義した共通スタイル（アンバー系配色）に従うこと。個別の `border` や `bg-*` クラスは付けない。
- 新しい記事やセクションを作成する前に、本ファイルのスタイルガイドと `src/app/typography.css` のテンプレート定義を必ず確認し、既存デザインから逸脱しないようにする。
- 外部リンクはデフォルトで新規タブを開くよう `Link` コンポーネント（`catalyst-ui-kit/typescript/link.tsx`）で制御しています。生の `<a>` を使う場合も `target="_blank" rel="noopener noreferrer"` を付与してください。
- コードブロックはコピーしやすい形で記述する（プロンプト記号や不要な出力を含めない）こと。`CodeBlockPanel`（`src/components/code-block.tsx`）でコピー機能が提供されるため、ブロック内はそのまま実行できる最小構成を心がける。
- 当サイトのドキュメントは「開発の基礎知識がない超初心者」を主対象とする。エンジニアが日常的に使う専門用語・コマンドが登場する場合は、<Strong>用語メモ</Strong>や<Strong>補足カード</Strong>、<Strong>たとえ</Strong>を積極的に挿入し、抽象的な概念もイメージできるように説明を補うこと。
- サイドパネル（左ナビ）は最下層（個別ドキュメントのリンク）以外すべて折りたたみ可能であること。モジュール → サブグループ → レッスンの階層を維持し、グループも見出しボタンで開閉できるように実装・調整する。
