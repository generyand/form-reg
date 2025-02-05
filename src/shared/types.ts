// Database types (from Prisma)
export interface User {
    id: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
}

// Request/Response types
export interface CreateUserInput {
  firstName: string
  lastName: string
}

export interface UpdateUserInput {
  firstName?: string
  lastName?: string
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface ApiError {
  message: string
  status: number
}