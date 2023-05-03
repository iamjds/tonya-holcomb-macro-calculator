<script>
import MultiStepForm from "./components/MultiStepForm.vue";
import Results from './components/Results.vue';
import Loader from './components/Loader.vue';
import Calculations from './calculations';
import emailjs from 'emailjs-com';

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
      this.results = evt.results;      

      // send email if user added it to the form
      if(evt.demo.email != '') {
        this.sendEmail(evt.demo, evt.results);
      }

      setTimeout(() => {
        this.calculating = false;
        this.resultsAreIn = true;
      }, 3000)      
    })
  },

  methods: {
    sendEmail(userDetails, results) {
      const serviceId = 'service_2at777d';
      const allPhasesTemplateId = 'template_7e734ln';
      const bioindividualOnlyTemplateId = 'template_kwja0np';
      const publicApiKey = 'yHRZ2b5OSe-xi4x9n';

      let emailMessage = {};
      let emailTemplateId = 'template_00000';
      let resultsIndex = 0;

      if(results.hasOwnProperty('male')) emailTemplateId = bioindividualOnlyTemplateId;
      if(Object.keys(results).length == 1 && !results.hasOwnProperty('male')) emailTemplateId = bioindividualOnlyTemplateId;
      if(Object.keys(results).length == 4) emailTemplateId = allPhasesTemplateId;      

      for (var r in results){        
        emailMessage[`proteins${resultsIndex}`] = results[r].protein + 'g';
        emailMessage[`fats${resultsIndex}`] = results[r].fat + 'g';
        emailMessage[`carbs${resultsIndex}`] = results[r].carbs + 'g';

        resultsIndex++;
      }
      
      const templateParams = {
        first_name: userDetails.first,
        email_to: userDetails.email,
        from_name: 'Tonya Holcomb',
        message: emailMessage,
        reply_to: 'cyclicalcalculator@gmail.com'
      };

      emailjs.send(serviceId, emailTemplateId, templateParams, publicApiKey)
      .then((response) => {
        console.info(response);
      }, (error) => {
        console.error(error);
      })      
    }
  }
}
</script>

<template>
  <!-- <header>
    <h1 class="text-center">Macro Calculator</h1>
  </header> -->

  <MultiStepForm v-if="calculating == false && resultsAreIn == false" />
  <Loader v-show="calculating == true" />  
  <Results v-show="resultsAreIn == true" :macros="results" />
</template>
