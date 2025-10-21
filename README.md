# manga-scrape-local

マンガ新刊情報を自動でスクレイピングし、LINE やメールで通知する Node.js + TypeScript プロジェクトです。

## 機能

- 指定したウェブサイトから新刊マンガ情報を取得
- 自分が購読しているマンガのみを抽出
- LINE・メール通知機能
- 月 1 回の自動実行（macOS LaunchAgent 対応）

## ディレクトリ構成

```
.
├── src/
│   ├── index.ts
│   ├── myMangaList.ts
│   ├── application/
│   │   └── useCase/
│   │       └── scrapeMangaUseCase.ts
│   ├── domain/
│   │   ├── entities/
│   │   │   └── manga.ts
│   │   └── services/
│   │       └── mangaService.ts
│   └── infrastructure/
│       ├── notification/
│       │   ├── emailNotifier.ts
│       │   ├── INotification.ts
│       │   └── lineNotifier.ts
│       └── scraping/
│           ├── IScraper.ts
│           ├── webScraperCheerio.ts
│           └── webScraperPuppeteer.ts
├── logs/
│   ├── cron.node.log
│   └── cron.node.err.log
├── start-app.sh
├── sample.plist
├── package.json
├── tsconfig.json
└── .env
```

## セットアップ

1. **依存パッケージのインストール**

   ```sh
   pnpm install
   ```

2. **ビルド**

   ```sh
   pnpm run build
   ```

3. **環境変数ファイル [`.env`](.env) の作成**

   必要な API キーや認証情報を [`.env`](.env) に記載してください。

4. **購読マンガリストの編集**

   [`src/myMangaList.ts`](src/myMangaList.ts) の [`myMangaList`](src/myMangaList.ts) 配列を編集してください。

5. **自動実行スクリプトのパス確認**

   `start-app.sh` にある作業ディレクトリ指定（`cd /Users/ryusei/dev/manga-scrape-local`）は、このリポジトリを置いた場所によって変わります。macOS の LaunchAgent や手動でスクリプトを実行する前に、必ず自分の環境に合わせてパスを更新してください。

   例: リポジトリを `~/projects/manga-scrape-local` に置いた場合は、`start-app.sh` を以下のように編集します:

   ```sh
   #!/bin/bash
   set -e

   echo "=== $(date '+%Y-%m-%d %H:%M:%S') - Starting Node App ==="

   cd /Users/your-username/projects/manga-scrape-local || exit 1
   node --env-file=.env ./dist/index.js

   echo "=== $(date '+%Y-%m-%d %H:%M:%S') - Completed Successfully ==="
   ```

   注意: `your-username` はご自身の macOS ユーザー名（`echo $USER` で確認可能）に置き換えてください。`zsh` を使っている場合も同様です。

## 実行方法

- **手動実行**

  ```sh
  pnpm run dev
  ```

- **TypeScript ソースから直接実行**

  ```sh
  pnpm run dev:ts-node
  ```

- **macOS LaunchAgent による自動実行**

  1. [`sample.plist`](sample.plist) を [`/Users/tryu/Library/LaunchAgents/manga-scrape.plist`](/Users/tryu/Library/LaunchAgents/manga-scrape.plist) にコピー
  2. plist を編集し、必要に応じてパスを修正
  3. タスク登録

     ```sh
     pnpm run load-task
     ```

  4. ログは [`logs/cron.node.log`](logs/cron.node.log) および [`logs/cron.node.err.log`](logs/cron.node.err.log) に出力されます

## 主要ファイル・クラス

- スクレイピング: [`WebScraperCheerio`](src/infrastructure/scraping/webScraperCheerio.ts)
- 通知: [`LineNotifier`](src/infrastructure/notification/lineNotifier.ts), [`EmailNotifier`](src/infrastructure/notification/emailNotifier.ts)
- ユースケース: [`ScrapeMangaUseCase`](src/application/useCase/scrapeMangaUseCase.ts)
- マンガフィルタ・メッセージ生成: [`MangaService`](src/domain/services/mangaService.ts)
