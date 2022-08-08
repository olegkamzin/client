<template>
<input class="input_main" type="text" v-model="inputValue" />
</template>

<script>
export default {
    name: 'input-main',
    props: {
        inputValue: {
            type: String
        }
    }
}
</script>

<style>
.input_main { border: 0; outline: none; height: 30px; line-height: 30px; padding: 0 15px; background: #ececec; color: #000; border-radius: 6px; width: 100%; }
.input_main:focus { background: #f8f8f8; }
</style>