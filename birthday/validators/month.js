function normalizeValue (value, params) {
    return !value || isNaN(value) ? Promise.reject(params.message) : Promise.resolve(parseInt(value));
}

function checkMin (value, params) {
    return value < 1 ? Promise.reject(params.messageMin) : Promise.resolve(value);
}

function checkMax (value, params) {
    return value > 12 ? Promise.reject(params.messageMax) : Promise.resolve(value);
}

const validators = [normalizeValue, checkMin, checkMax];

export default () => {
    return [
        {
            validator (value, params) {
                return validators.reduce((result, validator) => {
                    return result.then((month) => {
                        return validator(month, params);
                    });
                }, Promise.resolve(value));
            },
            params: {
                message: 'Month should be from 1 to 12',
                messageMin: 'Month should be greater or equal then 1',
                messageMax: 'Year should be less or equal then 12',
            }
        }
    ];
}
