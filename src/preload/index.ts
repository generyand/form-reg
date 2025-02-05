import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import dotenv from 'dotenv'
import { User } from '../shared/types'

dotenv.config()

// Define type-safe API interface
interface UserAPI {
  getUsers: () => Promise<User[]>
  createUser: (userData: { firstName: string; lastName: string }) => Promise<User>
  updateUser: (userId: string, userData: { firstName: string; lastName: string }) => Promise<User>
  deleteUser: (userId: string) => Promise<void>
}

// Custom APIs for renderer
const api: UserAPI = {
  getUsers: async () => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/api/users`)
      return await response.json()
    } catch (error) {
      console.error('Failed to fetch users:', error)
      throw error
    }
  },
  
  createUser: async (userData) => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      return await response.json()
    } catch (error) {
      console.error('Failed to create user:', error)
      throw error
    }
  },
  updateUser: async (userId, userData) => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      return await response.json()
    } catch (error) {
      console.error('Failed to update user:', error)
      throw error
    }
  },
  deleteUser: async (userId) => {
    try {
      await fetch(`${process.env.SERVER_URL}/api/users/${userId}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Failed to delete user:', error)
      throw error
    }
  }
}

// Type declaration for TypeScript
declare global {
  interface Window {
    api: UserAPI
    electron: typeof electronAPI
  }
}

// Expose the API to the renderer process
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
