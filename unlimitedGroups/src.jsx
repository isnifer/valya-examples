import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Validator from '../defaultValidator';
import Foma from 'foma';
import standardValidator from 'valya-standard-validator';
import assign from 'object-assign';

const { Component, PropTypes } = React;

const requiredFields = {
    username: {
        name: 'awesome username'
    },
    password: {
        name: 'awesome password'
    }
};

const groupFields = {
    company: {
        name: 'ex-company'
    },
    state: {
        name: 'state'
    },
    position: {
        name: 'ex-position'
    }
};

let groupValidator = (fieldName) => {
    return {
        validator: (group, params) => {
            if (group[fieldName]) {
                return Promise.resolve();
            }

            return Promise.reject(params.message);
        },
        params: {
            message: fieldName + ' is required!'
        }
    }
};

@Foma
class GroupComponent extends Component {
    static displayName = 'GroupComponent';

    static propTypes = {
        index: PropTypes.number.isRequired,
        group: PropTypes.object.isRequired,
        setGroupField: PropTypes.func.isRequired
    }

    onEndCallback (name) {
        return (isValid, message) => {
            this.props.foma.setValidationInfo({isValid, message, name});
        }
    }

    renderFields (fields) {
        return fields.map((field, i) => {
            return (
                <div className="form-group" key={i}>
                    <Validator
                        value={this.props.group[field]}
                        onEnd={this.onEndCallback(field)}
                        validators={[groupValidator(field)]}>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            placeholder={field}
                            className="form-control"
                            value={this.props.group[field]}
                            onChange={this.props.setGroupField.bind(this, field, this.props.index)} />
                    </Validator>
                </div>
            );
        });
    }

    render () {
        return (<div>{this.renderFields(Object.keys(groupFields))}</div>);
    }
}

@Foma
class UnlimitedGroups extends Component {
    static displayName = 'UnlimitedGroups';

    constructor (props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            groups: [
                {
                    company: null,
                    state: null,
                    position: null
                }
            ]
        };
    }

    setField (name, e) {
        this.setState({[name]: e.target.value});
    }

    setGroupField (name, index, e) {
        let groups = this.state.groups;
        let group = assign({}, groups[index]);

        group[name] = e.target.value;

        groups[index] = group;

        this.setState({groups: groups});
    }

    onSubmit (e) {
        if (this.props.isValid) {
            alert('You are awesome!');
        } else {
            this.props.foma.viewWarning(true);
        }

        return e.preventDefault();
    }

    addGroup () {
        let groups = this.state.groups.concat({
            company: null,
            state: null,
            position: null
        });

        this.setState({groups: groups});
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

                {this.state.groups.map((group, i) => {
                    var props = {
                        group: group,
                        setGroupField: ::this.setGroupField,
                        index: i,
                        key: i
                    };

                    return <GroupComponent {...props} />;
                })}

                <div className="form-group">
                    <button
                        type="button"
                        onClick={::this.addGroup}
                        className="btn btn-info">
                        Add group fields
                    </button>
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

ReactDOM.render(<UnlimitedGroups />, document.querySelector('.main'));
