import React, { Component } from "react";
import ButtonComponent from "./ButtonComponent";

/* Sample SubmitButtonComponent calling way
<SubmitButtonComponent
    submitButtonStyle="button-style"
    submitButtonLableName="Submit"
    submitButtonValue="submit"
    submitButtonId="submit-button"
    isSubmitDisabled={false}
    submitButtonClick={this.someAction.bind(this)}
/>
*/

class SubmitButtonComponent extends Component {
    render() {
        return (
            <div>
                <ButtonComponent
                    buttonClass={"btn btn-success " + this.props.submitButtonStyle}
                    buttonLabel={this.props.submitButtonLableName}
                    buttonType="submit"
                    buttonValue={this.props.submitButtonValue}
                    buttonClickAction={this.props.submitButtonClick}
                    buttonId={this.props.submitButtonId}
                    buttonIsDissabled={this.props.isSubmitDisabled}
                />
            </div>
        );
    }
}

export default SubmitButtonComponent;
