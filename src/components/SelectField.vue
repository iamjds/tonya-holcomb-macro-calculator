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
                let activityLevelSelection = evt.currentTarget.selectedOptions[0].innerText;
                let activityLevelSelectionIndex = this.fields[fieldKey].options.findIndex(o => o == activityLevelSelection);

                this.optionsNote = this.fields[fieldKey].optionsDescription[activityLevelSelectionIndex];
            }
        } 
    }
}
</script>

<template>
    <span class="italic leading-4 text-sm" v-if="optionsNote">{{optionsNote}}</span>
    <select @change="onSelectChange($event, fieldKey)" v-model="fields[fieldKey].value" class="block mt-2 mb-4 w-full border-none rounded">
        <option v-if="fields[fieldKey].placeholder != null" value="0" selected>{{fields[fieldKey].placeholder}}</option>
        <option v-if="fields[fieldKey].placeholder == undefined" value="0" selected>-- choose {{fields[fieldKey].label}} --</option>
        <option 
        v-for="(option, id) in fields[fieldKey].options" 
        :value="{id}">{{option}}</option>
    </select>
</template> 