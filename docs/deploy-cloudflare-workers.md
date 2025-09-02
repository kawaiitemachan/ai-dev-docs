# Cloudflare Workers へのデプロイ手順（OpenNext）

このプロジェクトは Next.js を Cloudflare Workers にデプロイするために [OpenNext](https://opennext.js.org/) を利用します。

## 前提
- Cloudflare アカウント
- `npm` が利用可能
- ローカルで `wrangler` にログイン済み（初回のみ）

```bash
npm i -D opennext wrangler
npx wrangler login
```

## コマンド

- ローカルプレビュー（Workers ランタイムで実行）

```bash
npm run cf:dev
```

- ビルド（Workers 用アーティファクトの作成）

```bash
npm run cf:build
```

- デプロイ（本番）

```bash
npm run cf:deploy
```

> 初回デプロイ時にプロジェクト作成やバインディング確認のプロンプトが出る場合があります。指示に従って進めてください。

## 環境変数
現状このサイトで必須のシークレットはありませんが、必要になった場合は `wrangler secret put NAME` で登録し、`process.env.NAME` から参照します。

## 注意
- 画像最適化（`next/image`）は OpenNext の機能で Workers に対応しています。
- Pages ではなく Workers へデプロイする構成です。Pages を使う場合は Cloudflare 公式の `@cloudflare/next-on-pages` を選択してください。
