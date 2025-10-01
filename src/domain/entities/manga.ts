export interface Manga {
  title: string;
  releaseDate: string;
}

export class MangaEntity implements Manga {
  constructor(public title: string, public releaseDate: string) {
    if (!title) {
      throw new Error("タイトルは必須です");
    }

    if (!releaseDate) {
      throw new Error("発売日は必須です");
    }
  }
}
