export interface Book {
  guid: string;
  title: string;
  slug: string;
  author: string;
  description: string;
  pages: BookePage[];
}

export interface BookePage {
  number: number;
  chapter: string;
  content: string;
}