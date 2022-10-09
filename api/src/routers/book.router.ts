import express from 'express'

import {
  createBook,
  findById,
  deleteBook,
  findAll,
  updateBook,
  findByCategory,
  findByISBN,
  filterBooks,
} from '../controllers/book.controller'

import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', checkAuth, findAll)
router.get('/id/:bookId', checkAuth, findById)
router.get('/category/:category', checkAuth, findByCategory)
router.get('/ISBN/:ISBN', checkAuth, findByISBN)
router.get('/filter', checkAuth, filterBooks)
router.put('/id/:bookId', checkAuth, updateBook)
router.delete('/id/:bookId', checkAuth, deleteBook)
router.post('/', checkAuth, createBook)

export default router
