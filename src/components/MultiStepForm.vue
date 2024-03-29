<script>
import dataFields from '../data-fields';
import RadioInput from './RadioInput.vue';
import MacroRadioInput from './MacroRadioInput.vue';
import SelectField from './SelectField.vue';

export default {
    name: 'MultiStepForm',
    components: {
        RadioInput,
        MacroRadioInput,
        SelectField
    },
    data() {
        return {
            fields: dataFields,                       
            currentStep: 0,
            formCompleted: false,
            steps: [
                ['weight','heightInFeet','heightInInches','gender'],
                ['activityLevel','goals'],
                ['stageOfLife'],
                ['customizedMacros'],
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
            let errorCount = 0;

            // validation
            for(const fieldKey of this.steps[this.currentStep]) {
                if(this.fields[fieldKey].required == true) {

                    // remove previous error
                    if('hasError' in this.fields[fieldKey]) {
                        delete this.fields[fieldKey].hasError;
                    }

                    if(this.isDefaultValue(this.fields[fieldKey]) == true) {
                        this.fields[fieldKey].hasError = true;
                        errorCount++;
                    }
                }

                // customizedMacros field validation
                if(this.currentStep === 3){
                    if(this.fields['customizedMacros'].value === '1'){
                        delete this.fields['customizedMacros'].hasError;
                    }

                    if(this.fields['customizedMacros'].value === '2'){
                        if(this.fields['customizedMacrosTotal'].value < 100 || this.fields['customizedMacrosTotal'].value > 100){
                            // this.fields['customizedMacros'].hasError = true;
                            alert('The total percentage of macros should equal exactly 100%')
                            errorCount++;
                        }
                    }
                }
            }

            if(errorCount > 0) return;
            if(this.isLastStep) return;
            this.currentStep++;
        },

        isDefaultValue(field) {            
            if(field.fieldType == 'number' && field.value === 0) return true;
            if(field.fieldType == 'text' && field.value === '') return true;
            if(field.fieldType == 'email' && field.value === '') return true;

            return false;
        },
        
        handleSubmit(e) {
            e.preventDefault();

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
            <div class="flex flex-wrap gap-4" v-if="currentStep === step">               
                <div v-for="field in fieldKeys" class="relative" :class="{'md:w-60 w-full': fields[field].width == 'half', 'w-full': fields[field].width != 'half'}">
                    <div class="form-control">
                        <label class="label form-field-label font-bold text-[#612472]" :class="{'mb-3 block' : step == 2}">
                            {{fields[field].label}}
                            <span class="text-[#612472]" v-if="fields[field].required == true">*</span>                            
                        </label>
                        <span v-if="fields[field].hasError" style="display:block;color:red">{{fields[field].errorMessage}}</span>
                        
                        <div class="field-group" :class="{'form-container-max-height rounded' : step == 2}">
                            <input
                                class="input border-none w-full mx-0 mt-2 mb-4 rounded"
                                type="text"
                                v-if="fields[field].fieldType === 'text'"                        
                                :required="fields[field].required"
                            />

                            <input
                                class="input border-none w-full mx-0 mt-2 mb-4 rounded"
                                type="email"
                                v-if="fields[field].fieldType === 'email'"                        
                                v-model="fields[field].value"
                                :required="fields[field].required"
                            />

                            <input
                                class="input border-none w-full mx-0 mt-2 mb-4 rounded"                                
                                type="number"
                                v-if="fields[field].fieldType === 'number'"                        
                                v-model="fields[field].value"
                                :required="fields[field].required"
                            />

                            <RadioInput v-if="fields[field].fieldType === 'radio' && fields[field].fieldId !== 12" :fieldKey="field"></RadioInput>
                            <MacroRadioInput v-if="fields[field].fieldId === 12" :fieldKey="field"></MacroRadioInput>
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
              @click.prevent="nextStep()"
              v-if="!isLastStep">Next</button>
            <button
              v-if="isLastStep"
              class="bg-[#612472] py-2 px-4 text-white rounded" 
              type="submit">Get Your Results</button>  
        </footer>
    </form>
</template>

<style scoped>
    .form-container-max-height {
        padding: 0px 20px 10px;
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