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
        value: '0',
        fieldType: 'select',
        options: [
            'Male',
            'Female'
        ],
    },
    activityLevel: {
        label: 'Activity Level',
        value: '0',
        options: [
            'Sedentary',
            'Lightly Active',
            'Moderately Active',
            'Very Active',
            'Extremely Active'
        ],
        fieldType: 'select'
    },
    stageOfLife: {
        label: 'Stage of Life',
        name: 'stage-of-life',
        value: '0',
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