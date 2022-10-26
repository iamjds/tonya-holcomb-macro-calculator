<script>
export default {
    name: 'ResultCardRow',
    props: {
        titleType: String,
        proteins: Number,
        fats: Number,
        carbs: Number
    },
    computed: {
        getRowTitle() {
            let title = '';

            if(this.titleType === 'phase1'){
                title = 'Follicular & Ovulation Phase';
            }

            if(this.titleType === 'phase2'){
                title = 'Luteal Phase';
            }

            if(this.titleType === 'phase3'){
                title = 'Menstrual Phase';
            }

            if(this.titleType === 'general'){
                title = 'Your Bioindividual Macros';
            }

            return title;
        }
    }
}
</script>

<template>
    <div class="section-content mb-20">
        <p class="mb-6 text-center text-2xl font-bold uppercase">{{ getRowTitle }}</p>

        <div class="row flex w-full gap-4">
            <div class="card text-center w-1/3 bg-white rounded-lg">
                <h5 class="p-3 bg-[#612472] text-white text-lg uppercase rounded-t-lg">Proteins</h5>

                <div class="justify-center items-center p-6">
                    <p class="text-3xl">191g</p>
                </div>
            </div>

            <div class="card text-center w-1/3 bg-white rounded-lg">
                <h5 class="p-3 bg-[#612472] text-white text-lg uppercase rounded-t-lg">Fats</h5>

                <div class="justify-center items-center p-6">
                    <p class="text-3xl">106g</p>
                </div>
            </div>

            <div class="card text-center w-1/3 bg-white rounded-lg">
                <h5 class="p-3 bg-[#612472] text-white text-lg uppercase rounded-t-lg">Carbs</h5>

                <div class="justify-center items-center p-6">
                    <p class="text-3xl">167g</p>
                </div>
            </div>            
        </div>
    </div>
</template>