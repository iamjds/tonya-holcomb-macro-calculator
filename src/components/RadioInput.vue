<script>
import dataFields from '../data-fields';

export default {
    name: 'RadioInput',
    props: {
        fieldKey: String
    },
    data() {
        return {
            fields: dataFields
        }
    }
}
</script>

<template>
    <div v-for="(field, key) in fields[fieldKey].options" class="radio-field mt-2 mb-4 flex">
        <input   
            v-if="key != 0"     
            :name="fields[fieldKey].name"
            class="input border-none mt-1 mr-2"
            type="radio"
            :value="key"
            v-model="fields[fieldKey].value"
        />
        <label :for="fields[fieldKey].name">{{field}}</label>
    </div>
</template>

<style scoped>
    [type='radio']:checked {
        background-color: #9b59b6;
    }
</style>