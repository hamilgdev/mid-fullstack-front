import { httpApi } from "@/services/api/httpApi";

import type { Book } from "@/interfaces/book.interface";

export const getBooks = async () => {
  return httpApi.get<Book[]>('/books');
}

export const getBookBySlug = async (slug: string) => {
  return httpApi.get<Book[]>(`/books?slug=${slug}`);
}