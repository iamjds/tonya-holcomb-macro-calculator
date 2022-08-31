import dataFields from './data-fields';

export default class Calculations {
    calculationData = {};
    emitter;

    constructor(emitter) {
        this.emitter = emitter;
        this.calculationData = dataFields;
        this.initializeCalculations();
    }

    initializeCalculations() {
        console.info('kicking things calculations!');

        // step #1 - Basal Metabolic State
        const bmr = this.calculatBMR();

        // step #2 - Total Daily Energy Expenditure
        const tdee = this.getTDEE(bmr);

        // step #3 - Calculate Macros
        const macros = this.getAllMacros(tdee);

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
        const stageOfLifeSelected = this.calculationData.stageOfLife.value.id;

        if(genderSelected == 'female'){
            if(stageOfLifeSelected == 1) { // Menstruating
                phases = 3;
            }            
        }

        return phases;
    }

    getMacrosForPhase(phaseIndex) {
        return {
            phase: phaseIndex
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
        return bmr * tdeeMultiplier;
    }

    getAllMacros(tdee) {
        let monthlyPhases = {};
        const phaseCount = this.getPhaseCountFromDataInputs();

        for (let index = 0; index < phaseCount; index++) {
            monthlyPhases['phase' + (index+1)] = this.getMacrosForPhase(index);            
        }
    }
}