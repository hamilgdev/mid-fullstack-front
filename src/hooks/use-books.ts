import { useCallback, useState } from "react"

import type { Book } from "@/interfaces/book.interface";
import { getBookBySlug, getBooks } from "@/services/book.service";
import { HttpStatus } from "@/config/constants.config";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[] | null>(null)
  const [book, setBook] = useState<Book | null>(null);

  const [onAir, setOnAir] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetcherGetBooks = useCallback(async () => {
    try {
      const response = await getBooks()
      if (response.status === HttpStatus.OK) {
        setBooks(response.data);
        return response;
      }
      setBooks(null);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks(null);
    } finally {
      setIsLoading(false);
      setOnAir(false);
    }
  }, []);

  const fetcherGetBookBySlug = useCallback(async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await getBookBySlug(slug);
      if (response.status === HttpStatus.OK) {
        setBook(response.data[0] || null);
        return response;
      }
      setBook(null);
    } catch (error) {
      console.error('Error fetching book:', error);
      setBook(null);
    } finally {
      setIsLoading(false);
      setOnAir(false);
    }
  }, []);

  return {
    // State
    books,
    book,

    // loading state
    onAir,
    isLoading,

    // Fetchers
    fetcherGetBooks,
    fetcherGetBookBySlug
  }
}

