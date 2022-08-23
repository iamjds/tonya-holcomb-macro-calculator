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

  data() {
    return {
      results: {}
    }
  },
  
  mounted() {
    this.emitter.on("form-submit-event", (evt) => {  
      if(evt.formCompleted) new Calculations();
    }); 

    this.emitter.on("finish-calculations", (evt) => {
      console.log('calculations completed!', evt.results);
    })
  }
}
</script>

<template>
  <header>
    <h1 class="text-center">Macro Calculator</h1>
  </header>

  <MultiStepForm />
  <Results results="results" />
</template>
