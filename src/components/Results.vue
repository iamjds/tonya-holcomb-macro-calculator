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
        <template v-for="(phase, index) in macros">
        <ResultCardRow :titleType="index" :proteins="phase.protein" :fats="phase.fat" :carbs="phase.carbs"></ResultCardRow>
        </template>        
        <br>
    </section>
</template>