<script>
export default {
    data() {
        return {
            fields: {
                firstName: {
                    label: 'First Name',
                    value: '',
                    fieldType: 'text'
                },
                lastName: {
                    label: 'Last Name',
                    value: '',
                    fieldType: 'text'
                },
                email: {
                    label: 'Email Address',
                    value: '',
                    fieldType: 'text'
                },
                age: {
                    label: 'Age',
                    value: '',
                    fieldType: 'number'
                },
                weight: {
                    label: 'Weight',
                    value: '',
                    fieldType: 'number'
                },
                heightInFeet: {
                    label: 'Height (feet)',
                    value: '',
                    fieldType: 'number'
                },
                heightInInches: {
                    label: 'Height (inches)',
                    value: '',
                    fieldType: 'number'
                },
                anatomy: {
                    label: 'Anatomy',
                    value: [
                        'Male',
                        'Female'
                    ],
                    fieldType: 'select'
                },
                activityLevel: {
                    label: 'Activity Level',
                    value: [
                        'Sedentary',
                        'Lightly Active',
                        'Moderately Active',
                        'Very Active',
                        'Extremely Active'
                    ],
                    fieldType: 'select'
                },
                stageOfLife: {
                    label: 'Stage of Life',
                    value: [
                        'Menstruating',
                        'Menopausal'
                    ],
                    fieldType: 'select'
                },
            },                         

            steps: [
                ['weight', 'heightInFeet', 'heightInInches', 'anatomy'],
                ['activityLevel'],
                ['stageOfLife'],
                ['firstName','lastName','age','email']
            ],

            currentStep: 0,
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
    <form class="p-10 mx-auto max-w-xl">
        <div class="flex items-stretch gap-2 mb-6">
            <div
                v-for="step in totalSteps"
                class="h-2 w-full rounded text-purple-500"
                style="border: 1px solid;"
                :class="{'bg-purple-500 ': step - 1 <= currentStep}"
            ></div>
        </div>

        <div v-for="(fieldKeys, step) in steps">
            <div v-if="currentStep === step">
                <div v-for="field in fieldKeys" class="relative">
                    <div class="form-control">
                        <label class="label">
                        {{fields[field].label}}
                        
                        <input
                            class="input input-bordered m-2 w-full mx-0 rounded-sm"
                            type="text"
                            v-if="fields[field].fieldType === 'text'"                        
                            v-model="fields[field].value"
                        />
                        
                        <input
                            class="input input-bordered m-2 w-full mx-0 rounded-sm"
                            type="number"
                            v-if="fields[field].fieldType === 'number'"                        
                            v-model="fields[field].value"
                        />
                        
                        <template v-if="fields[field].fieldType === 'select'">
                        <select class="block mt-2 w-full rounded-sm">
                            <option 
                              v-for="(option, id) in fields[field].value" 
                              value="{{id}}">{{option}}</option>
                        </select>
                        </template> 
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <footer class="flex justify-between gap-2 mt-5">
            <button 
              class="bg-[#9b59b6] py-1 px-5 text-white rounded-sm" 
              @click.prevent="previousStep"
              v-if="!isFirstStep">Previous</button>
            <button 
              class="bg-[#612472] py-1 px-5 text-white rounded-sm" 
              @click.prevent="nextStep"
              v-if="!isLastStep">Next</button>
        </footer>
    </form>
</template>