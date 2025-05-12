<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter()

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
   <section>
    <img>
    <div>
        <a>Back</a>
        <h2>Welcome to the Lumos Library</h2>
        <form @submit.prevent="login">
            <label>Username:</label>
            <input v-model="username" type="text" id="userName" name="username" required >
            <label>Password:</label>
            <input v-model="password" type="password" id="password" name="password" required>
            <button type="button">Register</button> // länk till registreringssidan 
            <button type="submit">Log in</button>

        </form>
    </div>
   </section>
</template>

<style  scoped>


</style>
