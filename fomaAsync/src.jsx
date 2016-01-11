import React from 'react';
import ReactDOM from 'react-dom';
import Validator from '../defaultValidator';
import Foma from 'foma';

function asyncValidator (fieldName) {
    return {
        validator: (value, params) => {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (value) {
                        resolve();
                    }

                    reject(params.message);
                }, 4000);
            });
        },
        params: {
            message: `${fieldName} is required`
        }
    }
}

@Foma
class FomaAsync extends React.Component {
    static displayName = 'FomaAsync';

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

    onEndCallback (name) {
        return (isValid, message) => {
            console.log(isValid, message)
            this.props.foma.setValidationInfo({isValid, message, name});
        }
    }

    render () {
        return (
            <form style={{width: '500px', padding: '50px 0 0 50px'}} noValidate>
                <h2>Original Valya Example with Foma</h2>
                <div className="form-group">
                    <Validator
                        value={this.state.value}
                        onStart={this.onEndCallback('value')}
                        onEnd={this.onEndCallback('value')}
                        validators={[asyncValidator('value')]}
                        silentInitValidation={true}>
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

ReactDOM.render(<FomaAsync />, document.querySelector('.main'));
