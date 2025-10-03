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
