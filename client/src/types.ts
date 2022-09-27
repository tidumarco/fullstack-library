export type Book = {
  _id?: string;
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  publishedDate: Date;
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

export type UpdatedBook = {
  _id?: string;
  ISBN?: string;
  title?: string;
  description?: string;
  publisher?: string;
  publishedDate?: Date;
  authors?: {}[];
  borrowerId?: string[];
  borrowDate?: Date;
  returnDate?: Date;
  adminId?: string[];
  category?: string;
  available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type BooksState = {
  items: Book[];
  isLoading: boolean;
  error: null;
};

export type AppState = {
  books: BooksState;
};

export type PutType = {
	bookId: string;
	updatedBook: UpdatedBook;
  };