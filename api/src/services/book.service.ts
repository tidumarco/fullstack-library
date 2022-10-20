import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

type Authors = {
  firstName: string
  lastName: string
}

const create = async (book: BookDocument): Promise<BookDocument> => {
  return await book.save()
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findByCategory = async (category: string): Promise<BookDocument> => {
  const foundBook = await Book.findOne({ category: category })

  if (!foundBook) {
    throw new NotFoundError(`Book's Category ${category} not found`)
  }
  return foundBook
}

const findByISBN = async (ISBN: string): Promise<BookDocument> => {
  const foundBook = await Book.findOne({ ISBN: ISBN })

  if (!foundBook) {
    throw new NotFoundError(`Book's ISBN ${ISBN} not found`)
  }
  return foundBook
}

const findByAuthors = async (authors: Authors): Promise<BookDocument> => {
  const foundBook = await Book.findOne({ authors: authors.lastName })

  if (!foundBook) {
    throw new NotFoundError(`Book's authors ${authors} not found`)
  }
  return foundBook
}

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ title: 1, publishedDate: -1 }).populate('authors')
  // .populate('borrowerId')
}

const findByFilter = async (queries: any[]): Promise<BookDocument[]> => {
  return Book.find({
    $or: queries,
  })
  //   .populate('authors')
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

export default {
  create,
  findById,
  findAll,
  findByCategory,
  findByISBN,
  findByAuthors,
  update,
  deleteBook,
  findByFilter,
}
