import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SpecificBook from '@/views/SpecificBook.vue'
import SignInView from '@/views/SignInView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import AdminUsersView from '@/views/admin/AdminUsersView.vue'
import AdminBooksView from '@/views/admin/AdminBooksView.vue'
import CreateBookView from '@/views/admin/CreateBookView.vue'

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
    }
  ],
})




export default router
