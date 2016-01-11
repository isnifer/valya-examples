import React from 'react';
import ReactDOM from 'react-dom';
import Validator from '../defaultValidator';

const data = [
  {
    "name": "Board 1"
    "cells": [
      {
        "cards": [
          {
            "name": "card1"
          }
        ],
        "row": 1,
        "col": 1
      },
      {
        "cards": [
          {
            "name": "card2"
          }
        ],
        "row": 1,
        "col": 2
      },
      {
        "cards": [
          {
            "name": "card3"
          }
        ],
        "row": 1,
        "col": 3
      },
      {
        "cards": [
          {
            "name": "card4"
          }
        ],
        "row": 1,
        "col": 4
      },
      {
        "cards": [
          {
            "name": "card5"
          }
        ],
        "row": 1,
        "col": 5
      },

      {
        "cards": [
          {
            "name": "card21"
          }
        ],
        "row": 2,
        "col": 1
      },
      {
        "cards": [
          {
            "name": "card22"
          }
        ],
        "row": 2,
        "col": 2
      },
      {
        "cards": [
          {
            "name": "card23"
          }
        ],
        "row": 2,
        "col": 3
      },
      {
        "cards": [
          {
            "name": "card24"
          }
        ],
        "row": 2,
        "col": 4
      },
      {
        "cards": [
          {
            "name": "card25"
          }
        ],
        "row": 2,
        "col": 5
      },

    ]
  }
];

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
                <h2>Original Valya Example</h2>
                <label htmlFor="value">Type something, then delete</label>
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

ReactDOM.render(<OriginalValya />, document.querySelector('.main'));
