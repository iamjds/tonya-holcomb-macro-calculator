<script>
import dataFields from '../data-fields';
import RadioInput from './RadioInput.vue';
import SelectField from './SelectField.vue';

export default {
    name: 'MultiStepForm',
    components: {
        RadioInput,
        SelectField
    },
    data() {
        return {
            fields: dataFields,                       
            currentStep: 0,
            formCompleted: false,
            steps: [
                ['weight', 'heightInFeet', 'heightInInches', 'gender'],
                ['activityLevel', 'goals'],
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

                <div v-for="field in fieldKeys" class="relative">
                    <div class="form-control">
                        <label class="label form-field-label" :class="{'mb-3 block' : step == 2}">{{fields[field].label}}</label>
                        
                        <div class="field-group" :class="{'form-container-max-height rounded' : step == 2}">
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

                            <SelectField v-if="fields[field].fieldType === 'select'" :fieldKey="field"></SelectField>                                                    
                        </div>
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
        padding: 20px;
        max-height: 300px;
        overflow-y: scroll;
        outline: 1px solid #cecece;
    }
    .form-container-max-height::-webkit-scrollbar {
        width: 5px;
    }
    .form-container-max-height::-webkit-scrollbar-track {
        background-color: #ede5ee;
    }
    .form-container-max-height::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px #9b59b6;
    }
</style>