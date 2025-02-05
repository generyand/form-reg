import { Router } from 'express'
import { getUsers, createUser, updateUser, deleteUser, searchUser } from '../controllers/user.controller'
const router = Router()

router.get('/', getUsers)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/', searchUser)

export default router
