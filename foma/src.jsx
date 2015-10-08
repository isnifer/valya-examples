import React from 'react';
import ReactDOM from 'react-dom';
import Validator from '../defaultValidator';
import Foma from 'foma';

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

ReactDOM.render(<FomaLovesValya />, document.querySelector('.main'));
