<script>
    export default {
        name: 'Results',
        props(){
            results: Object
        },
        data() {
            return {
                showResults: false
            }
        },     
    }
</script>

<template>
    <section id="results-data-container" class="mt-6">
        <p class="text-center">let's get to those results!</p>
        <div v-for="macros in results">{{ macros }}</div>
    </section>
</template>