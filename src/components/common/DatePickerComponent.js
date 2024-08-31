import React, { PureComponent } from 'react';

// sample DatePickerComponent calling way

/**************** 
<DatePickerComponent
    datePickerClass="form-control"
    datePickerId="dob"
    datePickerName="dob"
    datePickerValue={ moment(new Date()).format('YYYY-MM-DD') }
    datePickerMinDate={ moment(new Date()).format('YYYY-MM-DD') }
    datePickerMaxDate={ moment(new Date()).format('YYYY-MM-DD') }
    datePickerChangeAction = { this.onChangeAction }
    datePickerBlurAction={ this.onBlurAction }
    datePickerPlaceholder="DOB"
/>  
*****************/

class DatePickerComponent extends PureComponent{
    constructor(props){
        super(props);
        this.clickFieldHandler=this.clickFieldHandler.bind(this);
        this.onBlurFieldHandler=this.onBlurFieldHandler.bind(this);
        this.state={fieldType: "text"};
    }
    render(){
        return(
            <div key="name_1">
                <input
                    onFocus={ this.clickFieldHandler }
                    placeholder={ this.props.datePickerPlaceholder }
                    type={ this.state.fieldType }
                    className={ this.props.datePickerClass }
                    id={ this.props.datePickerId }
                    name={ this.props.datePickerName }
                    defaultValue={ this.props.datePickerValue }
                    min={ this.props.datePickerMinDate }
                    max={ this.props.datePickerMaxDate }
                    onChange = { this.props.datePickerChangeAction }
                    onBlur={ this.onBlurFieldHandler }
                    disabled={ this.props.datePickerIsDissabled }
                />
            </div>
        );
    }

    clickFieldHandler(event){
        this.setState({ fieldType: "date" });
    }

    onBlurFieldHandler(event){
        if(event.target.value.length === 0){
            this.setState({ fieldType: "input" });
        }
        if(this.props.datePickerBlurAction){
            this.props.datePickerBlurAction(event);
        }
    }

}

export default React.memo(DatePickerComponent);