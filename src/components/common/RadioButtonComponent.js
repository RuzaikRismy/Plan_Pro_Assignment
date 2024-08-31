import React, { Component } from 'react';

// sample RadioButtonComponent calling way

/****************** 
<RadioButtonComponent
    radioButtonParentClass=""
    radioId = "gender"
    radioName = "gender"
    radioClass = "gender-class"
    labelClass = "pt-4"
    labelName = "Male"
    radioChecked = { true }
    radioValue = "male"
    radioButtonClickAction = { this.genderClickAction }
/>
******************/

class RadioButtonComponent extends Component{
    constructor(props){
        super(props);
        this.clickRadioButtonAction = this.clickRadioButtonAction.bind(this);
    }
    
    render(){
        return(
            <div className={ this.props.radioButtonParentClass }>
                <input
                    className={ this.props.radioClass }
                    type= "radio"
                    id={ this.props.radioId } 
                    name={ this.props.radioName } 
                    defaultChecked ={ this.props.radioChecked }
                    value={ this.props.radioValue }
                    onChange={ this.clickRadioButtonAction }
                    />
                {/* radio button label section */}
                <label className={ this.props.labelClass }>
                    {this.props.labelName}
                </label>
            </div>
        );
    }

    // click radio button function
    clickRadioButtonAction(event){
        if(this.props.radioButtonClickAction){
            this.props.radioButtonClickAction(event.target.value);
        }
    }

}

export default RadioButtonComponent;