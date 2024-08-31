import React, { Component } from 'react';

// sample ButtonComponent calling way
/*****************
<ButtonComponent
    buttonClass="btn btn-primary"
    buttonLabel="Add"
    buttonType="button"
    buttonValue="Submit"
    buttonClickAction={this.buttonClick}
    buttonId="button1"
    buttonIsDissabled={false}
/>
 ******************/
class ButtonComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                type={this.props.buttonType}
                value={this.props.buttonValue}
                id={this.props.buttonId}
                className={this.props.buttonClass}
                onClick={this.props.buttonClickAction}
                disabled={this.props.buttonIsDissabled}
            >
                { this.props.buttonLabel}
            </button>
        );
    }
}

export default ButtonComponent