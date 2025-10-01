import { ScrapeMangaUseCase } from "./application/useCase/scrapeMangaUseCase";
import { WebScraperCheerio } from "./infrastructure/scraping/webScraperCheerio";
import { EmailNotifier } from "./infrastructure/notification/emailNotifier";
import { LineNotifier } from "./infrastructure/notification/lineNotifier";
import { myMangaList } from "./myMangaList";
import { MangaService } from "./domain/services/mangaService";

async function main() {
  try {
    const scrapingUrl = "https://www.navi-comi.com/20488/arrival-list/";
    const storeName = "快活クラブ 栄広小路店";
    const mangaService = new MangaService(storeName);
    const scraper = new WebScraperCheerio();
    const notifier = new LineNotifier();
    const useCase = new ScrapeMangaUseCase(mangaService, scraper, notifier, myMangaList, scrapingUrl);
    await useCase.execute();

    console.log("Manga scraping completed successfully");
    return true;
  } catch (error) {
    const notifier = new EmailNotifier();
    await notifier.send("マンガスクレイピングでエラーが発生しました。ログを確認してください。");
    console.error("Error in main:", error);
    return false;
  }
}

main();
