import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Validator from '../defaultValidator';
import Foma from 'foma';

const { Component } = React;

const requiredFields = {
    day: {
        name: 'awesome day',
        validator: () => {
            return {
                validator (value, params) {
                    let currentValue = !isNaN(value.day) && parseInt(value.day);
                    let currentMonth = !isNaN(value.month) && parseInt(value.month);
                    let currentYear = !isNaN(value.year) && String(value.year).length === 4 && parseInt(value.year);

                    // Проверяем по месяцу
                    if (currentMonth) {
                        return params.monthCheck({
                            value: currentValue,
                            month: currentMonth,
                            year: currentYear,
                            params
                        });
                    }

                    if (currentValue) {
                        return params.simpleValueCheck(currentValue, params, 31);
                    }


                    return Promise.reject(params.message);
                },
                params: {
                    message: 'Field is required',
                    messageMin: 'Day should be greater or equal 1',
                    messageMax: (lastDay) => {
                        let messages = {
                            messageMax: 'Day should be less or equal ',
                            message29: 'There are 28 days in February',
                            message28: 'There are 29 days in February'
                        };

                        if (lastDay === 28) {
                            return messages.message29;
                        }

                        if (lastDay === 29) {
                            return messages.message28;
                        }

                        return messages.messageMax + lastDay;
                    },
                    isLeapYear: (year) => {
                        if (!year) {
                            return false;
                        }

                        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
                    },
                    lastDay: (monthNumber, isLeapYear) => {
                        const months = ['', 31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                        return months[monthNumber];
                    },
                    monthCheck: ({value, month, year, params}) => {

                        // Если февраль
                        if (month === 2) {

                            // Если есть год, надо проверить, високосный ли он
                            // если да, то дней должно быть 29, иначе 28
                            let isLeapYear = params.isLeapYear(year);

                            if (value) {
                                let lastDay = params.lastDay(month, isLeapYear);

                                return params.simpleValueCheck(value, params, lastDay).then(() => {
                                    return Promise.resolve();
                                }).catch((promiseMessage) => {
                                    return Promise.reject(promiseMessage);
                                });
                            }

                            return Promise.reject(params.message);
                        }

                        // Если это другой месяц
                        else {

                            // То лишь бы было значение в интервале
                            // от 1 до последней даты месяца
                            if (value) {
                                let lastDay = params.lastDay(month);

                                return params.simpleValueCheck(value, params, lastDay).then(() => {
                                    return Promise.resolve();
                                }, (promiseMessage) => {
                                    return Promise.reject(promiseMessage);
                                });
                            }

                            return Promise.reject(params.message)
                        }
                    },
                    simpleValueCheck: (value, params, lastDay) => {

                        if (value >= 1 && value <= lastDay) {
                            return Promise.resolve();
                        }

                        if (value < 1) {
                            return Promise.reject(params.messageMin)
                        }

                        if (value > lastDay) {
                            return Promise.reject(params.messageMax(lastDay));
                        }

                        return Promise.reject(params.message);
                    }
                }
            }
        }
    },
    month: {
        name: 'awesome month',
        validator: () => {
            return {
                validator (value, params) {
                    let currentValue = !isNaN(value.month) && parseInt(value.month);

                    if (currentValue >= 1 && currentValue <= 12) {
                        return Promise.resolve();
                    }

                    if (currentValue < 1) {
                        return Promise.reject(params.messageMin);
                    }

                    if (currentValue > 12) {
                        return Promise.reject(params.messageMax);
                    }

                    return Promise.reject(params.message);
                },
                params: {
                    message: 'Month should be from 1 to 12',
                    messageMin: 'Month should be greater or equal then 1',
                    messageMax: 'Year should be less or equal then 12',
                }
            }
        }
    },
    year: {
        name: 'awesome year',
        validator: () => {
            return {
                validator (value, params) {
                    let currentYear = !isNaN(value.year) && parseInt(value.year) || null;

                    if (currentYear >= 1900 && currentYear <= 2015) {
                        return Promise.resolve();
                    }

                    if (currentYear < 1900) {
                        return Promise.reject(params.messageMin);
                    }

                    if (currentYear > 2015) {
                        return Promise.reject(params.messageMax);
                    }

                    return Promise.reject(params.message);
                },
                params: {
                    message: 'Year should be from 1900 to 2015',
                    messageMin: 'Year should be greater or equal then 1900',
                    messageMax: 'Year should be less or equal then 2015'
                }
            }
        }
    }
};

@Foma
class Birthday extends Component {
    static displayName = 'Birthday';

    constructor (props) {
        super(props);

        this.state = {
            birthday: {
                day: null,
                month: null,
                year: null
            }
        };
    }

    setField (name, event) {
        var state = this.state;
        var bday = this.state.birthday;

        this.setState({birthday: {
            day: name === 'day' ? event.target.value : bday.day,
            month: name === 'month' ? event.target.value : bday.month,
            year: name === 'year' ? event.target.value : bday.year
        }});
    }

    onSubmit (event) {
        if (this.props.isValid) {
            alert('You are awesome!');
        } else {
            this.props.foma.viewWarning(true);
        }

        return event.preventDefault();
    }

    onEndValidation (name) {
        return (isValid, message) => {
            this.props.foma.setValidationInfo({isValid, message, name});
        }
    }

    renderFields (fields) {
        return fields.map((field, i) => {
            return (
                <div className="form-group" key={i}>
                    <label htmlFor={field}>{field}</label>
                    <Validator
                        value={this.state.birthday}
                        onEnd={this.onEndValidation(field)}
                        validators={[requiredFields[field].validator()]}
                        initialValidation={true}>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            placeholder={field}
                            className="form-control"
                            value={this.state.birthday[field]}
                            maxLength={field === 'year' ? 4 : 2}
                            minLength={field === 'year' ? 4 : 2}
                            onChange={this.setField.bind(this, field)} />
                    </Validator>
                </div>
            );
        });
    }

    render () {
        var fields = ['day', 'month', 'year'];
        return (
            <form style={{width: '600px', padding: '50px 0 0 50px'}} noValidate>
                <h2>Valya (foma, foma-warning) example for birthday fields</h2>
                {this.renderFields(fields)}
                {this.props.foma.renderWarning({
                    message: 'These fields are required:',
                    items: this.props.invalidFields.map((element) => {
                        return {
                            fieldName: element,
                            name: requiredFields[element].name,
                            handler: requiredFields[element].handler
                        };
                    })
                })}
                <button
                    type="submit"
                    onClick={::this.onSubmit}
                    className={cn('btn btn-success', {disabled: this.props.isInvalid})}>
                    Submit
                </button>
            </form>
        );
    }
}

ReactDOM.render(<Birthday />, document.querySelector('.main'));
