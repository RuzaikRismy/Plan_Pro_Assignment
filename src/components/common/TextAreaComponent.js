import React, { Component } from 'react';

// sample component calling way

/********** 
<TextAreaComponent
    IsEditMode={ true }
    textAreaClass="form-control"
    parentClass = ""
    textAreaId="alergy"
    textRows="5"
    textAreaCols="20"
    textAreaName="alergy"
    textAreaPlaceholder="alergy"
    textAreaValue = "Wood apple"
    textAreaCallback = { this.textAreaChangeAction }
    labelClass = "label"
/> 
************/

class TextAreaComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={ this.props.parentClass }>
                { 
                    this.props.IsEditMode ?
                    <textarea 
                        className={ this.props.textAreaClass }
                        id={ this.props.textAreaId }
                        cols= {this.props.textCols}
                        rows= {this.props.textRows}
                        name={ this.props.textAreaName }
                        placeholder={ this.props.textAreaPlaceholder }
                        defaultValue={ this.props.textAreaValue }
                        onChange = { this.props.textAreaCallback }
                        onBlur={ this.props.TextAreaOnBlur }
                        disabled={ this.props.TextAreaIsDisabled }
                    />
                    :
                    <label className={ this.props.labelClass }>{ this.props.textAreaValue }</label>
                }
            </div>
        );

    }
    
}

export default TextAreaComponent;