import React from 'react';
import ReactDOM from 'react-dom';
import Validator from '../defaultValidator';

class MultipleValidators extends React.Component {
    static displayName = 'MultipleValidators';

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
                        },
                        {
                            validator (value, params) {
                                if (parseInt(value) > 10) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(params.message);
                            },
                            params: {
                                message: 'This field must be Integer and bigger than 10'
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

ReactDOM.render(<MultipleValidators />, document.querySelector('.main'));
