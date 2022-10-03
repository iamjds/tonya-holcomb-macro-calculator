<script>
import MultiStepForm from "./components/MultiStepForm.vue";
import Results from './components/Results.vue';
import Loader from './components/Loader.vue';
import Calculations from './calculations';

export default {
  name: 'Macro Calculator',

  components: {
    Loader,
    MultiStepForm,
    Results  
  },  

  data() {
    return {
      calculating: false,
      resultsAreIn: false,
      results: {}
    }
  },
  
  mounted() {
    this.emitter.on("form-submit-event", (evt) => { 
      this.calculating = true;
      if(evt.formCompleted) new Calculations(this.emitter);
    }); 

    this.emitter.on("finish-calculations", (evt) => {
      console.log('calculations completed!', evt.results);
      this.results = evt.results;

      setTimeout(() => {
        this.calculating = false;
        this.resultsAreIn = true;
      }, 3000)
    })
  }
}
</script>

<template>
  <header>
    <h1 class="text-center">Macro Calculator</h1>
  </header>

  <MultiStepForm v-if="calculating == false && resultsAreIn == false" />
  <Loader v-show="calculating == true" />  
  <Results v-show="resultsAreIn == true" results="results" />
</template>
