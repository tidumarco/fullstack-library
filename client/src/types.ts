export type Book = {
  ISBN: string;
  title: string;
  description: string;
  publisher: string
  publishedDate: Date
  authors: {}[];
  borrowerId: string[];
  borrowDate: Date;
  returnDate: Date;
  adminId: string[];
  category: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BooksState = {
  items: Book[];
  isLoading: boolean;
  error: null;
};

export type AppState = {
  books: BooksState;
};

export type BasicTable = {
  filter: Book[];
};

export interface SearchProps {
	handleChange: (e: any) => void
  }