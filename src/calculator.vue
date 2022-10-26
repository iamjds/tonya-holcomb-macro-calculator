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
        // this.sendEmail(evt.demo);
      }

      setTimeout(() => {
        this.calculating = false;
        this.resultsAreIn = true;
      }, 3000)      
    })
  },

  methods: {
    sendEmail(userDetails, results) {
      const serviceId = 'service_7ezv9hs';
      const emailTemplateId = 'template_eg1cag3';
      const publicApiKey = 'sTGOoT4rrQxHXl2rS';

      let emailMessage = 'Here are your personal macro results:<br>';
      emailMessage += `<p>${results.protein}</p>`;
      emailMessage += `<p>${results.fat}</p>`;
      emailMessage += `<p>${results.card}</p>`;

      const templateParams = {
          to_name: userDetails.first,
          from_name: 'Tonya Holcomb',
          message: emailMessage,
          reply_to: 'jakeschaap+replyto@gmail.com'
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
