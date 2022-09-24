export type Book = {
  ISBN: string;
  title: string;
  description: string;
  authors: string[];
  borrowerId: string[];
  adminId: string[];
  category: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  timestamps: boolean
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