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

