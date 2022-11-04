<script>
import dataFields from '../data-fields';

export default {
    name: 'SelectField',
    props: {
        fieldKey: String
    },
    data() {
        return {
            fields: dataFields,
            optionsNote: ''
        }
    },
    methods: {
        onSelectChange(evt, fieldKey) {
            if(fieldKey == 'activityLevel'){
                const options = dataFields.activityLevel.options;                
                const activityLevelSelection = evt.currentTarget.selectedOptions[0].innerText;
                const activityLevelSelectionIndex = parseInt(Object.keys(options).find(k => options[k] == activityLevelSelection));

                this.optionsNote = this.fields[fieldKey].optionsDescription[activityLevelSelectionIndex-1];
            }
        } 
    }
}
</script>

<template>
    <span class="italic leading-4 text-sm block" v-if="fields[fieldKey].note">{{fields[fieldKey].note}}</span>
    <span class="leading-4 text-sm" v-if="optionsNote" v-html="optionsNote"></span>
    

    <select @change="onSelectChange($event, fieldKey)" v-model="fields[fieldKey].value" class="block mt-2 mb-4 w-full border-none rounded">
        <option v-if="fields[fieldKey].placeholder != undefined" value="0" selected>{{fields[fieldKey].placeholder}}</option>
        <option 
        v-for="(option, key) in fields[fieldKey].options" 
        :value="key">{{option}}</option>
    </select>
</template> 