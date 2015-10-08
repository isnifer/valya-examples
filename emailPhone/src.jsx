import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Validator from '../defaultValidator';
import Foma from 'foma';
import standardValidator from 'valya-standard-validator';

const { Component } = React;

const requiredFields = {
    password: {
        name: 'awesome password'
    },
    username: {
        name: 'awesome username'
    },
    browser: {
        name: 'the best ever browser',
        handler: () => {
            alert('Please, select browser before!');
        }
    }
};

@Foma
class FomaWarningValya extends Component {
    static displayName = 'FomaWarningValya';

    constructor (props) {
        super(props);

        this.state = {
            password: null,
            username: null,
            browser: null
        };
    }

    setField (name, e) {
        this.setState({[name]: e.target.value});
    }

    onSubmit (e) {
        if (this.props.isValid) {
            alert('You are awesome!');
        } else {
            this.props.foma.viewWarning(true);
        }

        return e.preventDefault();
    }

    setBrowser (browser) {
        this.setState({browser: browser});
    }

    render () {
        return (
            <form style={{width: '500px', padding: '50px 0 0 50px'}} noValidate>
                <h2>Original Valya Example with Foma and Foma-warning</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Validator
                        value={this.state.username}
                        onEnd={(isValid, message) => {
                            this.props.foma.setValidationInfo({
                                isValid,
                                message,
                                name: 'username'
                            });
                        }}
                        validators={[standardValidator({message: 'Username is required'})]}
                        initialValidation={true}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.setField.bind(this, 'username')} />
                    </Validator>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Validator
                        value={this.state.password}
                        onEnd={(isValid, message) => {
                            this.props.foma.setValidationInfo({
                                isValid,
                                message,
                                name: 'password'
                            });
                        }}
                        validators={[standardValidator({message: 'Password is required'})]}
                        initialValidation={true}>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            placeholder="password"
                            className="form-control"
                            value={this.state.value}
                            onChange={this.setField.bind(this, 'password')} />
                    </Validator>
                </div>
                <div className="form-group">
                    <label>Set your browser</label>
                    <div>
                        <Validator
                            value={this.state.browser}
                            onEnd={(isValid, message) => {
                                this.props.foma.setValidationInfo({
                                    isValid,
                                    message,
                                    name: 'browser'
                                });
                            }}
                            validators={[standardValidator({message: 'Set your browser'})]}
                            initialValidation={true}>
                            {['chrome', 'firefox', 'opera', 'safari'].map((browser) => {
                                return (
                                    <div
                                        className={cn(browser, {'selected-browser': this.state.browser === browser})}
                                        onClick={this.setBrowser.bind(this, browser)}
                                        key={browser}>
                                        {browser}
                                    </div>
                                );
                            })}
                        </Validator>
                    </div>
                </div>
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

ReactDOM.render(<FomaWarningValya />, document.querySelector('.main'));
