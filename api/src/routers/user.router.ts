import express from 'express'
import checkAuth from '../middlewares/checkAuth'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
} from '../controllers/user.controller'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', checkAuth, findAll)
router.get('/:userId', checkAuth, findById)
router.put('/:userId', checkAuth, updateUser)
router.delete('/:userId', checkAuth, deleteUser)
router.post('/', checkAuth, createUser)

export default router
