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
  },
  updateUser: async (id: string, data: UpdateUserInput) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    return response.json()
  },
  deleteUser: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
    if (response.status !== 204) {
      throw new Error('Unexpected response from server')
    }
  },
  searchUser: async (search: string) => {
    const response = await fetch(`${BASE_URL}/users/search?search=${search}`)
    return response.json()
  }
}
