const fields = {
    firstName: {
        fieldId: 1,
        label: 'First Name',
        name: 'first-name',
        value: '',
        fieldType: 'text',
        width: 'half',
        required: false
    },
    lastName: {
        fieldId: 2,
        label: 'Last Name',
        name: 'last-name',
        value: '',
        fieldType: 'text',
        width: 'half',
        required: false
    },
    email: {
        fieldId: 3,
        label: 'Email Address',
        name: 'email',
        value: '',
        fieldType: 'email',
        required: true,
        errorMessage: 'please add your email'
    },
    age: {
        fieldId: 4,
        label: 'Age',
        name: 'age',
        value: 0,
        fieldType: 'number',
        required: false
    },
    weight: {
        fieldId: 5,
        label: 'Weight',
        name: 'weight',
        value: 0,
        fieldType: 'number',
        required: true,
        errorMessage: 'please add your weight'
    },
    heightInFeet: {
        fieldId: 6,
        label: 'Height (feet)',
        name: 'height-feet',
        value: 0,
        fieldType: 'number',
        width: 'half',
        required: true,
        errorMessage: 'please add your height in feet'
    },
    heightInInches: {
        fieldId: 7,
        label: '(inches)',
        name: 'height-inches',
        value: 0,
        fieldType: 'number',
        width: 'half',
        required: false
    },
    gender: {
        fieldId: 8,
        label: 'Gender',
        name: 'gender',
        value: 1,
        fieldType: 'select',
        options: {
            1: 'Female',
            2: 'Male'
        },
        required: false
    },
    activityLevel: {
        fieldId: 9,
        label: 'Activity Level',
        name: 'activity-level',
        value: 1,
        options: {
            1: 'Sedentary',
            2: 'Lightly Active',
            3: 'Moderately Active',
            4: 'Very Active',
            5: 'Extremely Active'
        },
        optionsDescription: [
            "You\'re seated most of the day and may or may not work out lightly throughout the week.",
            "Your daily life, habits or occupation keep you on your feet and moving or lightly walking most of the day. <strong>And<\/strong> you work out lightly 1-3 days per week. Examples of light exercise include 30 minutes of weight lifting or 60 minutes of yoga, pilates, etc.",
            "Your daily life, habits or occupation keep you on your feet and moving or lightly walking most of the day. <strong>And<\/strong> you work out for 1-2 hours, 3-5 days per week.",
            "Your daily life, habits or occupation keep you on your feet and moving. <strong>And<\/strong> you workout for 1-2 hours, 6-7 days per week. <strong>Or<\/strong> your daily life, habits, or occupation are very active and demanding. For example: construction work, frequent heavy lifting or strenuous, sweat-inducing labor.",
            "Your daily life, habits or occupation are very active and demanding. For example: construction work, frequent heavy lifting, strenuous labor. <strong>And<\/strong> you workout 1-2 hours, 6-7 days per week."
        ],
        note: '*If in doubt, choose an activity level below what you think you do. Click on an option to see a more detailed description.',
        fieldType: 'select',
        required: false
    },
    goals: {
        fieldId: 10,
        label: 'Is your goal to release, maintain or gain weight? Please select the "I\'m pregnant" option if that applies to you.',
        name: 'goals',
        value: 1,
        options: {
            1: 'Maintain Weight',
            2: 'Release Weight',            
            3: 'Gain Weight',
            4: 'I\'m Pregnant'
        },
        note: "*if you\'re breastfeeding a newborn to one-year-old, your body is burning approximately an additional 500 calories a day, therefore we don\'t recommend that you select \"Release\" and instead choose \"Maintain\" to balance your blood sugar, heal your hormones and harmonize your body.",
        fieldType: 'select',
        required: false
    },
    stageOfLife: {
        fieldId: 11,
        label: 'Select the option that best applies to you.',     
        name: 'stage-of-life',
        value: 0,
        options: {
            0: '',
            1: 'I am menstruating, my periods are regular and I am not on oral birth control.',
            2: 'I am menstruating, my periods are regular and I am on oral birth control.',
            3: 'I am menstruating and my periods are irregular. (You may select this option whether or not you’re on birth control).',
            4: 'I am currently pregnant and in my first trimester',
            5: 'I am currently pregnant and in my second trimester.',
            6: 'I am currently pregnant and in my third trimester.',
            7: 'I am breastfeeding and have gotten my period and it’s regular.',
            8: 'I am breastfeeding and have gotten my period and it’s irregular.',
            9: 'I am in menopause.',
            10: 'I am post-menopausal.',
            11: 'None of these apply to me.'
        },
        fieldType: 'radio',
        placeholder: 'Select the option that best applies to you.',
        required: false
    },
    customizedMacros: {
        fieldId: 12,
        label: 'Do you have customized macro percentages from a HTMA report or protocol?',
        name: 'customized-macros',
        value: 1,
        options: {
            1: 'no',
            2: 'yes'
        },
        fieldType: 'radio',
        required: false
    },
    customizedProtein: {
        fieldId: 13,
        label: 'Protein',
        name: 'customized-protein',
        value: 0,
        fieldType: 'number',
        width: 'half',
        required: false
    },
    customizedFat: {
        fieldId: 14,
        label: 'Fat',
        name: 'customized-fat',
        value: 0,
        fieldType: 'number',
        width: 'half',
        required: false
    },
    customizedCarbs: {
        fieldId: 15,
        label: 'Carbohydrates',
        name: 'customized-carbs',
        value: 0,
        fieldType: 'number',
        width: 'half',
        required: false
    },
    customizedMacrosTotal: {
        fieldId: 16,
        label: '',
        name: 'customized-macros-total',
        value: 0,
        fieldType: 'number',
        required: false
    }
}

export default fields;