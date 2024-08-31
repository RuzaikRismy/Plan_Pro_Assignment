import React, { Component } from 'react';
// sample CheckBoxComponent calling way

/******************* 
<CheckBoxComponent 
    isChecked={ true }
    checkboxID="addressCheckbox"
    labelName="Copy same Address"
    checkboxClickHandler={ this.clickHandler }
    parentClasses="checkbox-component"
    labelClass=""
/>
********************/


class CheckBoxComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className= {"form-group " + this.props.parentClasses}>
                <div className="form-check form-check-padding">
                    <label className="form-check-label">
                        <input 
                            className={"form-check-input " + this.props.inputClass} 
                            type="checkbox" 
                            id={ this.props.checkboxID }
                            name={ this.props.checkboxName }
                            defaultChecked={ this.props.isChecked  }
                            checked={ this.props.dynamicIsChecked }
                            ref={ this.props.checkboxRef }
                            onChange={ this.props.checkboxClickHandler }
                            disabled={ this.props.checkboxIsDisable }
                        />
                        <span className="form-check-sign"></span>
                        <label className={ this.props.labelClass }>{ this.props.labelName }</label>
                    </label>
                </div>
            </div>
        );
    }

}

export default CheckBoxComponent;