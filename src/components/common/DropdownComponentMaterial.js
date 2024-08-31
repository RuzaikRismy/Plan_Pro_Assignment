import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

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

class DropDownComponentMaterial extends Component{
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
                    <TextField
                        required={this.props.isRequired}
                        name={ this.props.dropDownName}
                        error= {this.props.isError}
                        helperText={this.props.helperText}
                        id={ this.props.dropDownId }
                        select
                        value={ this.state.value } 
                        onChange={ this.changeDropdownOpt}
                        SelectProps={{
                            native: true,
                        }}
                        disabled={this.props.disabled}
                        variant={this.props.dropDownvariant}
                        placeholder={this.props.placeholder}
                        className={ this.props.dropDownClass }
                        size={this.props.dropDownSize}
                        label={this.props.dropDownLabel}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" className={this.props.startLabelClass}>
                                {this.props.isIcon && this.props.dropdownIcon}
                                {this.props.startLabel}
                              </InputAdornment>

                            ),
                        }}
                        {...this.props}

                    >
                        {this.props.dataList.map((item) => (
                            <option className={ this.props.dropDownOptionClass } key={ item.id } value={ item.id }>{ item.name }</option>
                        ))}
                    </TextField>
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

export default DropDownComponentMaterial;