import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import cn from 'classnames';
import Validator from '../defaultValidator';
import Foma from 'foma';
import assign from 'object-assign';
import * as validators from './validators';

const requiredFields = {
    day: {
        name: 'awesome day',
        validator: validators.day
    },
    month: {
        name: 'awesome month',
        validator: validators.month
    },
    year: {
        name: 'awesome year',
        validator: validators.year
    }
};

@Foma
class Birthday extends React.Component {
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
        let newState = update(this.state, {
            birthday: {
                [name]: {$set: event.target.value}
            }
        });

        this.setState(newState);
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
                        value={field === 'day' ? this.state.birthday : this.state.birthday[field]}
                        onEnd={this.onEndValidation(field)}
                        validators={requiredFields[field].validator()}
                        silentInitValidation={true}>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            placeholder={field}
                            className="form-control"
                            autoComplete="off"
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
        var fields = Object.keys(requiredFields);
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
