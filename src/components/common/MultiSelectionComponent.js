import React, { Component } from 'react';
import CheckBoxComponent from './CheckboxComponent';
import { filterRowAction } from '../../../src/utils/Filter';
import ButtonComponent from './ButtonComponent';

class MultiSelectionComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            searchedData: [],
            selectedData: this.props.initialSelectedData,
            selectedDataIdList: [],
            displayData: [],
            filterTerm: this.props.filter.filterTerm,
            isShowSelected: false
        }
        this.checkboxUnCheckAction=this.checkboxUnCheckAction.bind(this);
        this.checkboxCheckAction=this.checkboxCheckAction.bind(this);
        this.showSelectedAction=this.showSelectedAction.bind(this);
        this.optionsClearSelectionAction=this.optionsClearSelectionAction.bind(this);
        this.finalizeSelectionAction=this.finalizeSelectionAction.bind(this);
        this.setData=this.setData.bind(this);
    }

    componentDidMount(){
        this.setData();
    }

    componentDidUpdate(preProps, prestate){
        if(this.props.filter.filterTerm !== prestate.filterTerm){
            this.setData();
        }
    }

    render() {
        return (
            <div className="multi-selection-block mt-3">
                <div className="row">
                    <div className="col-lg-6">
                        <CheckBoxComponent 
                            isChecked={ false }
                            checkboxID="showSelected"
                            labelName="Show Selected"
                            checkboxClickHandler={ this.showSelectedAction }
                            parentClasses="checkbox-component"
                        />
                    </div>
                </div>
                <div className="row multiSelection-row-class">
                { 
                    (this.state.displayData.length > 0  || this.state.selectedData.length > 0)
                    &&
                    <div className="col-lg-12 mt-2 multi-option-table">
                        <table>
                            <thead className="multi-option-table-head">
                                <tr>
                                    <th className="checkbox"></th>
                                    {   
                                        this.props.columnDetail.map(function(column, columnIndex){
                                            return(<th className={column.id} key={ column.id }>{ column.name }</th>);
                                        }) 
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    this.state.selectedData.map((data, index)=>{
                                        return(
                                            <tr key={ data[this.props.idName] }>
                                                <td>
                                                    <CheckBoxComponent 
                                                        isChecked={ true }
                                                        checkboxID={ data[this.props.idName] }
                                                        checkboxClickHandler={ this.checkboxUnCheckAction }
                                                        parentClasses="checkbox-component"
                                                    />
                                                </td>
                                                {
                                                    this.props.columnDetail.map(function(column, columnIndex){
                                                        return(<td className="text-left" key={ index.toString() + columnIndex.toString() }>{ data[column.id] }</td>);
                                                    })
                                                }
                                            </tr>
                                        )
                                        
                                    }) 
                                }
                                {   
                                    !this.state.isShowSelected &&
                                    this.state.displayData.map((data, index)=>{
                                        return(
                                            !data.isChecked &&
                                            <tr key={ index }>
                                                <td>
                                                    <CheckBoxComponent 
                                                        isChecked={ false }
                                                        checkboxID={ data[this.props.idName] }
                                                        checkboxClickHandler={ this.checkboxCheckAction }
                                                        parentClasses="checkbox-component"
                                                    />
                                                </td>
                                                {
                                                    this.props.columnDetail.map(function(column, columnIndex){
                                                        return(<td key={ index.toString() + columnIndex.toString() }>{ data[column.id] }</td>);
                                                    })
                                                }
                                            </tr>
                                        )
                                        
                                    }) 
                                }
                            </tbody>
                        </table>
                    </div>
                }
                </div>
                <div className="mt-3 multiselect-button-block">
                    <div className="clear-block text-left" onClick={ this.optionsClearSelectionAction }>Clear</div>
                    <div>
                        <div className="cancel-btn-class">
                            <ButtonComponent
                                buttonClass="btn btn-danger"
                                buttonLabel="Cancel"
                                buttonType="button"
                                buttonValue="reset"
                                buttonClickAction={ this.finalizeSelectionAction }
                                buttonId="cancel"
                            />
                        </div>
                        <div className="save-btn-class">
                            <ButtonComponent
                                buttonClass="btn btn-primary"
                                buttonLabel="OK"
                                buttonType="submit"
                                buttonValue="save"
                                buttonClickAction={ this.finalizeSelectionAction }
                                buttonId="save"
                            />
                        </div>
                    </div>
                </div>    

            </div>
        );
    }
    
    setData(){
        const filteredData=filterRowAction(this.props.optionData, this.props.filter);
        filteredData.map((filterData)=>{
            filterData["isChecked"]=false;
            this.state.selectedData.map((data)=>{
                if(filterData[this.props.idName] === data[this.props.idName]){
                    filterData["isChecked"]=true;
                }
            });
        });
        
        this.setState({ 
            searchedData: filteredData, 
            // displayData: filteredData.slice(0, 5),
            displayData: filteredData,
            filterTerm: this.props.filter.filterTerm 
        });
    }

    showSelectedAction(event){
        this.setState({ isShowSelected: event.target.checked });
    }

    checkboxUnCheckAction(event){
        const { selectedData, displayData }=this.state;

        this.state.selectedData.map((data) => {
            if(data[this.props.idName].toString() === event.target.id){
                selectedData.splice(selectedData.indexOf(data),1);
            }
        });

        this.state.displayData.map((data) => {
            if(data[this.props.idName].toString() === event.target.id){
                displayData[displayData.indexOf(data)]["isChecked"]=false;
            }
        });
        this.setState({ selectedData, displayData });
    }

    checkboxCheckAction(event){
        const { selectedData, displayData }=this.state;
        displayData.map((data)=>{
            if(data[this.props.idName].toString() === event.target.id){
                displayData[displayData.indexOf(data)]["isChecked"]=true;
                selectedData.push(displayData[displayData.indexOf(data)]);
            }
        })
        this.setState({ selectedData, displayData });
    }

    optionsClearSelectionAction(){
        var { selectedData, displayData }=this.state;
        selectedData=[];
        displayData.map((data)=>{
            data.isChecked=false;
        })
        this.setState({ selectedData, displayData });
    }

    finalizeSelectionAction(event){
        if(this.props.finalizeSelection){
            this.props.finalizeSelection({
                type: event.target.id,
                data: this.state.selectedData
            });
        }
    }

}

export default MultiSelectionComponent;