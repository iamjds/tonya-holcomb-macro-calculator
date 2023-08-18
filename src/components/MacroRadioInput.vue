<script>
import dataFields from '../data-fields';

export default {
    name: 'MacroRadioInput',
    props: {
        fieldKey: String
    },
    data() {
        return {
            fields: dataFields,
            showMacroFields: false,
            totalMacroPercentage: 0,
            proteinValue: 0,
            fatValue: 0,
            carbValue: 0
        }
    },
    methods: {
        onValueChange(event, fieldKey) {
            const radioValue = parseInt(event.target.value);
            
            if(radioValue === 1) this.showMacroFields = false;
            if(radioValue === 2) this.showMacroFields = true;                
        },
        onMacroValueChange($event) {
            const macroValue = parseInt(event.target.value);
            const p = this.proteinValue;
            const f = this.fatValue;
            const c = this.carbValue;

            if(p+f+c > 100) {
                alert('The total percentage of the macros cannot be greater than 100%');
                $event.preventDefault();
            } else {
                this.totalMacroPercentage = macroValue;
            }

            console.info(this.proteinValue, this.fatValue, this.carbValue);
        },
        onMacroKeydown($event) {
            // Save old value.
            const input = $event.target;
            const inputValue = parseInt(input.value);

            if (this.totalMacroPercentage + inputValue > 100)
            input.setAttribute("data-old", input.value);
        },
        onMacroKeyup($event) {
            const input = $event.target;
            const inputValue = parseInt(input.value);

            // Check correct, else revert back to old value.
            if (this.totalMacroPercentage + inputValue > 100){
                this.totalMacroPercentage = this.proteinValue + this.fatValue + this.carbValue;
            } else input.value = input.getAttribute("data-old");
        }
    }
}
</script>

<template>
    <div class="macro-radios-container">
        <div v-for="(field, key) in fields[fieldKey].options" class="radio-field mt-2 mb-4 flex">
            <input   
                v-if="key != 0"     
                :name="fields[fieldKey].name"
                class="input border-none mt-1 mr-2"
                type="radio"
                :value="key"
                v-model="fields[fieldKey].value"
                @input="onValueChange($event, fieldKey)"
            />
            <label :for="fields[fieldKey].name">{{field}}</label>        
        </div>
        
        <div v-if="showMacroFields" class="macro-fields">
            <div class="input-container">
                <fieldset>
                    <label for="protein-macro">Protein</label>
                    <input 
                        @keydown="onMacroKeydown($event)"
                        @keyup="onMacroKeyup($event)"
                        v-model="proteinValue"
                        type="number" 
                        name="protein-macro" 
                        id="protein-macro">%
                </fieldset>
                <fieldset>
                    <label for="fat-macro">Fat</label>
                    <input 
                        @keydown="onMacroKeydown($event)"
                        @keyup="onMacroKeyup($event)"
                        v-model="fatValue"
                        type="number" 
                        name="fat-macro" 
                        id="fat-macro">%
                </fieldset>
                <fieldset>
                    <label for="carb-macro">Carbohydrates</label>
                    <input 
                        @keydown="onMacroKeydown($event)"
                        @keyup="onMacroKeyup($event)"
                        v-model="carbValue"
                        type="number" 
                        name="carb-macro" 
                        id="carb-macro">%
                </fieldset>
            </div>
            <div class="macro-percentage-total">
                <p>{{totalMacroPercentage}}%</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    [type='radio']:checked {
        background-color: #9b59b6;
    }
    .macro-radios-container {
        height: 215px;
    }
    .macro-radios-container .macro-fields {
        display: flex;
    }
    .macro-radios-container .macro-fields .input-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        height: 100%;
    }
    .macro-radios-container .macro-fields .input-container label {
        display: inline-block;
        width: 150px;
    }
    .macro-radios-container .macro-fields .input-container input[type="number"]{
        width: 80px;
    }
    .macro-radios-container .macro-percentage-total {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .macro-radios-container .macro-percentage-total p {
        position: relative;
        font-size: 24px;
        width: 60px;
        text-align: center;
    }
    .macro-radios-container .macro-percentage-total p:before {
        content: '';
        position: absolute;
        top: -30px;
        width: 15px;
        height: 30px;
        background-color: transparent;
        left: 5px;
        border-top: 1px solid #000;
        border-right: 1px solid #000;
    }
    .macro-radios-container .macro-percentage-total p:after {
        content: '';
        position: absolute;
        bottom: -30px;
        width: 15px;
        height: 30px;
        background-color: transparent;
        left: 5px;
        border-bottom: 1px solid #000;
        border-right: 1px solid #000;
    }
</style>