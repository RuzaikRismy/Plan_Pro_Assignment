import React, { Component } from "react";
import ButtonComponent from "./ButtonComponent";

/*
<CancelButtonComponent
    CancelbuttonStyle="button-style"
    submitButtonLableName="Cancel"
    submitButtonValue="cancel"
    submitButtonId="cancel-button"
    isCanceledDisabled={false}
    cancelButtonClick={this.someAction.bind(this)}
/>
*/

class CancelButtonComponent extends Component {
    render() {
        return (
            <div>
                <ButtonComponent
                buttonClass={ "btn btn-outline-success " + this.props.CancelbuttonStyle }
                buttonLabel={ this.props.submitButtonLableName }
                buttonType="reset"
                buttonValue={ this.props.submitButtonValue}
                buttonClickAction={ this.props.cancelButtonClick }
                buttonId={ this.props.submitButtonId }
                buttonIsDissabled={ this.props.isCanceledDisabled }
                />
            </div>
        );
    }
}

export default CancelButtonComponent;
