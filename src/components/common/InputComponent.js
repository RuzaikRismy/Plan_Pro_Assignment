import React, { PureComponent } from 'react';

// sample InputComponent calling way

/**************** 
<InputComponent
    inputClass="form-control"
    inputType="text"
    inputId="name"
    inputName="name"
    inputRef="name"
    inputPlaceholder="Name"
    inputValue = "Kirisanth"
    inputCallback = { this.inputChangeAction }
/> 
*****************/

class InputComponent extends PureComponent{

    render(){
        // console.log(this.props.inputId, this.props.inputValue);
        return(
            <div key="name_1" className={ this.props.parentClass }>
                {
                    <input 
                        className = { this.props.inputClass }
                        type = { this.props.inputType }
                        step= { this.props.inputStep }
                        id = { this.props.inputId }
                        name = { this.props.inputName }
                        ref = { this.props.inputRef }
                        placeholder = { this.props.inputPlaceholder }
                        defaultValue = { this.props.inputValue }
                        value = { this.props.inputDynamicValue }
                        onChange = { this.props.inputCallback }
                        onBlur = { this.props.inputOnBlur }
                        disabled = { this.props.isInputDisabled }
                        readOnly = { this.props.isReadOnly }
                        autoComplete = { this.props.autoComplete }
                        { ...this.props }
                    />
                }
            </div>
        );
    }

}

export default InputComponent;