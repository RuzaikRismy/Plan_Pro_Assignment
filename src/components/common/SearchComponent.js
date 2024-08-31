import React, { Component } from 'react';
import { filterRowAction } from '../../utils/Filter';
import "./commonStyle.css";

/** Calling Method
 * 
<SearchComponent
    searchDropDownClass="search-component row"
    searchValue={this.state.searchValueString}
    searchDataList={personData}
    selectedData={this.save}
    searchColumns={["name"]}
    suggestionType="twoRows"
    suggestionFirstRow={suggestionFirstRow}
    suggestionSecondRow={suggestionSecondRow}
    image={image}
    suggestionImage="leftImage"
    firstRowStyle="suggestion-first"
    SecondRowStyle="suggestion-second"
                                                        
 />

const suggestionFirstRow = [
    { id:"1" , attributeVal:"name", attributeStyle:"suggestion-attribute col-lg", label:"", labelStyle:"" },
    { id:"2" , attributeVal:"route", attributeStyle:"suggestion-attribute col-lg", label:"", labelStyle:"" },
    { id:"3" , attributeVal:"strength", attributeStyle:"suggestion-attribute col-lg", label:"", labelStyle:"" }
]

const suggestionSecondRow = [
    { id:"1" , attributeVal:"name", attributeStyle:"suggestion-attribute col-lg", label:"", labelStyle:"" },
    { id:"2" , attributeVal:"route", attributeStyle:"suggestion-attribute col-lg", label:"", labelStyle:"" },
    { id:"3" , attributeVal:"strength", attributeStyle:"suggestion-attribute col-lg", label:"", labelStyle:"" }
]

const image={src:"Group 600@2x.png", alt:"imageAlt"}
 */

const filters = {
    filterTerm: "",
    filterColumns: [],
    filterLogic: "or",
};

class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.valueClick=this.valueClick.bind(this);
    }

    componentDidUpdate(preProps, preState) {
        filters.filterTerm = this.props.searchValue;
        filters.filterColumns=this.props.searchColumns;
        let searchData = this.props.searchDataList;
        let { data } = this.state;

        if (filters.filterTerm.length >= 3) {
            const data = filterRowAction(searchData, filters);
                if (preState.data === this.state.data) {
                    this.setState({ data })
                }
        }

        else if (filters.filterTerm.length <= 2) {
            while (data.length > 0) {
                data.pop()
            }
        }
    }



    render(){
        return(
            <div className="suggestion-parent">
                 {this.state.data.map((item, index) => { 
                     return (     
                        <div className="search-suggestion" key={item.id} >
                            <div className={this.props.searchDropDownClass} onClick={this.valueClick} id={item.id}>
                                {this.props.suggestionType==="oneRow" ?  
                                       this.props.suggestionFirstRow.map((attribute, index) =>
                                            <div key={attribute.id} className="sigle-search-element" > 
                                                <div className={attribute.labelStyle}>
                                                    { attribute.label }
                                                </div>
                                                <div className={attribute.attributeStyle}>
                                                    { item[attribute.attributeVal] } 
                                                </div>  
                                            </div>
                                        )
                                :
                                    <div className="two-rows-container" >
                                        {
                                            this.props.suggestionImage==="leftImage" &&
                                            <img src= { require("../../assets/images/" + this.props.image.src ) } alt={this.props.image.alt} className="float-left-searchimage"/>
                                        }

                                       
                                        <div className={"row ml-1 mr-1 " + this.props.firstRowStyle} id={item.id}>
                                            {this.props.suggestionFirstRow.map((attribute, index) =>
                                                <div key={attribute.id} className="sigle-search-element">
                                                    <span className={attribute.labelStyle}>
                                                    {attribute.label}
                                                    </span>
                                                    <span className={attribute.attributeStyle}>
                                                    {item[attribute.attributeVal]} 
                                                    </span>  
                                                </div>
                                            )}
                                        </div>
                                                
                                        <div className={"row ml-1 mr-1 " + this.props.SecondRowStyle} id={item.id}>
                                            {this.props.suggestionSecondRow.map((attribute, index) =>
                                                <div key={attribute.id} className="sigle-search-element">
                                                    <span className={attribute.labelStyle}>
                                                    {attribute.label}
                                                    </span>
                                                    <span className={attribute.attributeStyle}>
                                                    {item[attribute.attributeVal]} 
                                                    </span>  
                                                </div>
                                            )}
                                        </div>
                                        
                                        
                                        {
                                            this.props.suggestionImage==="rightImage" &&
                                            <img src= { require("../../assets/images/" + this.props.image.src ) } alt={this.props.image.alt}  className="float-right-searchimage"/>
                                        }
                                    </div>
                                 }
                            </div>
                        </div>      
                                );  
                            })}
                            
            </div>
                 
                   

              
        );
    }

    valueClick(e) {
        console.log(e.target.id);
        let id = e.target.id;
        let filteredData = this.state.data;
        
        filteredData.map((item) => {
            if(item.id.toString()===id){
                this.props.selectedData(item)
            }
        })
        this.setState({ data: [] })
    }
}

export default SearchComponent;

