import dataFields from './data-fields';

export default class Calculations {
    calculationData = {};
    emitter;
    tdee = 0.000000;

    constructor(emitter) {
        this.emitter = emitter;
        this.calculationData = dataFields;
        this.initializeCalculations();
    }

    async initializeCalculations() {
        // step #1 - Basal Metabolic State
        const bmr = await this.calculatBMR();

        // step #2 - Total Daily Energy Expenditure
        this.tdee = await this.getTDEE(bmr);

        // step #3 - Calculate Macros
        const macros = await this.getAllMacros();

        // gather user details
        const _data = this.calculationData;
        const userDetails = {
            first: _data.firstName.value,
            last: _data.lastName.value,
            email: _data.email.value
        }

        // display results
        if(macros){
            this.emitter.emit("finish-calculations", {'results': macros, 'demo': userDetails});
        }
    }

    convertWeightPoundsToKilograms(lb) {
        return lb * 0.45359237;
    }

    convertHeightToCentimeters(feet, inches) {
        const feetInInches = feet * 12;
        const totalInches = feetInInches + inches;
        const totalCentimeters = totalInches * 2.54;

        return totalCentimeters;
    }

    getTDEEFormulaPerActivityLevel() {
        const activityLevelSelectedID = parseInt(this.calculationData.activityLevel.value);

        if(activityLevelSelectedID === 1) return 1.2;
        if(activityLevelSelectedID === 2) return 1.375;
        if(activityLevelSelectedID === 3) return 1.55;
        if(activityLevelSelectedID === 4) return 1.725;
        if(activityLevelSelectedID === 5) return 1.9;
    }

    getPhaseCountFromDataInputs() {
        let phases = 1;
        const genderSelected = this.calculationData.gender.options[this.calculationData.gender.value].toLowerCase();
        const stageOfLifeSelected = parseInt(this.calculationData.stageOfLife.value);

        if(genderSelected == 'female'){
            if(stageOfLifeSelected === 1) { // Menstruating
                phases = 3;
            }            
        }

        return phases;
    }

    calculateMaleMacros() {
        const selectedGoal = parseInt(this.calculationData.goals.value);
        let multiplier = 1;
        let caloriesToConsumePerDay = this.tdee;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal == 2){ 
            multiplier = 0.85;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal == 3){
            multiplier = 1.15;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        /**
         * STEP #2
         */
        const proteinCaloriesWorkingFormula = caloriesToConsumePerDay * 0.35;
        const fatCaloriesWorkingFormula = caloriesToConsumePerDay * 0.35;
        const carbsCalorieWorkingFormula = caloriesToConsumePerDay * 0.3;

        /**
         * STEP #3
         */
        const proteinCaloriesToGrams = proteinCaloriesWorkingFormula / 4;
        const fatCaloriesToGrams = fatCaloriesWorkingFormula / 9;
        const carbsCaloriesToGrams = carbsCalorieWorkingFormula / 4;

        return {
            protein: Math.round(proteinCaloriesToGrams),
            fat: Math.round(fatCaloriesToGrams),
            carbs: Math.round(carbsCaloriesToGrams)
        }
    }

    calculateMenopausalMacros() {
        const selectedGoal = parseInt(this.calculationData.goals.value);
        let multiplier = 1;
        let caloriesToConsumePerDay = this.tdee;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal === 2){ 
            multiplier = 0.85;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal === 3){
            multiplier = 1.15;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        /**
         * STEP #2
         */
        const proteinCaloriesWorkingFormula = caloriesToConsumePerDay * 0.23;
        const fatCaloriesWorkingFormula = caloriesToConsumePerDay * 0.4;
        const carbsCalorieWorkingFormula = caloriesToConsumePerDay * 0.37;

        /**
         * STEP #3
         */
        const proteinCaloriesToGrams = proteinCaloriesWorkingFormula / 4;
        const fatCaloriesToGrams = fatCaloriesWorkingFormula / 9;
        const carbsCaloriesToGrams = carbsCalorieWorkingFormula / 4;

        return {
            protein: Math.round(proteinCaloriesToGrams),
            fat: Math.round(fatCaloriesToGrams),
            carbs: Math.round(carbsCaloriesToGrams)
        }
    }

    calculationMenstruationPhaseMacros(phase, workingObj) {
        const selectedGoal = parseInt(this.calculationData.goals.value);
        let caloriesToConsumePerDay = this.tdee;

        /**
         * STEP #1
         */
        // Maintain Weight
        if(selectedGoal === 1){ 
            if(phase == 1) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * 1.1 * .17) / 5).toFixed(6));
            if(phase == 2) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .4 * .7) / 12).toFixed(6));
            if(phase == 3) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .43 * 1.2) / 13).toFixed(6));
        }

        // Release Weight
        if(selectedGoal === 2){             
            if(phase == 1) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * 1.1 * .17) / 5 * .84).toFixed(6));
            if(phase == 2) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .4 * .7) / 12 * .85).toFixed(6));
            if(phase == 3) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .432 * 1.2) / 13 * .85).toFixed(6));
        }        

        // Gain Weight
        if(selectedGoal === 3){
            if(phase == 1) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * 1.1 * .17) / 5 * 1.15).toFixed(6));
            if(phase == 2) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .4 * .7) / 12 * 1.15).toFixed(6));
            if(phase == 3) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .43 * 1.2) / 13 * 1.15).toFixed(6));
        }

        /**
         * TODO: account for calories being lower than 1,200
         * for the follicular/ovulatory phase
         */

        /**
         * STEP #2
         */
        const proteinCaloriesWorkingFormula = caloriesToConsumePerDay * workingObj.step2.proteinWorking;
        const fatCaloriesWorkingFormula = caloriesToConsumePerDay * workingObj.step2.fatWorking;
        const carbsCalorieWorkingFormula = caloriesToConsumePerDay * workingObj.step2.carbsWorking;

        /**
         * STEP #3
         */
        const proteinCaloriesToGrams = proteinCaloriesWorkingFormula / workingObj.step3.proteinToGrams;
        const fatCaloriesToGrams = fatCaloriesWorkingFormula / workingObj.step3.fatsToGrams;
        const carbsCaloriesToGrams = carbsCalorieWorkingFormula / workingObj.step3.carbsToGrams;

        return {
            protein: Math.round(proteinCaloriesToGrams),
            fat: Math.round(fatCaloriesToGrams),
            carbs: Math.round(carbsCaloriesToGrams)
        }
    }

    calculateGeneralMacros() {
        const selectedGoal = parseInt(this.calculationData.goals.value);
        let multiplier = 1;
        let caloriesToConsumePerDay = this.tdee;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal === 2){ 
            multiplier = 0.85;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal === 3){
            multiplier = 1.15;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        /**
         * STEP #2
         */
        const proteinCaloriesWorkingFormula = caloriesToConsumePerDay * 0.3;
        const fatCaloriesWorkingFormula = caloriesToConsumePerDay * 0.38;
        const carbsCalorieWorkingFormula = caloriesToConsumePerDay * 0.32;

        /**
         * STEP #3
         */
        const proteinCaloriesToGrams = proteinCaloriesWorkingFormula / 4;
        const fatCaloriesToGrams = fatCaloriesWorkingFormula / 9;
        const carbsCaloriesToGrams = carbsCalorieWorkingFormula / 4;

        return {
            protein: Math.round(proteinCaloriesToGrams),
            fat: Math.round(fatCaloriesToGrams),
            carbs: Math.round(carbsCaloriesToGrams)
        }
    }

    getMacrosForPhase(phaseIndex) {
        let calculationMultiplierObj = {
            step2: {
                proteinWorking: 0.32,
                fatWorking: 0.4,
                carbsWorking: 0.28
            },
            step3: {
                proteinToGrams: 4,
                fatsToGrams: 9,
                carbsToGrams: 4
            }
        };

        if(phaseIndex == 3) {
            calculationMultiplierObj.step2 = {
                proteinWorking: 0.32,
                fatWorking: 0.3,
                carbsWorking: 0.38
            }
        }

        const macroResults = this.calculationMenstruationPhaseMacros(phaseIndex, calculationMultiplierObj);

        return macroResults;
    }

    async calculatBMR() {
        return new Promise((resolve, reject) => {
            let bmr = 0.0;

            const weightInKilograms = this.calculationData.weight.value * 0.45359237;
            const heightFeetInInches = this.calculationData.heightInFeet.value * 12;
            const totalHeightInInches = heightFeetInInches + this.calculationData.heightInInches.value;
            const heightInCentimeters = totalHeightInInches * 2.54;

            const gender = this.calculationData.gender.options[this.calculationData.gender.value].toLowerCase();

            if(gender == 'female') {
                bmr = 655 + (9.6 * weightInKilograms) + (1.8 * heightInCentimeters) - (4.7 * this.calculationData.age.value);
            }

            if(gender == 'male') {
                bmr = 66 + (13.7 * weightInKilograms) + (5 * heightInCentimeters) - (6.8 * this.calculationData.age.value);
            }

            resolve(bmr.toFixed(6));
        })
    }

    async getTDEE(bmr) {
        return new Promise((resolve,reject) => {
            const tdeeMultiplier = this.getTDEEFormulaPerActivityLevel();
            resolve((bmr * tdeeMultiplier).toFixed(6));
        });
    }

    async getAllMacros() {
        return new Promise((response, reject) => {
            let monthlyPhases = {};
            const phaseCount = this.getPhaseCountFromDataInputs();
            const gender = parseInt(this.calculationData.gender.value);
            const stageOfLife = parseInt(this.calculationData.stageOfLife.value);

            if(phaseCount == 1) {                
                // Female
                if(gender === 1){
                    if([2,3,4,5,6,7,8].includes(stageOfLife)) {
                        monthlyPhases['general'] = this.calculateGeneralMacros();
                    } 
                    if([9,10].includes(stageOfLife)) {
                        monthlyPhases['meno'] = this.calculateMenopausalMacros();
                    }
                }

                // Male
                if(gender === 2) {
                    monthlyPhases['male'] = this.calculateMaleMacros();
                }
            }

            if(phaseCount > 1) {
                monthlyPhases['general'] = this.calculateGeneralMacros();
                
                for (let index = 1; index < (phaseCount+1); index++) {
                    monthlyPhases['phase' + index] = this.getMacrosForPhase(index);            
                }                
            }

            response(monthlyPhases);
        })
    }
}