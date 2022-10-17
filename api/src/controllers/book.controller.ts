import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import bookService from '../services/book.service'
import { BadRequestError } from '../helpers/apiError'

// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      ISBN,
      title,
      description,
      publisher,
      publishedDate,
      authors,
      available,
      borrowerId,
      borrowDate,
      returnDate,
      adminId,
      category,
    } = req.body

    const book = new Book({
      ISBN,
      title,
      description,
      publisher,
      publishedDate,
      authors,
      available,
      borrowerId,
      borrowDate,
      returnDate,
      adminId,
      category,
    })

    await bookService.create(book)
    res.status(201).json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updateBook = await bookService.update(bookId, update)
    res.status(200).json(updateBook)
    console.log('Book edited.')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/id/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bookService.deleteBook(req.params.bookId)
    res.status(200).json({ message: 'Book deleted.' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/id/:bookId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await bookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/category/:category
export const findByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await bookService.findByCategory(req.params.category))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/ISBN/:ISBN
export const findByISBN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await bookService.findByISBN(req.params.ISBN))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books
export const filterBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queries = []
    const allowedQueries = ['title', 'ISBN', 'category']

    for (const key in req.query) {
      const value = req.query[key]
      const isAllowedKey = allowedQueries.includes(key)
      if (isAllowedKey) {
        queries.push({ [key]: value })
      }
    }
    // console.log(queries)
    res.status(200).json(await bookService.findByFilter(queries))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await bookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
