import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SpecificBook from '@/views/SpecificBook.vue'
import SignInView from '@/views/SignInView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import AdminUsersView from '@/views/admin/AdminUsersView.vue'
import AdminBooksView from '@/views/admin/AdminBooksView.vue'
import CreateBookView from '@/views/admin/CreateBookView.vue'
import useAuthStore from '@/stores/useAuthStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/books/:id',
      name: 'book',
      component: SpecificBook,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/admin-users',
      name: 'admin-users',
      component: AdminUsersView,
    },
    {
      path: '/admin-books',
      name: 'admin-books',
      component: AdminBooksView,
    },
    {
      path: '/admin-books-add',
      name: 'admin-books-add',
      component: CreateBookView,
      meta: {
        requiresAuth: true
      }
    }
  ],
})






// Helper to read cookies


// Guard (called AFTER pinia is already initialized in main.js)
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  console.log(auth.isAuthenticated);
  // ✅ Don't manually modify store here. Just rely on its current state.
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/sign-in')
  } else {
    next()
  }
})


export default router
