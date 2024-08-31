import React, { Component } from 'react';

// sample FormComponent calling way

/********************
<FormComponent 
    formId="registrationForm" 
    submitData={ this.getFormData } 
    resetData={ this.resetFormData }
    >
    <div></div>
</FormComponent>

//get data
var dataSet = {};
var formData = new FormData(event.target);
for (var [key, value] of formData.entries()) { 
    event.target[key].type === "checkbox" ? dataSet[key] = event.target[key].checked : dataSet[key] = value;
}

********************/

class FormComponent extends Component{
    constructor(props){
        super(props);
        // bind functions with the class
        this.submitFormAction = this.submitFormAction.bind(this);
        this.resetFormAction = this.resetFormAction.bind(this);
    }

    render(){
        return(
            <form id={ this.props.formId } onSubmit={ this.submitFormAction } onReset={ this.resetFormAction }>
                { this.props.children }
            </form>
        );
    }

    // get data
    submitFormAction(event){
        // to stay in same page
        event.preventDefault();
        if(this.props.submitData){
            this.props.submitData(event);
        }
    }

    // reset data
    resetFormAction(){
        document.getElementById(this.props.formId).reset();
        if(this.props.resetData){
            this.props.resetData();
        }
    }

}

export default FormComponent;