# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
「AI Dev Lab」は Next.js 15 と Tailwind CSS v4 を使用した技術ドキュメントサイトです。AI開発ツール（Claude Code、Cursor、Windsurf等）の実践的なチュートリアルと資料を提供しています。Cloudflare Workers でホスティングされ、全ページを静的生成しています。

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
- **Next.js 15** - App Router、静的生成（`force-static`）でCloudflare Workers対応
- **Tailwind CSS v4** - `@tailwindcss/postcss`使用、設定ファイル不要
- **MDX** - コンテンツ管理、動的インポートで各レッスンを読み込み
- **TypeScript** - 厳格モード（`strict: true`）
- **Shiki** - シンタックスハイライト（`mdx-components.tsx`で設定）

### ルーティング構造
```
/src/app/
├── (sidebar)/           # サイドバーレイアウト
│   ├── page.tsx        # ホームページ（レッスン一覧）
│   └── [slug]/         # 各レッスンページ（動的ルート）
├── (centered)/         # 中央配置レイアウト
│   ├── interviews/     # インタビュー一覧・詳細
│   └── resources/      # リソースページ
└── (auth)/             # 認証レイアウト（ログイン、OTP）
```

### データアーキテクチャ
- **レッスンシステム**: `/src/data/lessons.ts`がモジュール構造を定義、MDXファイルを動的インポート
- **静的生成**: `generateStaticParams()`で全レッスンのslugを事前生成
- **動画統合**: レッスンメタデータに動画URL、サムネイル、再生時間を含む
- **ナビゲーション**: 各レッスンに次のレッスンへのリンクを自動生成

### MDX処理
- **画像記法**: `![Alt text|幅x高さ](画像パス)` - サイズ指定必須
- **テーマ対応画像**: `{scheme}`プレースホルダーで`light/dark`画像を切り替え
- **コンポーネント**: `<CodeCopy />`でコードブロックにコピー機能を自動追加
- **リモート画像**: `next.config.mjs`の`images.remotePatterns`で許可リストを管理

### コンテンツ追加手順
新しいレッスンを追加:
1. `/src/data/lessons.ts`でレッスンメタデータを該当モジュールに追加
2. `/src/data/lessons/[slug].mdx`ファイルを作成（slugはレッスンIDと一致）
3. 必要に応じて画像を`/public`に配置

新しいインタビューを追加:
1. `/src/data/interviews.ts`でインタビューメタデータを追加
2. `/src/data/interviews/[slug].mdx`ファイルを作成