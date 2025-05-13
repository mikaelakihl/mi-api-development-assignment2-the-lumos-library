<script setup>
 import { ref, watchEffect } from 'vue'


 const props = defineProps({
    title: String,
    submitText: String,
    onSubmitHandler: Function,
    errorMessage: String
    
 })

 const emit = defineEmits (['update:username', 'update:password'])

 const username = ref('');
 const password = ref('');

 watchEffect(() => {
    emit('update:username', username.value)
    emit('update:password', password.value)
 })

 function onSubmit() {
    props.onSubmitHandler?.()
 }

</script>

<template>
    <section class="authview-hero-section">
    <img src="../assets/images/heroimg-fantasy-book.jpg" class="authview-hero-img">
    <div class="authview-hero-content">
        <div class="authview-hero-wrapper">
            <div class="authview-go-back-link">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                <a>Back</a>
            </div>
            <h2> {{ title }}</h2>
            <form class="authview-form-container" @submit.prevent="onSubmit">
                    <label>Username:</label>
                    <input v-model="username" type="text" id="userName" name="username" required >
                    <label>Password:</label>
                    <input v-model="password" type="password" id="password" name="password" required>
                    <div class="authview-form-button-container">
                        <button class="authview-form-button" type="submit">{{ submitText }}</button>
                        <slot/>
                    </div>
                    <p v-if="errorMessage">{{ errorMessage }}</p>
                    <div>
                        <slot name="loginWithoutSignInLink"/>
                    </div>
            </form>
        </div>
    </div>
   </section>
</template>

<style lang="scss" scoped>

.authview-hero-section{
    position: relative;
    height: 100dvh;
    width: 100%;
    overflow: hidden;
}

.authview-hero-img{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 0;
}

.authview-hero-content{
    
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.authview-hero-wrapper {
    background-color: $color-background;
    opacity: 85%;
    width: 100%;
    text-align: center;
}

.authview-form-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;

    input{
        border-radius: $border-small;
        background-color: $color-red;
        box-shadow: $drop-shadow;
        min-height: 48px;
        width: 100%;
    }
}

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
}

.authview-go-back-link {
    text-align: left;
    display: flex;
    align-items: center;
    color: $color-white;
}

.authview-form-button-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
}

</style>