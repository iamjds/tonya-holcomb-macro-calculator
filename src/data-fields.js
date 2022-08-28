const fields = {
    firstName: {
        label: 'First Name',
        value: '',
        fieldType: 'text'
    },
    lastName: {
        label: 'Last Name',
        value: '',
        fieldType: 'text'
    },
    email: {
        label: 'Email Address',
        value: '',
        fieldType: 'text'
    },
    age: {
        label: 'Age',
        value: '',
        fieldType: 'number'
    },
    weight: {
        label: 'Weight',
        value: '',
        fieldType: 'number'
    },
    heightInFeet: {
        label: 'Height (feet)',
        value: '',
        fieldType: 'number'
    },
    heightInInches: {
        label: 'Height (inches)',
        value: '',
        fieldType: 'number'
    },
    gender: {
        label: 'Gender',
        value: 0,
        fieldType: 'select',
        options: [
            'Male',
            'Female'
        ],
    },
    activityLevel: {
        label: 'Activity Level',
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
            "Your daily life, habits or occupation keep you on your feet and moving or lightly walking most of the day. And you work out lightly 1-3 days per week. Examples of light exercise include 30 minutes of weight lifting or 60 minutes of yoga, pilates, etc.",
            "Your daily life, habits or occupation keep you on your feet and moving or lightly walking most of the day. And you work out for 1-2 hours, 3-5 days per week.",
            "Your daily life, habits or occupation keep you on your feet and moving. And you workout for 1-2 hours, 6-7 days per week. OR your daily life, habits, or occupation are very active and demanding. For example: construction work, frequent heavy lifting or strenuous, sweat-inducing labor.",
            "Your daily life, habits or occupation are very active and demanding. For example: construction work, frequent heavy lifting, strenuous labor. And you workout 1-2 hours, 6-7 days per week."
        ],
        fieldType: 'select'
    },
    goals: {
        label: 'Goals',
        value: 0,
        options: [
            'Release Weight',
            'Maintain Weight',
            'Gain Weight',
            'Pregnant'
        ],
        note: "If you\'re breastfeeding a newborn to one-year-old, your body is burning approximately an additional 500 calories a day, therefore we don\'t recommend that you select \"Release\" and instead choose \"Maintain\" to balance your blood sugar, heal your hormones and harmonize your body.",
        fieldType: 'select'
    },
    stageOfLife: {
        label: 'Stage of Life',
        name: 'stage-of-life',
        value: 0,
        options: [
            'I am menstruating, my periods are regular and I am not on oral birth control.',
            'I am menstruating, my periods are regular and I am on oral birth control.',
            'I am menstruating and my periods are irregular. (You may select this option whether or not you’re on birth control).',
            'I am currently pregnant and in my first trimester',
            'I am currently pregnant and in my second trimester.',
            'I am currently pregnant and in my third trimester.',
            'I am breastfeeding and have gotten my period and it’s regular.',
            'I am breastfeeding and have gotten my period and it’s irregular.',
            'I am in menopause.',
            'I am post-menopausal.',
            'None of these apply to me.'
        ],
        fieldType: 'radio',
        placeholder: 'Select the option that best applies to you.'
    }
}

export default fields;