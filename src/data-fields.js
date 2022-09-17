const fields = {
    firstName: {
        fieldId: 1,
        label: 'First Name',
        name: 'first-name',
        value: '',
        fieldType: 'text',
        width: 'half'
    },
    lastName: {
        fieldId: 2,
        label: 'Last Name',
        name: 'last-name',
        value: '',
        fieldType: 'text',
        width: 'half'
    },
    email: {
        fieldId: 3,
        label: 'Email Address',
        name: 'email',
        value: '',
        fieldType: 'text'
    },
    age: {
        fieldId: 4,
        label: 'Age',
        name: 'age',
        value: 0,
        fieldType: 'number'
    },
    weight: {
        fieldId: 5,
        label: 'Weight',
        name: 'weight',
        value: 0,
        fieldType: 'number'
    },
    heightInFeet: {
        fieldId: 6,
        label: 'Height (feet)',
        name: 'height-feet',
        value: 0,
        fieldType: 'number',
        width: 'half'
    },
    heightInInches: {
        fieldId: 7,
        label: '(inches)',
        name: 'height-inches',
        value: 0,
        fieldType: 'number',
        width: 'half'
    },
    gender: {
        fieldId: 8,
        label: 'Gender',
        name: 'gender',
        value: 0,
        fieldType: 'select',
        options: [
            'Male',
            'Female'
        ],
    },
    activityLevel: {
        fieldId: 9,
        label: 'Activity Level',
        name: 'activity-level',
        value: 0,
        options: [
            'Sedentary',
            'Lightly Active',
            'Moderately Active',
            'Very Active',
            'Extremely Active'
        ],
        optionsDescription: [
            "You\'re seated most of the day and may or may not work out lightly throughout the week.",
            "Your daily life, habits or occupation keep you on your feet and moving or lightly walking most of the day. <strong>And<\/strong> you work out lightly 1-3 days per week. Examples of light exercise include 30 minutes of weight lifting or 60 minutes of yoga, pilates, etc.",
            "Your daily life, habits or occupation keep you on your feet and moving or lightly walking most of the day. <strong>And<\/strong> you work out for 1-2 hours, 3-5 days per week.",
            "Your daily life, habits or occupation keep you on your feet and moving. <strong>And<\/strong> you workout for 1-2 hours, 6-7 days per week. <strong>Or<\/strong> your daily life, habits, or occupation are very active and demanding. For example: construction work, frequent heavy lifting or strenuous, sweat-inducing labor.",
            "Your daily life, habits or occupation are very active and demanding. For example: construction work, frequent heavy lifting, strenuous labor. <strong>And<\/strong> you workout 1-2 hours, 6-7 days per week."
        ],
        note: '*if in doubt, choose an activity level below what you think you do.',
        fieldType: 'select'
    },
    goals: {
        fieldId: 10,
        label: 'Is your goal to release, maintain or gain weight? Please select the "I\'m pregnant" option if that applies to you.',
        name: 'goals',
        value: 0,
        options: [
            'Release Weight',
            'Maintain Weight',
            'Gain Weight',
            'I\'m Pregnant'
        ],
        note: "*if you\'re breastfeeding a newborn to one-year-old, your body is burning approximately an additional 500 calories a day, therefore we don\'t recommend that you select \"Release\" and instead choose \"Maintain\" to balance your blood sugar, heal your hormones and harmonize your body.",
        fieldType: 'select',
        placeholder: '-- choose Goal --'
    },
    stageOfLife: {
        fieldId: 11,
        label: 'Select the option that best applies to you',     
        name: 'stage-of-life',
        value: 0,
        options: [
            {value: 0, label: ''},
            {value: 1, label: 'I am menstruating, my periods are regular and I am not on oral birth control.'},
            {value: 2, label: 'I am menstruating, my periods are regular and I am on oral birth control.'},
            {value: 3, label: 'I am menstruating and my periods are irregular. (You may select this option whether or not you’re on birth control).'},
            {value: 4, label: 'I am currently pregnant and in my first trimester'},
            {value: 5, label: 'I am currently pregnant and in my second trimester.'},
            {value: 6, label: 'I am currently pregnant and in my third trimester.'},
            {value: 7, label: 'I am breastfeeding and have gotten my period and it’s regular.'},
            {value: 8, label: 'I am breastfeeding and have gotten my period and it’s irregular.'},
            {value: 9, label: 'I am in menopause.'},
            {value: 10, label: 'I am post-menopausal.'},
            {value: 11, label: 'None of these apply to me.'}
        ],
        fieldType: 'radio',
        placeholder: 'Select the option that best applies to you.'
    }
}

export default fields;