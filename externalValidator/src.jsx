import React from 'react';
import ReactDOM from 'react-dom';
import Validator from '../defaultValidator';
import standardValidator from 'valya-standard-validator';

class OriginalValya extends React.Component {
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
                <h2>Original Valya Example with external validator</h2>
                <Validator
                    value={this.state.value}
                    onStart={() => {
                        console.log('Validation started!');
                    }}
                    onEnd={(isValid, message) => {
                        console.log('Validation end: ', isValid, message);
                    }}
                    validators={[standardValidator({
                        message: 'Custom message warning from external validator. Watch your console'
                    })]}
                    initialValidation={true}>
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

ReactDOM.render(<OriginalValya />, document.querySelector('.main'));
