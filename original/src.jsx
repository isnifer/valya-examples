import React from 'react';
import Valya from 'valya';

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

class OriginalValya extends Component {
    static displayName = 'OriginalValya';

    constructor (props) {
        super(props);

        this.state = {
            value: null
        };
    }

    setValue (e) {
        this.setState({value: e.target.value});
    }

    render () {
        return (
            <form style={{width: '500px', padding: '50px 0 0 50px'}} noValidate>
                <Validator
                    value={this.state.value}
                    onStart={() => {
                        console.log('Validation started!');
                    }}
                    onEnd={(isValid, message) => {
                        console.log('Validation end: ', isValid, message);
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
                    ]}>
                    <input
                        type="text"
                        id="value"
                        name="value"
                        className="form-control"
                        value={this.state.value}
                        onChange={::this.setValue} />
                </Validator>
            </form>
        );
    }
}

React.render(<OriginalValya />, document.querySelector('.main'));
