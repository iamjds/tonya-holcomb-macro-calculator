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

    initializeCalculations() {
        // step #1 - Basal Metabolic State
        const bmr = this.calculatBMR();

        // step #2 - Total Daily Energy Expenditure
        this.tdee = this.getTDEE(bmr);

        // step #3 - Calculate Macros
        const macros = this.getAllMacros();

        // display results
        this.emitter.emit("finish-calculations", {'results': macros});
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
        const activityLevelSelectedID = this.calculationData.activityLevel.value.id;

        if(activityLevelSelectedID == 0) return 1.2;
        if(activityLevelSelectedID == 1) return 1.375;
        if(activityLevelSelectedID == 2) return 1.55;
        if(activityLevelSelectedID == 3) return 1.725;
        if(activityLevelSelectedID == 4) return 1.9;
    }

    getPhaseCountFromDataInputs() {
        let phases = 1;
        const genderSelected = this.calculationData.gender.options[this.calculationData.gender.value.id].toLowerCase();
        const stageOfLifeSelected = this.calculationData.stageOfLife.value;

        if(genderSelected == 'female'){
            if(stageOfLifeSelected == 1) { // Menstruating
                phases = 3;
            }            
        }

        return phases;
    }

    calculateMaleMacros() {
        const selectedGoal = this.calculationData.goals.value.id;
        let multiplier = 1;
        let caloriesToConsumePerDay = this.tdee;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal == 0){ 
            multiplier = 0.85;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal == 2){
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
        const selectedGoal = this.calculationData.goals.value.id;
        let multiplier = 1;
        let caloriesToConsumePerDay = this.tdee;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal == 0){ 
            multiplier = 0.85;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal == 2){
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
        const selectedGoal = this.calculationData.goals.value.id;
        let caloriesToConsumePerDay = this.tdee;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal == 0){             
            if(phase == 1) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * 1.1 * .17) / 5 * .84).toFixed(6));
            if(phase == 2) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .4 * .7) / 12 * .85).toFixed(6));
            if(phase == 3) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .432 * 1.2) / 13 * .85).toFixed(6));
        }

        // Maintain Weight
        if(selectedGoal == 1){ 
            if(phase == 1) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * 1.1 * .17) / 5).toFixed(6));
            if(phase == 2) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .4 * .7) / 12).toFixed(6));
            if(phase == 3) caloriesToConsumePerDay = parseFloat(((this.tdee * 30 * .43 * 1.2) / 13).toFixed(6));
        }

        // Gain Weight
        if(selectedGoal == 2){
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
        const selectedGoal = this.calculationData.goals.value.id;
        let multiplier = 1;
        let caloriesToConsumePerDay = this.tdee;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal == 0){ 
            multiplier = 0.85;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal == 2){
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

        return {
            macros: macroResults
        }
    }

    calculatBMR() {
        let bmr = 0.0;

        const weightInKilograms = this.calculationData.weight.value * 0.45359237;
        const heightFeetInInches = this.calculationData.heightInFeet.value * 12;
        const totalHeightInInches = heightFeetInInches + this.calculationData.heightInInches.value;
        const heightInCentimeters = totalHeightInInches * 2.54;

        const gender = this.calculationData.gender.options[this.calculationData.gender.value.id].toLowerCase();

        if(gender == 'female') {
            bmr = 655 + (9.6 * weightInKilograms) + (1.8 * heightInCentimeters) - (4.7 * this.calculationData.age.value);
        }

        if(gender == 'male') {
            bmr = 66 + (13.7 * weightInKilograms) + (5 * heightInCentimeters) - (6.8 * this.calculationData.age.value);
        }

        return bmr.toFixed(6);
    }

    getTDEE(bmr) {
        const tdeeMultiplier = this.getTDEEFormulaPerActivityLevel();
        return (bmr * tdeeMultiplier).toFixed(6);
    }

    getAllMacros() {
        let monthlyPhases = {};
        const phaseCount = this.getPhaseCountFromDataInputs();
        const gender = this.calculationData.gender.value.id;
        const stageOfLife = this.calculationData.stageOfLife.value;

        if(phaseCount == 1) {
            // Male
            if(gender == 0) {
                monthlyPhases['male'] = this.calculateMaleMacros();
            }

            // Female
            if(gender == 1){
                if([2,3,4,5,6,7,8].includes(stageOfLife)) {
                    monthlyPhases['general'] = this.calculateGeneralMacros();
                } 
                if([9,10].includes(stageOfLife)) {
                    monthlyPhases['meno'] = this.calculateMenopausalMacros();
                }
            }
        }

        if(phaseCount > 1) {
            for (let index = 1; index < (phaseCount+1); index++) {
                monthlyPhases['phase' + index] = this.getMacrosForPhase(index);            
            }
            monthlyPhases['general'] = this.calculateGeneralMacros();
        }

        return monthlyPhases;
    }
}