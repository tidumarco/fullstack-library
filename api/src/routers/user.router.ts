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
router.get('/', findAll)
router.get('/:userId', findById)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)
router.post('/', createUser)

export default router
