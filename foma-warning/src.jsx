import React from 'react';
import Valya from 'valya';
import Foma from 'foma';
import FomaWarning from 'foma-warning';

const { Component } = React;
const requiredFields = {
    value: 'value for form',
    username: 'username'
};

@Valya
class Validator extends Component {
    static displayName = 'Validator';

    _renderError() {
        if (!this.props.enabled || this.props.isValid) {
            return null;
        }

        return (
            <span className="validator__error" key="error">
                {this.props.validationErrorMessage}
            </span>
        );
    }

    render () {

        return (
            <span className="validator">
                <span className="validator__target" key="target">
                    {this.props.children}
                </span>
                {this._renderError()}
            </span>
        );
    }
}

@Foma
class FomaWarningValya extends Component {
    static displayName = 'FomaWarningValya';

    constructor (props) {
        super(props);

        this.state = {
            value: null,
            username: null
        };
    }

    setField (name, e) {
        this.setState({[name]: e.target.value});
    }

    onSubmit (e) {
        e.preventDefault();

        if (this.props.isValid) {
            alert('You successfully submited form!');
        }
    }

    render () {
        return (
            <form style={{width: '500px', padding: '50px 0 0 50px'}} noValidate>
                <div>
                    <Validator
                        value={this.state.value}
                        onEnd={(isValid, message) => {
                            this.props.setValidationInfo({
                                isValid,
                                message,
                                name: 'value'
                            });
                        }}
                        validators={[
                            {
                                validator (value, params) {
                                    if (value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(params.message);
                                },
                                params: {
                                    message: 'Value is required'
                                }
                            }
                        ]}
                        initialValidation={true}>
                        <input
                            type="text"
                            id="value"
                            name="value"
                            className="form-control"
                            value={this.state.value}
                            onChange={this.setField.bind(this, 'value')} />
                    </Validator>
                </div>
                <div>
                    <Validator
                        value={this.state.username}
                        onEnd={(isValid, message) => {
                            this.props.setValidationInfo({
                                isValid,
                                message,
                                name: 'username'
                            });
                        }}
                        validators={[
                            {
                                validator (value, params) {
                                    if (value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(params.message);
                                },
                                params: {
                                    message: 'Username is required'
                                }
                            }
                        ]}
                        initialValidation={true}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.setField.bind(this, 'username')} />
                    </Validator>
                </div>
                <FomaWarning
                    items={this.props.invalidFields.map(function (element) {
                        return {
                            fieldName: element,
                            name: requiredFields[element]
                        };
                    })}
                    message="These fields are required:">
                    <button
                        type="submit"
                        onClick={::this.onSubmit}
                        style={this.props.isInvalid ? {opacity: .5} : {}}>
                        Submit
                    </button>
                </FomaWarning>
            </form>
        );
    }
}

React.render(<FomaWarningValya />, document.querySelector('.main'));
