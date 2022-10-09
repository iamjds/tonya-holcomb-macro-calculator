<script>
    export default {
        name: 'Results',
        props: {
            macros: Object
        },
        data() {
            return {
                showResults: false
            }
        }          
    }
</script>

<template>
    <section id="results-data-container" class="mt-6">
        <p class="text-center">let's get to those results!</p>
        <div v-for="phase in macros">{{ phase.protein }}</div>
    </section>
</template>