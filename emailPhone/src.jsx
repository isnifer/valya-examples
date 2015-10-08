import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Validator from '../defaultValidator';
import Foma from 'foma';

const requiredFields = {
    email: {
        name: 'email',
        validator: ({dependentFieldName, fieldName}) => {
            return {
                validator: (value, params) => {
                    if (value[fieldName] || value[dependentFieldName]) {
                        return Promise.resolve();
                    }

                    if (!value[dependentFieldName] && !value[fieldName]) {
                        return Promise.reject(params.message);
                    }

                    return Promise.reject(params.message);
                },
                params: {
                    message: 'Email is required'
                }
            }
        }
    },
    phone: {
        name: 'phone',
        validator: ({dependentFieldName, fieldName}) => {
            return {
                validator: (value, params) => {
                    if (value[fieldName] || value[dependentFieldName]) {
                        return Promise.resolve();
                    }

                    if (!value[dependentFieldName] && !value[fieldName]) {
                        return Promise.reject(params.message);
                    }

                    return Promise.reject(params.message);
                },
                params: {
                    message: 'Phone is required'
                }
            }
        }
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

    setField (name, e) {
        var state = this.state;

        this.setState({fields: {
            email: name === 'email' ? e.target.value : this.state.fields.email,
            phone: name === 'phone' ? e.target.value : this.state.fields.phone
        }});
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
                        validators={[requiredFields[field].validator({
                            dependentFieldName: field === 'email' ? 'phone' : 'email',
                            fieldName: field
                        })]}
                        initialValidation={true}>
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
