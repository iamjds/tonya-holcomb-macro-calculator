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
    <section v-if="results != null" id="results-data-container">
        <p>let's get to those results!</p>
    </section>
</template>