import React from 'react';
import ReactDOM from 'react-dom';
import Validator from '../defaultValidator';
import Foma from 'foma';
import standardValidator from 'valya-standard-validator';

@Foma
class FomaLovesValya extends React.Component {
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

    onSubmit (e) {
        e.preventDefault();
        alert('You successfully submited form!');
    }

    render () {
        return (
            <form style={{width: '500px', padding: '50px 0 0 50px'}} noValidate>
                <h2>Original Valya Example with Foma</h2>
                <div className="form-group">
                    <Validator
                        value={this.state.value}
                        onEnd={(isValid, message) => {
                            this.props.foma.setValidationInfo({
                                isValid,
                                message,
                                name: 'value'
                            });
                        }}
                        validators={[standardValidator()]}
                        initialValidation={true}>
                        <input
                            type="text"
                            id="value"
                            name="value"
                            className="form-control"
                            value={this.state.value}
                            onChange={::this.setValue} />
                    </Validator>
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        onClick={::this.onSubmit}
                        className="btn btn-success"
                        disabled={this.props.isInvalid}>
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

ReactDOM.render(<FomaLovesValya />, document.querySelector('.main'));
