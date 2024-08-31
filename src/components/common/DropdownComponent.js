import React, { Component } from 'react';

// sample dropdown component calling way
/******************
<DropDownComponent 
    dropDownId="gender"
    dropDownName="gender"
    dropDownParentClass="title" 
    dropDownSelectClass="select"
    dataList={ this.state.dataList } 
    dropDownRef={ genderRef }
    selectedValue={ this.state.selectedValue }
    dropdownCallback = {this.dropdownCallback}
    dropDownIsDisabled = { true }
/> 

********************/

class DropDownComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            value: ""
        };
        this.changeDropdownOpt=this.changeDropdownOpt.bind(this);
    }

    componentDidMount(){
        this.setState({ value: this.props.selectedValue });
   }


    componentDidUpdate(preProps){
        if(preProps.selectedValue !== this.props.selectedValue){
            this.setState({ value: this.props.selectedValue });
        }
    }

    render(){
        return(
            <div className={ this.props.dropDownParentClass }>
                <select 
                    id={ this.props.dropDownId }
                    name={ this.props.dropDownName }
                    className={ this.props.dropDownSelectClass }
                    value={ this.state.value } 
                    ref={ this.props.dropDownRef }
                    onChange={ this.changeDropdownOpt}
                    onBlur={ this.props.dropDownOnBlur }
                    disabled={ this.props.dropDownIsDisabled }
                    >
                    { this.props.dataList.map((item) => {
                        return(
                            <option className={ this.props.dropDownOptionClass } key={ item.id } value={ item.id }>{ item.name }</option>
                        );    
                    }) }
                </select>
            </div>
        );
    }

    changeDropdownOpt(event){
        this.setState({value: event.target.value});
        if(this.props.dropdownCallback){
            this.props.dropdownCallback(event);
        }
    }

}

export default DropDownComponent;