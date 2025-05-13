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
    <section>
    <img src="../assets/images/heroimg-fantasy-book.jpg">
    <div>
        <a>Back</a>
        <h2> {{ title }}</h2>
        <form @submit.prevent="onSubmit">
            <label>Username:</label>
            <input v-model="username" type="text" id="userName" name="username" required >
            <label>Password:</label>
            <input v-model="password" type="password" id="password" name="password" required>
            <button type="submit">{{ submitText }}</button>
            <slot/>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            
        </form>
    </div>
   </section>
</template>