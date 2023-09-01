import dataFields from './data-fields';
//import config from "../calculator_config.json";

export default class Calculations {
    calculationData = {};
    emitter;
    tdee = 0.000000;

    constructor(emitter) {
        this.emitter = emitter;
        this.calculationData = dataFields;
        this.config = window.calculator_settings // this global variable only exists in Kajabi
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
            console.info('macros', macros);
            this.emitter.emit("finish-calculations", {'results': macros, 'demo': userDetails});
        }
    }

    convertWeightPoundsToKilograms(lb) {
        return lb * this.config.poundsToKilograms;
    }

    convertHeightToCentimeters(feet, inches) {
        const feetInInches = feet * 12;
        const totalInches = feetInInches + inches;
        const totalCentimeters = totalInches * this.config.inchesToCentimeters;

        return totalCentimeters;
    }

    getTDEEFormulaPerActivityLevel() {
        const activityLevelSelectedID = parseInt(this.calculationData.activityLevel.value);

        if(activityLevelSelectedID === 1) return this.config.tdeeSedentaryActiveMultiplier;
        if(activityLevelSelectedID === 2) return this.config.tdeeLightlyActiveMultiplier;
        if(activityLevelSelectedID === 3) return this.config.tdeeModeratelyActiveMultiplier;
        if(activityLevelSelectedID === 4) return this.config.tdeeVeryActiveMultiplier;
        if(activityLevelSelectedID === 5) return this.config.tdeeExtremelyActiveMultiplier;
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
        const customizedMacros = parseInt(this.calculationData.customizedMacros.value);
        let multiplier = 1;
        let caloriesToConsumePerDay = this.tdee;
        let proteinCaloriesWorkingFormula = 0.0;
        let fatCaloriesWorkingFormula = 0.0;
        let carbsCalorieWorkingFormula = 0.0;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal == 2){ 
            multiplier = this.config.maleMacrosCaloriesPerDayReleaseMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal == 3){
            multiplier = this.config.maleMacrosCaloriesPerDayGainMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        /**
         * STEP #2
         */
        if(customizedMacros === 2) {
            proteinCaloriesWorkingFormula = caloriesToConsumePerDay * (this.calculationData.customizedProtein.value * 0.01);
            fatCaloriesWorkingFormula = caloriesToConsumePerDay * (this.calculationData.customizedFat.value * 0.01);
            carbsCalorieWorkingFormula = caloriesToConsumePerDay * (this.calculationData.customizedCarbs.value * 0.01);
        } else {
            proteinCaloriesWorkingFormula = caloriesToConsumePerDay * this.config.maleMacrosProteinCaloriesWorkingFormula;
            fatCaloriesWorkingFormula = caloriesToConsumePerDay * this.config.maleMacrosFatCaloriesWorkingFormula;
            carbsCalorieWorkingFormula = caloriesToConsumePerDay * this.config.maleMacrosCarbsCaloriesWorkingFormula;
        }        

        /**
         * STEP #3
         */
        const proteinCaloriesToGrams = proteinCaloriesWorkingFormula / this.config.maleMacrosProteinCaloriesToGrams;
        const fatCaloriesToGrams = fatCaloriesWorkingFormula / this.config.maleMacrosFatCaloriesToGrams;
        const carbsCaloriesToGrams = carbsCalorieWorkingFormula / this.config.maleMacrosCarbsCaloriesToGrams;

        return {
            phaseName: 'male',
            protein: Math.round(proteinCaloriesToGrams),
            fat: Math.round(fatCaloriesToGrams),
            carbs: Math.round(carbsCaloriesToGrams)
        }
    }

    calculateMenopausalMacros() {
        const selectedGoal = parseInt(this.calculationData.goals.value);
        const customizedMacros = parseInt(this.calculationData.customizedMacros.value);
        let multiplier = 1;
        let caloriesToConsumePerDay = this.tdee;
        let proteinCaloriesWorkingFormula = 0.0;
        let fatCaloriesWorkingFormula = 0.0;
        let carbsCalorieWorkingFormula = 0.0;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal === 2){ 
            multiplier = this.config.menopausalMacrosCaloriesPerDayReleaseMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal === 3){
            multiplier = this.config.menopausalMacrosCaloriesPerDayGainMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        /**
         * STEP #2
         */
        if(customizedMacros === 2) {
            proteinCaloriesWorkingFormula = caloriesToConsumePerDay * (this.calculationData.customizedProtein.value * 0.01);
            fatCaloriesWorkingFormula = caloriesToConsumePerDay * (this.calculationData.customizedFat.value * 0.01);
            carbsCalorieWorkingFormula = caloriesToConsumePerDay * (this.calculationData.customizedCarbs.value * 0.01);
        } else {
            proteinCaloriesWorkingFormula = caloriesToConsumePerDay * this.config.menopausalMacrosProteinCaloriesWorkingFormula;
            fatCaloriesWorkingFormula = caloriesToConsumePerDay * this.config.menopausalMacrosFatCaloriesWorkingFormula;
            carbsCalorieWorkingFormula = caloriesToConsumePerDay * this.config.menopausalMacrosCarbsCaloriesWorkingFormula;
        }        

        /**
         * STEP #3
         */
        const proteinCaloriesToGrams = proteinCaloriesWorkingFormula / this.config.menopausalMacrosProteinCaloriesToGrams;
        const fatCaloriesToGrams = fatCaloriesWorkingFormula / this.config.menopausalMacrosFatCaloriesToGrams;
        const carbsCaloriesToGrams = carbsCalorieWorkingFormula / this.config.menopausalMacrosCarbsCaloriesToGrams;

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
            if(phase == 1) caloriesToConsumePerDay = parseFloat((this.tdee * eval(this.config.menstruatingPhase1ReleaseCaloriesPerDayMultiplier)).toFixed(this.config.amountOfDecimalPlaces)); // Menstruating
            if(phase == 2) caloriesToConsumePerDay = parseFloat((this.tdee * eval(this.config.menstruatingPhase2ReleaseCaloriesPerDayMultiplier)).toFixed(this.config.amountOfDecimalPlaces)); // Follicular/Ovulatory
            if(phase == 3) caloriesToConsumePerDay = parseFloat((this.tdee * eval(this.config.menstruatingPhase3ReleaseCaloriesPerDayMultiplier)).toFixed(this.config.amountOfDecimalPlaces)); // Luteal
        } 

        // Maintain Weight
        if(selectedGoal === 1){ 
            if(phase == 1) caloriesToConsumePerDay = parseFloat((this.tdee * eval(this.config.menstruatingPhase1MaintainCaloriesPerDayMultiplier)).toFixed(this.config.amountOfDecimalPlaces)); // Menstruating
            if(phase == 2) caloriesToConsumePerDay = parseFloat((this.tdee * eval(this.config.menstruatingPhase2MaintainCaloriesPerDayMultiplier)).toFixed(this.config.amountOfDecimalPlaces)); // Follicular/Ovulatory
            if(phase == 3) caloriesToConsumePerDay = parseFloat((this.tdee * eval(this.config.menstruatingPhase3MaintainCaloriesPerDayMultiplier)).toFixed(this.config.amountOfDecimalPlaces)); // Luteal
        }               

        // Gain Weight
        if(selectedGoal === 3){
            if(phase == 1) caloriesToConsumePerDay = parseFloat((this.tdee * eval(this.config.menstruatingPhase1GainCaloriesPerDayMultiplier)).toFixed(this.config.amountOfDecimalPlaces)); // Menstruating
            if(phase == 2) caloriesToConsumePerDay = parseFloat((this.tdee * eval(this.config.menstruatingPhase2GainCaloriesPerDayMultiplier)).toFixed(this.config.amountOfDecimalPlaces)); // Follicular/Ovulatory
            if(phase == 3) caloriesToConsumePerDay = parseFloat((this.tdee * eval(this.config.menstruatingPhase3GainCaloriesPerDayMultiplier)).toFixed(this.config.amountOfDecimalPlaces)); // Luteal
        }

        /**
         * If calories to consume is less than 1,200
         * for the Follicular phase
         * bump them up to 1,200
         */
        if(phase == 2 && caloriesToConsumePerDay < 1200) caloriesToConsumePerDay = 1200;

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
        const customizedMacros = parseInt(this.calculationData.customizedMacros.value);
        let multiplier = 1;
        let caloriesToConsumePerDay = this.tdee;
        let proteinCaloriesWorkingFormula = 0.0;
        let fatCaloriesWorkingFormula = 0.0;
        let carbsCalorieWorkingFormula = 0.0;

        /**
         * STEP #1
         */
        // Release Weight
        if(selectedGoal === 2){ 
            multiplier = this.config.generalMacrosCaloriesPerDayReleaseMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        // Gain Weight
        if(selectedGoal === 3){
            multiplier = this.config.generalMacrosCaloriesPerDayGainMultiplier;
            caloriesToConsumePerDay = this.tdee * multiplier;
        }

        /**
         * STEP #2
         */
        if(customizedMacros === 2) {
            proteinCaloriesWorkingFormula = caloriesToConsumePerDay * (this.calculationData.customizedProtein.value * 0.01);
            fatCaloriesWorkingFormula = caloriesToConsumePerDay * (this.calculationData.customizedFat.value * 0.01);
            carbsCalorieWorkingFormula = caloriesToConsumePerDay * (this.calculationData.customizedCarbs.value * 0.01);
        } else {
            proteinCaloriesWorkingFormula = caloriesToConsumePerDay * this.config.generalMacrosProteinCaloriesWorkingFormula;
            fatCaloriesWorkingFormula = caloriesToConsumePerDay * this.config.generalMacrosFatCaloriesWorkingFormula;
            carbsCalorieWorkingFormula = caloriesToConsumePerDay * this.config.generalMacrosCarbsCaloriesWorkingFormula;
        }

        /**
         * STEP #3
         */
        const proteinCaloriesToGrams = proteinCaloriesWorkingFormula / this.config.generalMacrosProteinCaloriesToGrams;
        const fatCaloriesToGrams = fatCaloriesWorkingFormula / this.config.generalMacrosFatCaloriesToGrams;
        const carbsCaloriesToGrams = carbsCalorieWorkingFormula / this.config.generalMacrosCarbsCaloriesToGrams;

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
                proteinWorking: this.config.menstruatingMacrosProteinCaloriesDefaultWorkingFormula,
                fatWorking: this.config.menstruatingMacrosFatCaloriesDefaultWorkingFormula,
                carbsWorking: this.config.menstruatingMacrosCarbsCaloriesDefaultWorkingFormula
            },
            step3: {
                proteinToGrams: this.config.menstruatingMacrosProteinCaloriesToGrams,
                fatsToGrams: this.config.menstruatingMacrosFatCaloriesToGrams,
                carbsToGrams: this.config.menstruatingMacrosCarbsCaloriesToGrams
            }
        };

        if(phaseIndex == 1) phaseName = 'menstrual';
        if(phaseIndex == 2) phaseName = 'follicular';
        if(phaseIndex == 3) {
            calculationMultiplierObj.step2 = {
                proteinWorking: this.config.menstruatingMacrosProteinCaloriesLutealWorkingFormula,
                fatWorking: this.config.menstruatingMacrosFatCaloriesLutealWorkingFormula,
                carbsWorking: this.config.menstruatingMacrosCarbsCaloriesLutealWorkingFormula
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

            const weightInKilograms = this.calculationData.weight.value * this.config.poundsToKilograms;
            const heightFeetInInches = this.calculationData.heightInFeet.value * 12;
            const totalHeightInInches = heightFeetInInches + this.calculationData.heightInInches.value;
            const heightInCentimeters = totalHeightInInches * this.config.inchesToCentimeters;

            const gender = this.calculationData.gender.options[this.calculationData.gender.value].toLowerCase();

            if(gender == 'female') {
                bmr = this.config.bmrFemaleFormulaStaticNumber;
                bmr += (this.config.bmrFemaleWeightInKilosMultiplier * weightInKilograms);
                bmr += (this.config.bmrFemaleHeightInCentimetersMultiplier * heightInCentimeters);
                bmr -= (this.config.bmrFemaleAgeInYearsMultiplier * this.calculationData.age.value);
            }

            if(gender == 'male') {
                bmr = this.config.bmrMaleFormulaStaticNumber;
                bmr += (this.config.bmrMaleWeightInKilosMultiplier * weightInKilograms);
                bmr += (this.config.bmrMaleHeightInCentimetersMultiplier * heightInCentimeters);
                bmr -= (this.config.bmrMaleAgeInYearsMultiplier * this.calculationData.age.value);
            }

            resolve(bmr.toFixed(this.config.amountOfDecimalPlaces));
        })
    }

    async getTDEE(bmr) {
        return new Promise((resolve,reject) => {
            const tdeeMultiplier = this.getTDEEFormulaPerActivityLevel();
            resolve((bmr * tdeeMultiplier).toFixed(this.config.amountOfDecimalPlaces));
        });
    }

    async getAllMacros() {
        return new Promise((response, reject) => {
            let monthlyPhases = {};
            const phaseCount = this.getPhaseCountFromDataInputs();
            const gender = parseInt(this.calculationData.gender.value);
            const stageOfLife = parseInt(this.calculationData.stageOfLife.value); 
            const customizedMacros = parseInt(this.calculationData.customizedMacros.value);                        

            if(phaseCount == 1) {                
                // Female
                if(gender === 1){
                    if([2,3,4,5,6,7,8,11].includes(stageOfLife)) {
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
                
                /**
                 * if customized macros numbers are set
                 * then only 1 macro grams results will 
                 * be shown to the end user
                 */
                if(customizedMacros !== 2){
                    for (let index = 1; index < (phaseCount+1); index++) {
                        monthlyPhases['phase' + index] = this.getMacrosForPhase(index);            
                    } 
                }
            }

            response(monthlyPhases);
        })
    }
}