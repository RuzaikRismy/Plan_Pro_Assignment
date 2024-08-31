import React, { Component } from "react";
import SubmitButtonComponent from "../SubmitButtonComponent";
import { Link } from "react-router-dom";
import "../commonStyle.css";

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.spanClick = this.spanClick.bind(this);
    }
    render() {
        return (
        <div>
            {/* <!-- The Modal --> */}
            <div id={this.props.modalId} className="modal">
            {/* <!-- Modal content --> */}
            <div className="modal-content">
                <span className="close" onClick={this.spanClick}>
                    &times;
                </span>
                <br />
                <p>{this.props.modalContent}</p>
                <Link to="/">
                <SubmitButtonComponent
                    submitButtonStyle="button-style modal-button-Style"
                    submitButtonLableName="Ok"
                    submitButtonValue="submit"
                    submitButtonId="submit-button"
                    isSubmitDisabled={false}
                    submitButtonClick={this.spanClick}
                />
                </Link>
            </div>
            </div>
        </div>
        );
    }

    spanClick(e) {
        document.getElementById(this.props.modalId).style.display = "none";
    }
}

export default ModalComponent;