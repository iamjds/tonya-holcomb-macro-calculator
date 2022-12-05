import dataFields from './data-fields';
import config from "../calculator_config.json";

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
        return lb * config.poundsToKilograms;
    }

    convertHeightToCentimeters(feet, inches) {
        const feetInInches = feet * 12;
        const totalInches = feetInInches + inches;
        const totalCentimeters = totalInches * config.inchesToCentimeters;

        return totalCentimeters;
    }

    getTDEEFormulaPerActivityLevel() {
        const activityLevelSelectedID = parseInt(this.calculationData.activityLevel.value);

        if(activityLevelSelectedID === 1) return config.tdeeSedentaryActiveMultiplier;
        if(activityLevelSelectedID === 2) return config.tdeeLightlyActiveMultiplier;
        if(activityLevelSelectedID === 3) return config.tdeeModeratelyActiveMultiplier;
        if(activityLevelSelectedID === 4) return config.tdeeVeryActiveMultiplier;
        if(activityLevelSelectedID === 5) return config.tdeeExtremelyActiveMultiplier;
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
            multiplier = config.maleMacrosCaloriesPerDayReleaseMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal == 3){
            multiplier = config.maleMacrosCaloriesPerDayGainMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        /**
         * STEP #2
         */
        const proteinCaloriesWorkingFormula = caloriesToConsumePerDay * config.maleMacrosProteinCaloriesWorkingFormula;
        const fatCaloriesWorkingFormula = caloriesToConsumePerDay * config.maleMacrosFatCaloriesWorkingFormula;
        const carbsCalorieWorkingFormula = caloriesToConsumePerDay * config.maleMacrosCarbsCaloriesWorkingFormula;

        /**
         * STEP #3
         */
        const proteinCaloriesToGrams = proteinCaloriesWorkingFormula / config.maleMacrosProteinCaloriesToGrams;
        const fatCaloriesToGrams = fatCaloriesWorkingFormula / config.maleMacrosFatCaloriesToGrams;
        const carbsCaloriesToGrams = carbsCalorieWorkingFormula / config.maleMacrosCarbsCaloriesToGrams;

        return {
            phaseName: 'male',
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
            multiplier = config.menopausalMacrosCaloriesPerDayReleaseMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal === 3){
            multiplier = config.menopausalMacrosCaloriesPerDayGainMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        /**
         * STEP #2
         */
        const proteinCaloriesWorkingFormula = caloriesToConsumePerDay * config.menopausalMacrosProteinCaloriesWorkingFormula;
        const fatCaloriesWorkingFormula = caloriesToConsumePerDay * config.menopausalMacrosFatCaloriesWorkingFormula;
        const carbsCalorieWorkingFormula = caloriesToConsumePerDay * config.menopausalMacrosCarbsCaloriesWorkingFormula;

        /**
         * STEP #3
         */
        const proteinCaloriesToGrams = proteinCaloriesWorkingFormula / config.menopausalMacrosProteinCaloriesToGrams;
        const fatCaloriesToGrams = fatCaloriesWorkingFormula / config.menopausalMacrosFatCaloriesToGrams;
        const carbsCaloriesToGrams = carbsCalorieWorkingFormula / config.menopausalMacrosCarbsCaloriesToGrams;

        return {
            phaseName: 'menopausal',
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
        // Release Weight
        if(selectedGoal === 2){             
            if(phase == 1) caloriesToConsumePerDay = parseFloat((this.tdee * eval(config.menstruatingPhase1ReleaseCaloriesPerDayMultiplier)).toFixed(config.amountOfDecimalPlaces)); // Menstruating
            if(phase == 2) caloriesToConsumePerDay = parseFloat((this.tdee * eval(config.menstruatingPhase2ReleaseCaloriesPerDayMultiplier)).toFixed(config.amountOfDecimalPlaces));
            if(phase == 3) caloriesToConsumePerDay = parseFloat((this.tdee * eval(config.menstruatingPhase3ReleaseCaloriesPerDayMultiplier)).toFixed(config.amountOfDecimalPlaces));
        } 

        // Maintain Weight
        if(selectedGoal === 1){ 
            if(phase == 1) caloriesToConsumePerDay = parseFloat((this.tdee * eval(config.menstruatingPhase1MaintainCaloriesPerDayMultiplier)).toFixed(config.amountOfDecimalPlaces)); // Menstruating
            if(phase == 2) caloriesToConsumePerDay = parseFloat((this.tdee * eval(config.menstruatingPhase2MaintainCaloriesPerDayMultiplier)).toFixed(config.amountOfDecimalPlaces)); // Follicular/Ovulatory
            if(phase == 3) caloriesToConsumePerDay = parseFloat((this.tdee * eval(config.menstruatingPhase3MaintainCaloriesPerDayMultiplier)).toFixed(config.amountOfDecimalPlaces));
        }               

        // Gain Weight
        if(selectedGoal === 3){
            if(phase == 1) caloriesToConsumePerDay = parseFloat((this.tdee * eval(config.menstruatingPhase1GainCaloriesPerDayMultiplier)).toFixed(config.amountOfDecimalPlaces));
            if(phase == 2) caloriesToConsumePerDay = parseFloat((this.tdee * eval(config.menstruatingPhase2GainCaloriesPerDayMultiplier)).toFixed(config.amountOfDecimalPlaces));
            if(phase == 3) caloriesToConsumePerDay = parseFloat((this.tdee * eval(config.menstruatingPhase3GainCaloriesPerDayMultiplier)).toFixed(config.amountOfDecimalPlaces)); // Luteal
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
            phaseName: 'general',
            protein: Math.round(proteinCaloriesToGrams),
            fat: Math.round(fatCaloriesToGrams),
            carbs: Math.round(carbsCaloriesToGrams)
        }
    }

    getMacrosForPhase(phaseIndex) {
        let phaseName = '';
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

        if(phaseIndex == 1) phaseName = 'menstrual';
        if(phaseIndex == 2) phaseName = 'follicular';
        if(phaseIndex == 3) {
            calculationMultiplierObj.step2 = {
                proteinWorking: 0.32,
                fatWorking: 0.3,
                carbsWorking: 0.38
            }
            phaseName = 'luteal';
        }        

        let macroResults = this.calculationMenstruationPhaseMacros(phaseIndex, calculationMultiplierObj);
        macroResults.phaseName = phaseName;

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

            resolve(bmr.toFixed(config.amountOfDecimalPlaces));
        })
    }

    async getTDEE(bmr) {
        return new Promise((resolve,reject) => {
            const tdeeMultiplier = this.getTDEEFormulaPerActivityLevel();
            resolve((bmr * tdeeMultiplier).toFixed(config.amountOfDecimalPlaces));
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