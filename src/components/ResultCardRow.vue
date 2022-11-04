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
            let largeTitle = '';

            if(this.titleType === 'phase1'){
                largeTitle = 'Your Cyclical Macros';
            }            

            if(this.titleType === 'general' || this.titleType === 'male'){
                largeTitle = 'Your Bioindividual Macros';
            }

            return largeTitle;
        },

        getPhaseTitle() {
            let phaseTitle = '';

            if(this.titleType === 'phase1'){
                phaseTitle = 'Follicular & Ovulation Phase';
            }

            if(this.titleType === 'phase2'){
                phaseTitle = 'Luteal Phase';
            }

            if(this.titleType === 'phase3'){
                phaseTitle = 'Menstrual Phase';
            }

            return phaseTitle;
        }
    }
}
</script>

<template>
    <p class="section-title uppercase font-bold text-2xl text-center mb-7 px-6 text-[#612472]" v-if="getRowTitle != ''">{{getRowTitle}}</p>

    <div class="section-content mb-16" :class="{'no-border': titleType == 'general'}">        
        <p class="mb-6 text-center text-xl font-bold text-[#9b59b6]">{{getPhaseTitle}}</p>

        <div class="row flex flex-wrap md:flex-nowrap w-full gap-4">
            <div class="card text-center md:w-1/3 w-full bg-white rounded-lg">
                <h5 class="p-3 bg-[#612472] text-white text-lg uppercase rounded-t-lg">Proteins</h5>

                <div class="justify-center items-center p-6">
                    <p class="text-3xl">{{proteins}}</p>
                </div>
            </div>

            <div class="card text-center md:w-1/3 w-full bg-white rounded-lg">
                <h5 class="p-3 bg-[#612472] text-white text-lg uppercase rounded-t-lg">Fats</h5>

                <div class="justify-center items-center p-6">
                    <p class="text-3xl">{{fats}}</p>
                </div>
            </div>

            <div class="card text-center md:w-1/3 w-full bg-white rounded-lg">
                <h5 class="p-3 bg-[#612472] text-white text-lg uppercase rounded-t-lg">Carbs</h5>

                <div class="justify-center items-center p-6">
                    <p class="text-3xl">{{carbs}}</p>
                </div>
            </div>            
        </div>
    </div>
</template>

<style scoped>
.section-content {
    border: 2px solid #9b59b6;
    border-radius: 30px;
    padding: 30px;
    position: relative;
}

.section-content.no-border {
    border: none !important;
}

.section-content > p {
    background-color: #ede5ee;
    margin: -45px auto 20px;
    display: table;
    padding: 0 10px;
}

.section-content .row .card .text-white {
    color: #fff !important;
}
</style>