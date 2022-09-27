import express from 'express'
import Book from '../models/Book'

import {
  createBook,
  findById,
  deleteBook,
  findAll,
  updateBook,
  findByCategory,
  findByISBN,
  //   findByAuthors,
} from '../controllers/book.controller'

const router = express.Router()

router.post('/', (_, res) => {
  const data = {
    ISBN: '654067299-3',
    title: 'Boy Who Could Fly, The',
    description: 'Partial traumatic metacarpophalangeal amputation of thumb',
    authors: [{ firstName: 'Esta', lastName: 'Ferrettino' }],
    borrowerId: '3a53fc7c-27ad-409d-8517-31e6b6a52080',
    borrowDate: '2022-03-29T14:48:04Z',
    returnDate: '2022-03-15T03:49:26Z',
    adminId: 'b510f320-28b1-4d27-af47-22e50f5192ce',
    category: 'Drama|Fantasy',
    available: true,
  }
  const book = new Book(data)
  console.log('book', book)
  book.save()
  res.json(book)
})

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.get('/:bookId', findById)
router.get('/category/:category', findByCategory)
router.get('/ISBN/:ISBN', findByISBN)
// router.get('/authors/:authors', findByAuthors)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
