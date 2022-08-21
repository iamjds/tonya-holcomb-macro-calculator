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
    anatomy: {
        label: 'Anatomy',
        value: '0',
        fieldType: 'select',
        options: [
            'Male',
            'Female'
        ]
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
        value: '0',
        options: [
            'Breastfeeding',
            'Menstruating',
            'Menopausal'
        ],
        fieldType: 'select'
    }
}

export default fields;