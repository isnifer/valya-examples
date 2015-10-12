import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Validator from '../defaultValidator';
import Foma from 'foma';
import update from 'react-addons-update';
import * as validators from './validators';

function checkOtherFields (group, fields) {
    return fields.reduce(function (result, field) {
        return !(!result || !group[field]);
    }, true);
}

function fieldValidator (fields, fieldName) {
    return {
        validator: (group, params) => {
            if (group[fieldName]) {
                return validators[fieldName](group[fieldName]) ? Promise.resolve() : Promise.reject(params.message);
            } else {
                if (checkOtherFields(group, fields)) {
                    return Promise.resolve();
                }

                return Promise.reject(params.required);
            }
        },
        params: {
            message: `${fieldName} isn't correct`,
            required: `${fieldName} is required`
        }
    };
}

const requiredFields = {
    email: {
        name: 'email',
        validator: fieldValidator
    },
    phone: {
        name: 'phone',
        validator: fieldValidator
    }
};

@Foma
class EmailPhone extends React.Component {
    static displayName = 'EmailPhone';

    constructor (props) {
        super(props);

        this.state = {
            fields: {
                email: null,
                phone: null
            }
        };
    }

    setField (name, event) {
        var state = update(this.state, {
            fields: {
                [name]: {$set: event.target.value}
            }
        });

        this.setState(state);
    }

    onSubmit (e) {
        if (this.props.isValid) {
            alert('You are awesome!');
        } else {
            this.props.foma.viewWarning(true);
        }

        return e.preventDefault();
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
                        value={this.state.fields}
                        onEnd={this.onEndValidation(field)}
                        validators={[requiredFields[field].validator(fields.filter((element) => {
                            return element !== field;
                        }), field)]}
                        silentInitValidation={true}>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            placeholder={field}
                            className="form-control"
                            value={this.state.fields[field]}
                            onChange={this.setField.bind(this, field)} />
                    </Validator>
                </div>
            );
        });
    }

    render () {
        const fields = ['email', 'phone'];
        return (
            <form style={{width: '500px', padding: '50px 0 0 50px'}} noValidate>
                <h2>Original Valya Example with Foma and Foma-warning</h2>
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

ReactDOM.render(<EmailPhone />, document.querySelector('.main'));
