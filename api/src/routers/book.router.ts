import express from 'express'
import { overArgs } from 'lodash'

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
router.get('/id/:bookId', findById)
router.get('/category/:category', findByCategory)
router.get('/ISBN/:ISBN', findByISBN)
router.get('/filter', filterBooks)
router.put('/id/:bookId', updateBook)
router.delete('/id/:bookId', deleteBook)
router.post('/', createBook)

export default router
// (...args) => checkAuth(...args, { isAdmin: true }),
