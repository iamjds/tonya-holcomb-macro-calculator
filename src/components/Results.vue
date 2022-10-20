<script>
export default {
    name: 'Results',
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
        <p class="text-center mb-4">Here are your personalized macros!</p>
        <!-- <div v-for="phase in macros">{{ phase.protein }}</div> -->

        
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            Phase
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Proteins
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Fats
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Carbs
                        </th>                        
                    </tr>
                </thead>
                <tbody>                    
                    <tr v-for="(phase, index) in macros" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{index}}
                        </th>
                        <td class="py-4 px-6">
                            {{phase.protein}}
                        </td>
                        <td class="py-4 px-6">
                            {{phase.fat}}
                        </td>
                        <td class="py-4 px-6">
                            {{phase.carbs}}
                        </td>                        
                    </tr>                    
                </tbody>
            </table>
        </div>

    </section>
</template>