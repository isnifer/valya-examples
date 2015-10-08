import React from 'react';
import ReactDOM from 'react-dom';
import Validator from '../defaultValidator';

const asyncValidator = {
    validator (value, params) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                if (parseInt(value) + 3 === 45) {
                    resolve();
                }

                reject(params.message);
            }, 1000);
        });
    },
    params: {
        message: 'Field should be equal 42'
    }
};

class AsyncValya extends React.Component {
    static displayName = 'AsyncValya';

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
                <h2>Async Valya Example</h2>
                <Validator
                    value={this.state.value}
                    onStart={() => {
                        console.log('Validation started!');
                    }}
                    onEnd={(isValid, message) => {
                        console.log('Validation end: ', isValid, message);
                    }}
                    validators={[asyncValidator]}>
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

ReactDOM.render(<AsyncValya />, document.querySelector('.main'));
