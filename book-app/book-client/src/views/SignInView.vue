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
            :title="'Welcome to The Lumos Library'"
            :submitText="'Log in'"
            :onSubmitHandler="login"
            :errorMessage="error"
            @update:username="username = $event"
            @update:password="password = $event"
        >
            <button class="authview-form-button" type="button" @click="router.push('/register')">Register</button>
            

            <template #loginWithoutSignInLink>
                <div class="authview-sign-in-without-login-wrapper">
                    <RouterLink to ="/home" class="authview-form-button">Continue without signing in</RouterLink>
                </div>
            </template>
        </AuthForm>
</template>

<style lang="scss" scoped>

.authview-form-button{
        border-radius: $border-small;
        background-color: $color-red;
        box-shadow: $drop-shadow;
        color: $color-white;
        min-height: 48px;
        min-width: 48px;
        padding: 0.75rem 1.25rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
        text-decoration: none;
        font-family: $font-title;
        padding-right: 2rem;
        padding-left: 2rem;
        font-size: $h-small-mobile;
}

.authview-sign-in-without-login-wrapper{
    text-align: center;
    width: 100%&;
    margin-bottom: 1rem;
    font-size: $h-small-mobile;
    margin-top: 1rem;
}

@media (min-width: 1200px) {

.authview-form-button{
    font-size: $h-small-mobile;
    padding-right: 5rem;
    padding-left: 5rem;
}


}

</style>
