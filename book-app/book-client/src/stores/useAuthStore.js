import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL;

const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    error: null
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ username, password })
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message || 'Login failed')
        }

        const data = await res.json()
        this.isAuthenticated = true
        this.user = {
          username: data.username,
          is_admin: data.is_admin
        }
        this.error = null
        console.log('Login successful: ' + this.isAuthenticated);
      } catch (err) {
        this.error = err.message || 'An error occurred during login'
        this.isAuthenticated = false
        this.user = null
      }
    },

    async logout() {
      try {
        const res = await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          credentials: 'include'
        })

        if (!res.ok) {
          throw new Error('Logout failed')
        }

        this.isAuthenticated = false
        this.user = null
        this.error = null
        // localStorage.removeItem('accessToken')
      } catch (err) {
        this.error = err.message || 'An error occurred during logout'
      }
    },

    async register(username, password, is_admin = false) {
      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password, is_admin })
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Registration failed')
        }

        this.error = null
      } catch (err) {
        this.error = err.message || 'An error occurred during registration'
      }
    },

    // ✅ This checks if the cookie exists and updates the state
      initialize() {
        const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken'))

      this.isAuthenticated = !!cookie

      if (this.isAuthenticated && !this.user) {
        this.user = { username: 'Unknown', is_admin: false } // optional fallback
      }
    }
  }
})

export default useAuthStore
