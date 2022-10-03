<script>
import { Circle10 } from 'vue-loading-spinner';
export default {
    name: 'Loader',
    components: {
        Circle10
    }
}
</script>

<template>
    <div id="loader-container" class="mt-6">
        <p class="text-2xl text-center">We are calculating your custom macro results</p>

        <circle10></circle10>
    </div>
</template>

<style scoped>
    .spinner.spinner--circle-10 {
        height: 100px !important;
        width: 100px !important;
        margin: 40px auto 0;
        transform: scale(2);
    }    
</style>