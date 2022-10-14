<script>
export default {
    name: 'Results',
    props: {
        macros: Object
    },
    data: () => ({            
        showResults: false,
        currentPage: 1,
        totalPages: 0
    })
}
</script>

<template>
    <section id="results-data-container" class="mt-6">
        <p class="text-center">let's get to those results!</p>
        <!-- <div v-for="phase in macros">{{ phase.protein }}</div> -->

        <t-table
        :headers="['Name', 'Email', 'Age', 'Sales']"
        :data="[
            ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
            ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
        ]"
        ></t-table>
    </section>
</template>