<script>
import ResultCardRow from './ResultCardRow.vue';

export default {
    name: 'Results',
    components:  {
        ResultCardRow
    },
    props: {
        macros: Object
    },
    data: () => ({            
        showResults: false
    })
}
</script>

<template>
    <section id="results-data-container" class="mt-6 mx-auto max-w-xl">
        <template v-for="(phase) in macros">
        <ResultCardRow :title="phase.phaseName" :proteins="phase.protein" :fats="phase.fat" :carbs="phase.carbs"></ResultCardRow>
        </template>        
        <br>
    </section>
</template>

<style>
/* offset Kajabi .row styles */
#results-data-container .row {
    margin-left: 0;
    margin-right: 0;
}
</style>