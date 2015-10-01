import React from 'react';
import Valya from 'valya';
import Foma from 'foma';

const { Component } = React;

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
class FomaLovesValya extends Component {
    static displayName = 'FomaLovesValya';

    constructor (props) {
        super(props);

        this.state = {
            value: null
        };
    }

    setValue (e) {
        this.setState({value: e.target.value});
    }

    onSubmit () {
        alert('You successfully submited form!');
    }

    render () {
        return (
            <form style={{width: '500px', padding: '50px 0 0 50px'}} noValidate>
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
                                message: 'Field is required'
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
                        onChange={::this.setValue} />
                </Validator>
                <div>
                    <button
                        type="submit"
                        onClick={::this.onSubmit}
                        disabled={this.props.isInvalid}>
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

React.render(<FomaLovesValya />, document.querySelector('.main'));
