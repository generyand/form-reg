import { Request, Response } from 'express'
import { prisma } from '../../lib/db'
import { CreateUserInput, UpdateUserInput } from '../../../shared/types'

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.error('Failed to fetch users:', error)
        res.status(500).json({ error: 'Failed to fetch users' })
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    // console.log('Received data:', { firstName: req.body.firstName, lastName: req.body.lastName })
    // console.log('Creating user:', req.body)
    try {
        const { firstName, lastName } = req.body as CreateUserInput

        if (!firstName || !lastName) {
            res.status(400).json({ error: 'firstName and lastName are required' })
            return
        }

        const user = await prisma.user.create({
            data: { firstName, lastName }
        })

        console.log('User created:', user)
        res.status(201).json(user)
    } catch (error) {
        console.error('Failed to create user:', error)
        res.status(500).json({ error: 'Failed to create user' })
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { firstName, lastName } = req.body as UpdateUserInput
        const user = await prisma.user.update({
            where: { id },
            data: { firstName, lastName }
        })
        res.json(user)
    } catch (error) {
        console.error('Failed to update user:', error)
        res.status(500).json({ error: 'Failed to update user' })
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        await prisma.user.delete({ where: { id } })
        res.status(204).send()
    } catch (error) {
        console.error('Failed to delete user:', error)
        res.status(500).json({ error: 'Failed to delete user' })
    }
}

export const searchUser = async (req: Request, res: Response): Promise<void> => {
    console.log('Searching for user:', req.query)

    try {
        const { search } = req.query
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { firstName: { contains: search as string, mode: 'insensitive' } },
                    { lastName: { contains: search as string, mode: 'insensitive' } }

                ]
            }
        })
        res.json(users)
    } catch (error) {
        console.error('Failed to search users:', error)
        res.status(500).json({ error: 'Failed to search users' })
    }
}
