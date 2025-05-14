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
            <slot name="goBackLink"/>
            <h2> {{ title }}</h2>
            <form class="authview-form-container" @submit.prevent="onSubmit">
                    <label class="authview-form-label">Username:</label>
                    <input v-model="username" type="text" id="userName" name="username" required >
                    <label class="authview-form-label">Password:</label>
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

h2{
    font-size: $h-medium-mobile;
    margin-bottom: 2rem;
}

.authview-hero-section{
    position: relative;
    height: 100dvh;
    width: 100%;
    overflow: hidden;
    font-family: $font-title;
}

.authview-hero-img{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 0;
    filter: blur(4px);
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
    border-radius: $border-large;
}

.authview-form-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    gap: 1rem;
    

    input{
        border-radius: $border-small;
        background-color: $color-red;
        box-shadow: $drop-shadow;
        min-height: 48px;
        width: 100%;
        color: $color-white;
    }
}

.authview-form-button{
        border-radius: $border-small;
        background-color: $color-red;
        box-shadow: $drop-shadow;
        color: $color-white;
        min-height: 48px;
        min-width: 48px;
        // padding: 0.75rem 1.25rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
        font-family: $font-title;
        padding-right: 2rem;
        padding-left: 2rem;
        font-size: $h-small-mobile;
}

// .authview-go-back-link {
//     text-align: left;
//     display: flex;
//     align-items: center;
//     margin-top: 1rem;
//     margin-left: 1rem;
//     text-decoration: none;
//     color: $color-black;
// }

.authview-form-button-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.authview-form-label{
    text-align: left;
    font-size: $h-small-mobile;
    width: 100%;

}

@media (min-width: 700px) {

    .authview-hero-content{
        width: 80%;
        // height: 50%;
       
        
    }

    .authview-hero-section{

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .authview-hero-wrapper{
        padding: 3rem;
    }

    .authview-go-back-link{
        margin-top: 0;
        margin-bottom: 4rem;
    }


}

@media (min-width: 1200px) {

    h2{
        font-size: $h-medium;
    }

    .authview-hero-content{
        width: 50%;
        // height: 50%;
       
        
    }

    .authview-form-button{
        font-size: $h-small-mobile;
        padding-right: 5rem;
        padding-left: 5rem;
    }

    .authview-form-button-container{
        margin-top: 1rem;
    }

  
}

</style>