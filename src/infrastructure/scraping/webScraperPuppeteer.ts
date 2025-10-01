import { Manga } from "../../domain/entities/manga";
import { IScraper } from "./IScraper";

export class WebScraperPuppeteer implements IScraper {
  async scrapeMangaList(url: string): Promise<Manga[]> {
    return [];
  }
}
