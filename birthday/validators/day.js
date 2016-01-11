// Helpers
function lastDay (monthNumber, isLeapYear) {
    const months = ['', 31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return months[monthNumber];
}

function normalizeValue (value, params) {
    return !value || isNaN(value) ? Promise.reject(params.message) : Promise.resolve(value);
}

function checkMin (value, params) {
    return value < 1 ? Promise.reject(params.messageMin) : Promise.resolve(value)
}

function checkMax (value, params, lastDay) {
    return value > lastDay ? Promise.reject(messageMax(lastDay)) : Promise.resolve(value);
}

function isLeapYear (year) {
    if (!year) {
        return false;
    }

    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function messageMax (lastDay) {
    let messages = {
        messageMax: 'Day should be less or equal ',
        message28: 'There are 28 days in February',
        message29: 'There are 29 days in February'
    };

    if (lastDay < 31) {
        return messages['message' + lastDay];
    }

    return messages.messageMax + lastDay;
}

function monthCheck ({value, month, year, params}) {
    if (value) {
        let isLeapYearFlag = isLeapYear(year);
        let lastDayNum = lastDay(month, isLeapYearFlag);

        return simpleValueCheck(value, params, lastDayNum).then(() => {
            return Promise.resolve();
        }, (error) => {
            return Promise.reject(error);
        });
    }

    return Promise.reject(params.message);
}

function simpleValueCheck (value, params, lastDay) {
    return [normalizeValue, checkMin, checkMax].reduce((result, validator) => {
        return result.then((date) => {
            return validator(date, params, lastDay);
        });
    }, Promise.resolve(value));
}

export default () => {
    return [{
        validator (value, params) {
            let currentValue = !isNaN(value.day) && parseInt(value.day);
            let currentMonth = !isNaN(value.month) && parseInt(value.month);
            let currentYear = !isNaN(value.year) && String(value.year).length === 4 && parseInt(value.year);

            // Проверяем по месяцу
            if (currentMonth) {
                return monthCheck({
                    value: currentValue,
                    month: currentMonth,
                    year: currentYear,
                    params
                });
            }

            if (currentValue) {
                return simpleValueCheck(currentValue, params, 31);
            }

            return Promise.reject(params.message);
        },
        params: {
            message: 'Field is required',
            messageMin: 'Day should be greater or equal 1'
        }
    }];
}
