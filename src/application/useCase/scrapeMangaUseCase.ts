import { IMangaService } from "../../domain/services/mangaService";
import { INotifier } from "../../infrastructure/notification/INotification";
import { IScraper } from "../../infrastructure/scraping/IScraper";

export class ScrapeMangaUseCase {
  constructor(
    private mangaService: IMangaService,
    private scraper: IScraper,
    private notifier: INotifier,
    private myMangaList: string[],
    private scrapingUrl: string
  ) {}

  async execute(): Promise<void> {
    try {
      // 1. スクレイピングで新刊情報を取得
      const allManga = await this.scraper.scrapeMangaList(this.scrapingUrl);

      // 2. 自分の読んでいる漫画のみをフィルタリング
      const myNewMangaList = this.mangaService.filterMyManga(allManga, this.myMangaList);

      // 3. 通知用のメッセージ作成
      const message = this.mangaService.createMessageFromMangaList(myNewMangaList);

      // 4. 通知を送信
      await this.notifier.send(message);
    } catch (error) {
      console.error("Error in ScrapeMangaUseCase:", error);
      throw error;
    }
  }
}
