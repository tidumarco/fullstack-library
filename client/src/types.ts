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
  // singleBook: Book;
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
  // singleBook: {
  //   _id: "",
  //   ISBN: "",
  //   title: "",
  //   description: "",
  //   publisher: "",
  //   publishedDate: new Date(),
  //   authors: {
  // 	firstName: "",
  // 	lastName: "",
  //   },
  //   borrowerId: [],
  //   borrowDate: new Date(),
  //   returnDate: new Date(),
  //   adminId: [],
  //   category: "",
  //   available: true,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
  isLoading: false,
};

export type SearchBarProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  ISBN: string;
  title: string;
};

export type AddBookProps = {
  handleBookSubmit: React.FormEventHandler<HTMLFormElement>;
  handleBookChange: React.ChangeEventHandler<HTMLInputElement>;
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  publishedDate: Date;
  authors: {
    firstName: string;
    lastName: string;
  };
  borrowerId: string;
  adminId: string;
  category: string;
  available: boolean;
};

export type Author = {
  _id?: string;
  firstName: string;
  lastName: string;
};
export type PutAuthorType = {
  authorId: string;
  updatedAuthor: UpdatedAuthor;
};

export type UpdatedAuthor = {
  _id?: string;
  firstName: string;
  lastName: string;
};
