<script>
import MultiStepForm from "./components/MultiStepForm.vue";
import Results from './components/Results.vue';
import Calculations from './calculations';

export default {
  name: 'Macro Calculator',

  components: {
    MultiStepForm,
    Results
  },  

  setup() {    
    const calculationsClass = new Calculations;
    const formCompleted = false;
    return formCompleted;
  }
}
</script>

<template>
  <header>
    <h1 class="text-center">Macro Calculator</h1>
  </header>

  <MultiStepForm v-if="!formCompleted" ref="formCompleted" />
  <Results v-if="formCompleted" />
</template>
