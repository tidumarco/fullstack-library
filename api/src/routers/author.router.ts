import express from 'express'
import checkAuth from '../middlewares/checkAuth'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAll,
  updateAuthor,
} from '../controllers/author.controller'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.get('/', checkAuth, findAll)
router.get('/:authorId', checkAuth, findById)
router.put('/:authorId', checkAuth, updateAuthor)
router.delete('/:authorId', checkAuth, deleteAuthor)
router.post('/', checkAuth, createAuthor)

export default router
