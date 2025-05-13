<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import AuthForm  from '../components/AuthForm.vue'

const username = ref('');
const password = ref('');
const router = useRouter()
const error = ref('');

async function login() {
    try {
        const response = await fetch ('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong')
        }

        localStorage.setItem('token', data.token)
        router.push('/home')
    } catch (error) {
        error.value = error.message
    }
}

</script>

<template>
        <AuthForm
            :title="'Welcome to the Lumos Library'"
            :submitText="'Logga in'"
            :onSubmitHandler="login"
            :errorMessage="error"
            @update:username="username = $event"
            @update:password="password = $event"
        >
            <button type="button" @click="router.push('/register')">Register</button>
        </AuthForm>
</template>

<style  scoped>


</style>
