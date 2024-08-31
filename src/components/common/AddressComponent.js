import React, { Component, createRef } from 'react';
import InputComponent from './InputComponent';
import DropDownComponent from './DropdownComponent';

// sample AddressComponent calling way
/****************** 
<AddressComponent
    addressKey="per"
    parentClass="mt-5"
    line1Class="mt-3"      
    line2Class="mt-3"      
    cityClass="mt-3"
    stateClass="mt-3"
    zipCodeClass="mt-3"
    countryClass="mt-3"
    subComponentClass="mt-3"
    addresscountryData=this.state.countryDataList  
/>
*******************/

class AddressComponent extends Component{

    render(){
        return(
            <div className={ this.props.parentClass }>
                <div className={ this.props.line1Class }>
                    { this.props.addressIsLabel && <label>Address Line1</label> }
                    <InputComponent
                        inputType="text"
                        isEditMode={ true }
                        inputValue={ this.props.addressFieldDetail && this.props.addressFieldDetail.addLine1 ? this.props.addressFieldDetail.addLine1.value : "" }
                        // isInputDisabled={ this.props.addressFieldDetail && this.props.addressFieldDetail.addLine1 ? this.props.addressFieldDetail.addLine1.isDisable : false }
                        inputClass="form-control"
                        inputRef={ this.props.addressRefSet ? this.props.addressRefSet.addLine1 : null }
                        inputId={ this.props.addressKey + "addLine1" }  
                        inputName={ this.props.addressKey + "addLine1" }  
                        inputPlaceholder="Address Line 1"
                        isInputDisabled={this.props.addressIsLabel}
                    /> 
                </div>

                <div className={ this.props.line2Class + " " + this.props.subComponentClass }>
                    { this.props.addressIsLabel && <label>Address Line2</label>  }
                    <InputComponent
                        inputType="text"
                        isEditMode={ true }
                        inputValue={ this.props.addressFieldDetail && this.props.addressFieldDetail.addLine2 ? this.props.addressFieldDetail.addLine2.value : "" }
                        // isInputDisabled={ this.props.addressFieldDetail && this.props.addressFieldDetail.addLine2 ? this.props.addressFieldDetail.addLine2.isDisable : false }
                        inputClass="form-control"
                        inputRef={ this.props.addressRefSet ? this.props.addressRefSet.addLine2 : null }
                        inputId={ this.props.addressKey + "addLine2" }
                        inputName={ this.props.addressKey + "addLine2" }
                        inputPlaceholder="Address Line 2"
                        isInputDisabled={this.props.addressIsLabel}
                    /> 
                </div>

                <div className={ this.props.cityClass + " " + this.props.subComponentClass }>
                    { this.props.addressIsLabel && <label>City</label> }
                    <DropDownComponent 
                        dropDownId={ this.props.addressKey + "city" }
                        dropDownName={ this.props.addressKey + "city" }
                        dropDownParentClass="city" 
                        dropDownRef={ this.props.addressRefSet ? this.props.addressRefSet.city : null }
                        dropDownSelectClass="custom-select form-control"
                        dataList={ this.props.addressCityData } 
                        // dropdownCallback = {this.dropdownCallback}
                        isEditMode = { true }
                        // dropDownIsDisabled = { this.props.addressFieldDetail && this.props.addressFieldDetail.city ? this.props.addressFieldDetail.city.isDisable : false }
                        selectedValue={ this.props.addressFieldDetail && this.props.addressFieldDetail.city ? this.props.addressFieldDetail.city.value : "" }
                        dropDownIsDisabled = {this.props.addressIsLabel}
                    />
                </div>

                <div className={ this.props.stateClass + " " + this.props.subComponentClass }>
                    { this.props.addressIsLabel &&  <label>State</label>  }                    
                    <DropDownComponent 
                            dropDownId={ this.props.addressKey + "provincial" }
                            dropDownName={ this.props.addressKey + "provincial" }
                            dropDownParentClass="provincial" 
                            dropDownRef={ this.props.addressRefSet ? this.props.addressRefSet.state : null }
                            dropDownSelectClass="custom-select form-control"
                            dataList={ this.props.addressStateData } 
                            // dropdownCallback = {this.dropdownCallback}
                            isEditMode = { true }
                            // dropDownIsDisabled = { this.props.addressFieldDetail && this.props.addressFieldDetail.provincial ? this.props.addressFieldDetail.provincial.isDisable : false }
                            selectedValue={ this.props.addressFieldDetail && this.props.addressFieldDetail.provincial ? this.props.addressFieldDetail.provincial.value : "" }
                            dropDownIsDisabled = {this.props.addressIsLabel}
                        />
                </div>

                <div className={ this.props.zipCodeClass + " " + this.props.subComponentClass }>
                    { this.props.addressIsLabel && <label>Postal Code</label>  }
                    <InputComponent
                        inputType="number"
                        isEditMode={ true }
                        inputValue={ this.props.addressFieldDetail && this.props.addressFieldDetail.postalCode ? this.props.addressFieldDetail.postalCode.value : "" }
                        // isInputDisabled={ this.props.addressFieldDetail && this.props.addressFieldDetail.postalCode ? this.props.addressFieldDetail.postalCode.isDisable : false }
                        inputClass="form-control"
                        inputRef={ this.props.addressRefSet ? this.props.addressRefSet.postalCode : null }
                        inputId={ this.props.addressKey + "postalCode" }
                        inputName={ this.props.addressKey + "postalCode" }
                        inputPlaceholder="Zip/ Postal Code"
                        isInputDisabled={this.props.addressIsLabel}
                    /> 
                </div>

                <div className={ this.props.countryClass + " " + this.props.subComponentClass }>
                    { this.props.addressIsLabel && <label>Country</label>   }              
                    <DropDownComponent 
                        dropDownId={ this.props.addressKey + "country" }
                        dropDownName={ this.props.addressKey + "country" }
                        dropDownParentClass="country" 
                        dropDownRef={ this.props.addressRefSet ? this.props.addressRefSet.country : null }
                        dropDownSelectClass="custom-select form-control"
                        dataList={ this.props.addresscountryData } 
                        // dropdownCallback = {this.dropdownCallback}
                        isEditMode = { true }
                        // dropDownIsDisabled = { this.props.addressFieldDetail && this.props.addressFieldDetail.postalCode ? this.props.addressFieldDetail.country.isDisable : false }
                        selectedValue={ this.props.addressFieldDetail && this.props.addressFieldDetail.postalCode ? this.props.addressFieldDetail.country.value: "" }
                        dropDownIsDisabled = {this.props.addressIsLabel}
                  /> 
                    
                </div>
            </div>
       
       );
    }

}

export default AddressComponent;