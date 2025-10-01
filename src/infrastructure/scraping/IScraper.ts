import { Manga } from "../../domain/entities/manga";

export interface IScraper {
  scrapeMangaList(url: string): Promise<Manga[]>;
}
