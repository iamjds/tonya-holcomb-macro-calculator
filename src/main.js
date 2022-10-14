import { createApp } from 'vue'
import VueTailwind from 'vue-tailwind'
import { TTable, } from 'vue-tailwind/dist/components'

// ref: https://www.vue-tailwind.com/docs/table/

import './style.css'
import calculator from './calculator.vue'
import mitt from 'mitt';

const emitter = mitt();
const calculatorApp = createApp(calculator);

const settings = {
    't-table': {
      component: TTable,
      props: {
        classes: {
          table: 'min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border',
          thead: '',
          theadTr: '',
          theadTh: 'px-3 py-2 font-semibold text-left bg-gray-100 border-b',
          tbody: 'bg-white divide-y divide-gray-100',
          tr: '',
          td: 'px-3 py-2 whitespace-no-wrap',
          tfoot: '',
          tfootTr: '',
          tfootTd: ''
        },
        variants: {
          thin: {
            td: 'p-1 whitespace-no-wrap text-sm',
            theadTh: 'p-1 font-semibold text-left bg-gray-100 border-b text-sm'
          }
        }
      }
    }
}

calculatorApp.use(VueTailwind, settings)
calculatorApp.config.globalProperties.emitter = emitter;
calculatorApp.mount('#macro-calculator-app');