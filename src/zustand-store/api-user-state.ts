import { create } from "zustand";
import { API_ROUTER } from "../lib/apirouter";

export interface User {
    id?: number,
    name: string,
    email: string,
    phone: string,
    department: string,
    joinDate: string
}

export interface FilterParams {
    name?: string
    email?: string
    department?: string
}

interface UserStore {
    users: User[]
    fetchUsers: (filters?: FilterParams) => Promise<void>
    addUser: (user: Omit<User, 'id'>) => Promise<void>
    updateUser: (id: string | number, user: Omit<User, 'id'>) => Promise<void>
    deleteUser: (id: string | number) => Promise<void>
    error: string | null
    isLoading: boolean
}

export const useUserStore = create<UserStore>((set, get) => ({
    users: [],
    fetchUsers: async (filters?: FilterParams) => {
        try {
            set({ isLoading: true })
            
            // Build query string - only use department for server-side filtering
            const queryParams = new URLSearchParams()
            if (filters?.department) {
                queryParams.append('department', filters.department)
            }
            
            const queryString = queryParams.toString()
            const url = `${API_ROUTER}/users${queryString ? `?${queryString}` : ''}`
            
            const response = await fetch(url)
            let data = await response.json()
            
            // Client-side filtering for name and email
            if (filters?.name) {
                data = data.filter((user: User) => 
                    user.name.toLowerCase().includes(filters.name!.toLowerCase())
                )
            }
            if (filters?.email) {
                data = data.filter((user: User) => 
                    user.email.toLowerCase().includes(filters.email!.toLowerCase())
                )
            }
            
            set({ users: data })
        } catch (error) {
            set({ error: String(error) })
        } finally {
            set({ isLoading: false })
        }
    },
    addUser: async (user: Omit<User, 'id'>) => {
        try {
            set({ isLoading: true })
            const response = await fetch(`${API_ROUTER}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            
            if (!response.ok) {
                throw new Error('Failed to add user')
            }
            
            // Refresh the user list after adding
            await get().fetchUsers()
        } catch (error) {
            set({ error: String(error) })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    updateUser: async (id: string | number, user: Omit<User, 'id'>) => {
        try {
            set({ isLoading: true })
            const response = await fetch(`${API_ROUTER}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            
            if (!response.ok) {
                throw new Error('Failed to update user')
            }
            await get().fetchUsers()
        } catch (error) {
            set({ error: String(error) })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    deleteUser: async (id: string | number) => {
        try {
            set({ isLoading: true })
            const response = await fetch(`${API_ROUTER}/users/${id}`, {
                method: 'DELETE'
            })
            
            if (!response.ok) {
                throw new Error('Failed to delete user')
            }
            
            // Refresh the user list after deleting
            await get().fetchUsers()
        } catch (error) {
            set({ error: String(error) })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    error: null,
    isLoading: false
}))
