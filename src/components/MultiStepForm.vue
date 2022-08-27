<script>
import dataFields from '../data-fields';
import RadioInput from './RadioInput.vue';

export default {
    name: 'MultiStepForm',
    components: {
        RadioInput
    },
    data() {
        return {
            fields: dataFields,                       
            currentStep: 0,
            formCompleted: false,
            steps: [
                ['weight', 'heightInFeet', 'heightInInches', 'gender'],
                ['activityLevel'],
                ['stageOfLife'],
                ['firstName','lastName','age','email']
            ]            
        }
    },   
    methods: {
        previousStep() {
            if(this.isFirstStep) return;
            this.currentStep--;
        },

        nextStep() {
            if(this.isLastStep) return;
            this.currentStep++;
        },
        
        handleSubmit(e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);

            this.formCompleted = true;
            this.emitter.emit("form-submit-event", {'formCompleted': true});
        }
    },
    computed: {
        totalSteps() {
            return this.steps.length;
        },

        isFirstStep() {
            return this.currentStep === 0;
        },

        isLastStep() {
            return this.currentStep === this.totalSteps - 1;
        }
    }
}
</script>

<template>
    <form @submit="handleSubmit" class="p-10 mx-auto max-w-xl">        
        <div class="flex items-stretch gap-2 mb-6">
            <div
                v-for="step in totalSteps"
                class="h-2 w-full rounded text-black"
                style="border: 1px solid;"
                :class="{'bg-[#612472] ': step - 1 <= currentStep}"
            ></div>
        </div>

        <div v-for="(fieldKeys, step) in steps">
            <div v-if="currentStep === step">

                <div v-if="step == 1">
                    <p class="mb-6">If in doubt, choose an activity level below what you think you do.</p>
                </div>

                <div v-for="field in fieldKeys" class="relative" :class="{'form-container-max-height' : step == 2}">
                    <div class="form-control">
                        <label class="label">
                        {{fields[field].label}}
                        
                        <input
                            class="input border-none w-full mx-0 mt-2 mb-4 rounded"
                            type="text"
                            v-if="fields[field].fieldType === 'text'"                        
                            v-model="fields[field].value"
                        />

                        <RadioInput v-if="fields[field].fieldType === 'radio'" :fieldKey="field"></RadioInput>
                        
                        <input
                            class="input border-none w-full mx-0 mt-2 mb-4 rounded"
                            type="number"
                            v-if="fields[field].fieldType === 'number'"                        
                            v-model="fields[field].value"
                        />
                        
                        <template v-if="fields[field].fieldType === 'select'">
                            <select v-model="fields[field].value" class="block mt-2 mb-4 w-full border-none rounded">
                                <option v-if="fields[field].placeholder != null" value="0" selected>{{fields[field].placeholder}}</option>
                                <option v-if="fields[field].placeholder == undefined" value="0" selected>-- choose {{fields[field].label}} --</option>
                                <option 
                                v-for="(option, id) in fields[field].options" 
                                :value="{id}">{{option}}</option>
                            </select>
                        </template> 
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <footer class="flex justify-between gap-2 mt-5">
            <button             
              class="bg-[#9b59b6] py-2 px-4 text-white rounded" 
              @click.prevent="previousStep"
              v-if="!isFirstStep">Previous</button>
            <button 
              class="bg-[#9b59b6] py-2 px-4 text-white rounded ml-auto" 
              @click.prevent="nextStep"
              v-if="!isLastStep">Next</button>
            <button
              v-if="isLastStep"
              class="bg-[#612472] py-2 px-4 text-white rounded" 
              type="submit">Get Your Numbers</button>  
        </footer>
    </form>
</template>

<style scoped>
    .form-container-max-height {
        max-height: 330px;
        overflow-y: scroll;
    }
</style>