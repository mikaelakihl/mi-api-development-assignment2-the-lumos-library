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

        <template #goBackLink>
                <RouterLink to="/sign-in" class="authview-go-back-link">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                    <span>Back</span>
                </RouterLink>
        </template>
            <!-- <button class="authview-form-button" type="button" @click="router.push('/register')">Register</button> -->
            

            <!-- <template #loginWithoutSignInLink>
                <div class="authview-sign-in-without-login-wrapper">
                    <RouterLink to ="/home" class="authview-form-button">Continue without signing in</RouterLink>
                </div>
            </template> -->
        </AuthView>
</template>

<style lang="scss" scoped>

.authview-go-back-link {
    text-align: left;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-left: 1rem;
    text-decoration: none;
    color: $color-black;
    margin-bottom: 2rem;
}

@media (min-width: 700px) {

.authview-go-back-link{
    margin-top: 0;
    margin-bottom: 4rem;
}


}

</style>
