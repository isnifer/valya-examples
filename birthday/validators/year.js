function normalizeValue (value, params) {
    return isNaN(value) ? Promise.reject(params.message) : Promise.resolve(parseInt(value));
}

function checkMin (value, params) {
    return value < 1900 ? Promise.reject(params.messageMin) : Promise.resolve(value);
}

function checkMax (value, params) {
    return value > 2015 ? Promise.reject(params.messageMax) : Promise.resolve(value);
}

const validators = [normalizeValue, checkMin, checkMax];

export default () => {
    return [
        {
            validator (value, params) {
                return normalizeValue(value, params);
            },
            params: {
                message: 'Year should be from 1900 to 2015'
            }
        },
        {
            validator (value, params) {
                return checkMin(value, params);
            },
            params: {
                messageMin: 'Year should be greater or equal then 1900'
            }
        },
        {
            validator (value, params) {
                return checkMax(value, params);
            },
            params: {
                messageMax: 'Year should be less or equal then 2015'
            }
        }
    ];
}
