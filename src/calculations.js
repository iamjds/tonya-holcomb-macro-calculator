import dataFields from './data-fields';

export default class Calculations {
    calculationData = {};

    constructor() {
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
        const anatomySelected = this.calculationData.anatomy.value.id;
        const stageOfLifeSelected = this.calculationData.stageOfLife.value.id;

        if(anatomySelected == 1){ // Woman
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

    }

    getTDEE(bmr) {
        const tdeeMultiplier = this.getTDEEFormulaPerActivityLevel();
        return bmr * tdeeMultiplier;
    }

    getAllMacros(tdee) {
        let monthlyPhases = {};
        const phaseCount = getPhaseCountFromDataInputs();

        for (let index = 0; index < phaseCount; index++) {
            monthlyPhases['phase' + (index+1)] = getMacrosForPhase(index);            
        }
    }
}