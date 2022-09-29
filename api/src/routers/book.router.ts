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

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.get('/id/:bookId', findById)
router.get('/category/:category', findByCategory)
router.get('/ISBN/:ISBN', findByISBN)
// router.get('/authors/:authors', findByAuthors)
router.put('/id/:bookId', updateBook)
router.delete('/id/:bookId', deleteBook)
router.post('/', createBook)

export default router
