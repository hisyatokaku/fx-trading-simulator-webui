# Project

Google Colab - https://colab.research.google.com/drive/1srkCLVcUJCL0uotRwqD2uTO6iMt1Az2Z?usp=sharing

Netlify - https://fx-trading-simulator-webui.netlify.app/

WEB service - https://github.com/henohenotsuyoshi/fx-trading-simulator-api

API swagger - https://os3-389-27987.vs.sakura.ne.jp/swagger-ui/index.html


![image](https://github.com/user-attachments/assets/031eb116-521e-46d0-a1a9-abe25b065feb)

# ビルド方法
詳しくはバックエンドのREADME.mdを参照。
Dockerアプリと、VS Codeと、VS CodeのDev Containers拡張機能が必要です。

## Dev Containersの使い方
プロジェクトを開いて、Ctrl + Shift + Pを押して、コマンドパレットを開き、「Dev Containers: Reopen in Container」を選択します。
新しいウィンドウが立ちあがり、コンテナがビルドされます。数分かかります。

## UIが立ち上がっているか確認
ビルドが完了したら、npm run devが勝手に実行されているはずなので、localhost:5173にアクセスして、アプリケーションを確認できます。
.devcontainer/devcontainer.jsonのpostStartCommandを変更することで、コンテナ起動時に実行されるコマンドを変更できます。

# Netlifyデプロイ設定

## 本番環境（Netlify）
- **Site URL**: https://fx-trading-simulator-webui.netlify.app/
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18以上

## 環境変数設定
```
VITE_API_BASE_URL=""
```
※空文字により相対パス（`/api/*`）でNetlifyプロキシを使用

## バックエンドAPI
- **API URL**: http://os3-389-27987.vs.sakura.ne.jp
- **Swagger UI**: https://os3-389-27987.vs.sakura.ne.jp/swagger-ui/index.html
- **プロキシ設定**: `netlify.toml`でHTTPS→HTTPプロキシ

## 環境の使い分け
- **ローカル**: `VITE_API_BASE_URL=http://localhost:8080`（Docker直接アクセス）
- **本番**: `VITE_API_BASE_URL=""`（Netlifyプロキシ経由）

詳細な設定情報は`CLAUDE.md`を参照してください。

