<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import AuthView from '../components/AuthView.vue'


</script>

<template>
        <AuthView
            :title="'Create new account'"
            :submitText="'Create'"
            :onSubmitHandler="login"
            :errorMessage="error"
            @update:username="username = $event"
            @update:password="password = $event"
        >
            <!-- <button class="authview-form-button" type="button" @click="router.push('/register')">Register</button> -->
            

            <!-- <template #loginWithoutSignInLink>
                <div class="authview-sign-in-without-login-wrapper">
                    <RouterLink to ="/home" class="authview-form-button">Continue without signing in</RouterLink>
                </div>
            </template> -->
        </AuthView>
</template>

<style lang="scss" scoped>

</style>
