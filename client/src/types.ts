export type Book = {
  _id?: string;
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  publishedDate: Date;
  authors: {
    firstName: string;
    lastName: string;
  };
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
  authors?: {
    firstName: string;
    lastName: string;
  };
  borrowerId?: string[];
  borrowDate?: Date;
  returnDate?: Date;
  adminId?: string[];
  category?: string;
  available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface BooksState {
	allBooks: Book[];
	singleBook: Book;
	isLoading: boolean;
  }

export type AppState = {
  books: BooksState;
};

export type PutType = {
  bookId: string;
  updatedBook: UpdatedBook;
};

export const initialState: BooksState = {
	allBooks: [],
	singleBook: {
	  _id: "",
	  ISBN: "",
	  title: "",
	  description: "",
	  publisher: "",
	  publishedDate: new Date(),
	  authors: {
		firstName: "",
		lastName: "",
	  },
	  borrowerId: [],
	  borrowDate: new Date(),
	  returnDate: new Date(),
	  adminId: [],
	  category: "",
	  available: true,
	  createdAt: new Date(),
	  updatedAt: new Date(),
	},
	isLoading: false,
  };