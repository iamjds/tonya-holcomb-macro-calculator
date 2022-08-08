import { createApp } from 'vue'
import './style.css'
import calculator from './calculator.vue'

const calculatorApp = createApp(calculator);

calculatorApp.mount('#macro-calculator-app');
