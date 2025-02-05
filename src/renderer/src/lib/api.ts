import { User, CreateUserInput, UpdateUserInput } from '../../../shared/types'

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`

export const api = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users`)
    return response.json()
  },
  createUser: async (data: CreateUserInput) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
} 