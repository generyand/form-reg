import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@renderer/lib/api'
import { CreateUserInput, User } from '../../shared/types'

const App = () => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<CreateUserInput>({
    firstName: '',
    lastName: ''
  })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Queries
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUsers()
  })

  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ['users', 'search', searchTerm],
    queryFn: () => searchTerm ? api.searchUser(searchTerm) : api.getUsers(),
    enabled: true
  })

  // Mutations
  const createUserMutation = useMutation({
    mutationFn: (newUser: CreateUserInput) => api.createUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setFormData({ firstName: '', lastName: '' }) // Reset form
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => api.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => 
      api.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  // Event Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUserMutation.mutate(formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate(id)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({ firstName: user.firstName, lastName: user.lastName })
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      updateUserMutation.mutate({
        id: editingUser.id,
        data: formData
      }, {
        onSuccess: () => {
          setEditingUser(null)
          setFormData({ firstName: '', lastName: '' })
        }
      })
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Student Registration</h1>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm">System Online</span>
          </div>
        </div>

        {/* Add search input before the grid */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg 
                     text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6">New Registration</h2>
            <form onSubmit={editingUser ? handleUpdate : handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg 
                           text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg 
                           text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter last name"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={createUserMutation.isPending || updateUserMutation.isPending}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                           rounded-lg transition duration-200 ease-in-out transform 
                           hover:scale-105 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingUser 
                    ? (updateUserMutation.isPending ? 'Updating...' : 'Update') 
                    : (createUserMutation.isPending ? 'Registering...' : 'Register')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ firstName: '', lastName: '' })
                    setEditingUser(null)
                  }}
                  className="flex-1 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 
                           rounded-lg transition duration-200 ease-in-out transform 
                           hover:scale-105 focus:outline-none focus:ring-2 
                           focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Students Table */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Registered Students</h2>
            {isLoading || isSearching ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-red-400 text-center">Error loading students</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">ID</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">First Name</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Last Name</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults?.map((user) => (
                      <tr key={user.id} className="border-b border-slate-700/50 hover:bg-white/5">
                        <td className="py-3 px-4 text-slate-300">{user.id.slice(0, 8)}</td>
                        <td className="py-3 px-4 text-slate-300">{user.firstName}</td>
                        <td className="py-3 px-4 text-slate-300">{user.lastName}</td>
                        <td className="py-3 px-4 flex gap-3">
                          <button 
                            onClick={() => handleEdit(user)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            disabled={deleteUserMutation.isPending}
                            className="text-red-400 hover:text-red-300 
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App