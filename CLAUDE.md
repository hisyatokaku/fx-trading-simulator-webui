# FX Trading Simulator WebUI - Claude Memory

## プロジェクト概要
Vite + React + TypeScriptで構築されたFXトレーディングシミュレータのWebUIです。

## 環境別設定

### ローカル開発環境
- `.env` / `.env.local`: `VITE_API_BASE_URL=http://localhost:8080`
- Dockerコンテナのバックエンドに直接アクセス
- Dev Containersでの開発をサポート

### 本番環境（Netlify）
- `.env.production`: `VITE_API_BASE_URL=""` (空文字)
- 空文字 = 相対パス（`/api/*`）でNetlifyプロキシを使用
- HTTPSからHTTPバックエンドへのプロキシ設定

## Netlifyデプロイ設定

### 必須設定
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18以上

### 環境変数
```
VITE_API_BASE_URL=""
```

### プロキシ設定（netlify.toml）
```toml
[[redirects]]
  from = "/api/*"
  to = "http://os3-389-27987.vs.sakura.ne.jp/api/:splat"
  status = 200
  force = true
```

### バックエンドサーバー
- **URL**: `http://os3-389-27987.vs.sakura.ne.jp`
- **Port**: 80（HTTPS→HTTPプロキシ）
- **API Documentation**: https://os3-389-27987.vs.sakura.ne.jp/swagger-ui/index.html

## APIの使い分け（src/utils/api.ts）
```typescript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// 本番環境では空文字（相対パス）、ローカルではlocalhost:8080
if (apiBaseUrl !== undefined) {
  const response = await fetch(`${apiBaseUrl}/api/trade/sessions/userId/${userId}`);
}
```

## ファイル構成
- `netlify.toml`: プロキシ＋SPA設定
- `.env.production`: 本番環境変数
- `.env` / `.env.local`: ローカル環境変数
- `src/utils/api.ts`: API呼び出しロジック

## 注意点
- バックエンドサーバーのIPが変更される場合は`netlify.toml`の`to`を更新
- HTTPSからHTTPへのプロキシなのでSSL終端はNetlify側
- CORS設定はNetlifyプロキシ経由なので不要