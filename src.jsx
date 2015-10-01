import React from 'react';

const { Component } = React;

class ValyaExamples extends Component {
    static displayName = 'ValyaExamples';

    constructor (props) {
        super(props);

        this.state = {
            examples: [
                'original', 'initialValidation', 'async', 'foma', 'foma-warning'
            ]
        };
    }

    render () {
        return (
            <ul className="valya-examples">
                {this.state.examples.map(function (example, i) {
                    return (
                        <li key={i}>
                            <a href={example}>{example}</a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

React.render(<ValyaExamples />, document.querySelector('.main'));
