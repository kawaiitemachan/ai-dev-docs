# リポジトリガイドライン

> 本書は「増築型」で運用します。新しい知見は追記を基本とし、削除・置換は理由を明記します。管理対象セクションは HTML コメントのマーカーで囲み、再実行時に冪等に差分更新します。

## 1) 概要

<!-- codex-managed:start overview -->
このリポジトリは、セミナー/講義のドキュメントを公開するための Next.js + MDX サイトです。ダーク基調の最小構成で、トップのヒーロー背景はローカル画像に差し替えてあります。

- 技術スタック: Next.js 15 / React 19 / MDX / Tailwind CSS v4 / TypeScript
- 主な入口:
  - 開発: `npm run dev`（ポートはデフォルトで 3000）
  - 本番ビルド: `npm run build` → `npm run start`
- 画像アセット: `public/images/`（例: `top-background.png`）
- 目的: セミナー資料を「すぐ試せる形」で集約し、復習・導入を容易にする
<!-- codex-managed:end overview -->

## 2) ワークスペース構成

<!-- codex-managed:start workspace -->
本プロジェクトは単一の Next.js アプリです。主要ディレクトリ:

- `src/app/` … App Router 構成
  - `(sidebar)/page.tsx` … トップページ（ヒーロー背景あり）
  - `(sidebar)/[slug]/page.tsx` … 各レッスンページ
  - `(centered)/interviews/*` … インタビュー系ページ
- `src/components/` … UI コンポーネント群
- `src/data/lessons/*.mdx` … レッスン本文（MDX）
- `src/data/interviews*` … インタビュー関連データ
- `public/images/` … 画像アセット（背景画像など）
- `next.config.mjs` … MDX 連携と `images.remotePatterns` 設定
<!-- codex-managed:end workspace -->

## 3) ビルド/整形/静的解析/実行

<!-- codex-managed:start build -->
NPM スクリプト（`package.json`）:

- `npm run dev` … 開発サーバ起動
- `npm run build` … 本番ビルド
- `npm run start` … 本番サーバ起動
- `npm run lint` … Next.js 標準 ESLint
- `npm run format` … Prettier で整形（Tailwind 並べ替え含む）

Cloudflare Workers デプロイ関連（OpenNext を採用）:

- `npm run cf:dev` … Cloudflare Workers 上で開発（ローカルプレビュー）
- `npm run cf:build` … Workers 用にビルド
- `npm run cf:deploy` … 本番デプロイ（`wrangler` がログイン済みであること）

補足:
- Node は LTS を推奨（詳細はドキュメントのインストール章を参照）。
- 画像最適化は Next.js の仕組みを使う場合は `next/image` を検討。現状トップは `<img>` でローカル画像を読み込み。
<!-- codex-managed:end build -->

## 4) テスト方針

<!-- codex-managed:start tests -->
現状、自動テストは未整備です。将来導入候補:

- 単体/結合: Jest or Vitest + React Testing Library
- E2E: Playwright（主要フロー: トップ → レッスン閲覧）

導入時の基本方針:
- コンポーネントはアクセシビリティ（`getByRole` 等）で選択
- コンテンツ（MDX）はスナップショットを多用しすぎない（差分ノイズ抑制）
<!-- codex-managed:end tests -->

## 5) スナップショットテスト（将来用）

<!-- codex-managed:start snapshot-tests -->
現時点では未採用。導入する場合は以下のように運用します（例: `insta` 相当の手順を Playwright/Jest に読み替え）。

- 生成差分は PR で必ずレビュー
- 意図的な UI 変更のみスナップショットを更新
<!-- codex-managed:end snapshot-tests -->

## 6) コーディング/スタイル規約

<!-- codex-managed:start conventions -->
- 言語: TypeScript（`.ts`/`.tsx`）。コンポーネントはパスカルケース。
- 整形: Prettier 3（`npm run format`）。`prettier-plugin-tailwindcss` と `prettier-plugin-organize-imports` を使用。
- CSS: Tailwind CSS v4。クラス順序はプラグインに準拠。ユーティリティの重複定義を避ける。
- アセット: 画像は `public/images/`。汎用名は `hero-bg.*` などに統一。
- アクセシビリティ: テキストを持たない装飾画像は `alt=""`。
<!-- codex-managed:end conventions -->

## 7) コミット/プルリクエスト ガイドライン

<!-- codex-managed:start vcs -->
- コミット規約: Conventional Commits を推奨（例: `feat:`, `fix:`, `docs:`, `chore:`）。
- 例: `chore(init): import project and wire hero background + docs fixes`
- PR には以下を含める:
  - 目的/背景、変更点の要約
  - スクリーンショット（UI 変更時）
  - 影響範囲とリスク、ロールバック手順
<!-- codex-managed:end vcs -->

## 8) 承認/運用

<!-- codex-managed:start approvals -->
- Codex CLI の承認モードは基本「on-request」。破壊的操作（`rm -rf`、`git reset` 等）やネットワークを伴う操作（`git push`、`npm install`）は事前に合意を取る。
- 自動化スクリプトはドライラン/明示フラグを用意する。
<!-- codex-managed:end approvals -->

## 9) サンドボックス/安全性

<!-- codex-managed:start sandbox -->
- 既定はネットワーク制限あり。外部通信が必要な場合は理由を明記して承認を得る。
- 公開鍵/シークレット、個人情報はコミットしない（`.env*` は `.gitignore` 済み）。
- 画像・動画等の大容量ファイルは極力圧縮（WebP/AVIF 推奨）。
<!-- codex-managed:end sandbox -->

## 10) 設計判断（ADR）/履歴

<!-- codex-managed:start adr -->
- 2025-09-02: ヒーロー背景画像をローカル参照（`public/images/top-background.png`）に統一。
- 2025-09-02: ドキュメントに Node.js 公式 LTS リンクと macOS Homebrew 経路を追記。
<!-- codex-managed:end adr -->

## 11) Doc TODO / Open Questions

<!-- codex-managed:start todo -->
- [ ] ヒーロー背景の WebP/AVIF 変換と `<picture>` 対応（ダーク/ライト別）
- [ ] 簡易 E2E（Playwright）導入の検討
- [ ] SEO/メタデータ方針（`app/` の `metadata` 最適化）
- [ ] 画像アクセントカラーのガイドライン化（teal/indigo トーン）
<!-- codex-managed:end todo -->

---

Last Updated: 2025-09-02
