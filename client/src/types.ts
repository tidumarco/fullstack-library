export type Book = {
  _id: string;
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  publishedDate: Date;
  borrowerId: string[];
  borrowDate: Date;
  authors: (string | Author)[];
  returnDate: Date;
  adminId: string;
  category: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdatedBook = Partial<Book>;

export interface BooksState {
  allBooks: Book[];
  isLoading: boolean;
}

export type Author = {
  _id?: string;
  firstName: string;
  lastName: string;
};

export type AppState = {
  books: BooksState;
};

export type PutType = {
  bookId: string;
  updatedBook: UpdatedBook;
};

export type SearchBarProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  ISBN: string;
  title: string;
  authors: string;
  category: string;
};

export type AddBookProps = {
  handleBookSubmit: React.FormEventHandler<HTMLFormElement>;
  handleBookChange: React.ChangeEventHandler<HTMLInputElement>;
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  publishedDate: Date;
  authors: Author[];
  borrowerId: string;
  adminId: string;
  category: string;
  available: boolean;
};

export type AuthorData = {
  _id?: string;
  firstName: string;
  lastName: string;
};

export type DecodedUser = {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  isAdmin: boolean;
};

export type User = {
  _id?: string;
  isAdmin: boolean;
  email: string;
  firstName: string;
  lastName: string;
};

export interface AuthState {
  token: string;
  decodedUser: DecodedUser;
  isLoading: boolean;
  error: boolean;
}

export type NewBook = Partial<Book>;
export type NewUser = Partial<User>;
