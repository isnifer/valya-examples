import React from 'react';
import ReactDOM from 'react-dom';

class ValyaExamples extends React.Component {
    static displayName = 'ValyaExamples';

    constructor (props) {
        super(props);

        this.state = {
            examples: [
                'original',
                'initialValidation',
                'multipleValidators',
                'externalValidator',
                'async',
                'foma',
                'fomaWarning',
                'birthday',
                'unlimitedGroups',
                'emailPhone'
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

ReactDOM.render(<ValyaExamples />, document.querySelector('.main'));
