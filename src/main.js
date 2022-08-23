import { createApp } from 'vue'
import './style.css'
import calculator from './calculator.vue'
import mitt from 'mitt';

const emitter = mitt();
const calculatorApp = createApp(calculator);

calculatorApp.config.globalProperties.emitter = emitter;
calculatorApp.mount('#macro-calculator-app');
