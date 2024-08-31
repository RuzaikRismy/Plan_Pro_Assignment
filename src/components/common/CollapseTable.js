import React, { Component } from 'react';

class CollapseTable extends Component {
    constructor(props){
        super(props);
        this.state={};
        this.rowClickAction=this.rowClickAction.bind(this);
        this.getTemplate=this.getTemplate.bind(this);
    }
    
    render() {
        return (
            <div className="table-class">
                <table className="table" width="100%" cellPadding="8" id="commonTable">
                    <thead className="table-head">
                        <tr>
                            {
                                this.props.MainRowcolumns.map((column, columnIndex) => {
                                    return (<th key={columnIndex} className={column.columnClass} width={column.width}>{column.name}</th>);
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.tableContent.map((singleRow, singleRowIndex)=>{
                            return(
                                <React.Fragment key={ singleRowIndex }>
                                    <tr key={ singleRowIndex } onClick={ this.rowClickAction }>
                                        <td key={ this.props.mainRowInitialColumn }> 
                                            <i id={ singleRow[this.props.mainRowInitialColumn] } className={ "mr-3 collapse-icon fa fa-angle-" + (this.state[singleRow[this.props.mainRowInitialColumn]] ? "down" : "right")}></i>
                                            { singleRow[this.props.mainRowInitialColumn] }
                                        </td>
                                        {
                                            this.props.MainRowcolumns.map((column, columnIndex) => {
                                                if(this.props.mainRowInitialColumn !== column.id){
                                                    return (
                                                        <td key= {columnIndex } className={ column.contentClass }>
                                                            {column.template ? this.getTemplate(column.template, singleRow, [column.id]) : singleRow[column.id] }
                                                        </td>
                                                    );
                                                }
                                            })
                                        }
                                    </tr>
                                    {  
                                        this.state[singleRow[this.props.mainRowInitialColumn]] &&
                                        singleRow[this.props.childRowSectionName].map((singleChildRow, singleChildRowIndex)=>{
                                            return(
                                                <tr key={ singleChildRowIndex }>
                                                    <td key={ this.props.childRowInitialColumn } className="pl-5">
                                                        { singleChildRow[this.props.childRowInitialColumn] }
                                                    </td>
                                                    {
                                                        this.props.childRowColumns.map((column) => {
                                                            if(this.props.childRowInitialColumn !== column.id){
                                                                return (
                                                                    <td key={ column.id } className={ column.contentClass }>
                                                                        { column.template ? this.getTemplate(column.template, singleChildRow, [column.id]) : singleChildRow[column.id] }
                                                                    </td>
                                                                );
                                                            }
                                                        })
                                                    }
                                                </tr>
                                            );
                                        })
                                    }
                                    
                                </React.Fragment>
                            );
                        }) }
                        
                    </tbody>
                </table>
            </div>
        );
    }

    rowClickAction(event){
        const clickedId=event.target.id;
        if(clickedId){
            this.setState({ [clickedId]: !this.state[clickedId] });
        }
    }

    getTemplate(columnTemplate, data, columnId){
        if (columnTemplate.type === "clickableIconBlock") {
            return (
                <label className="collapse-icons-label" >
                    {
                        columnTemplate.icons.map((icon, iconIndex) => {
                            return (
                                <img key={ iconIndex } className={ icon.name + " mr-2" } id={icon.id + data[this.props.uniqueField].toString()} onClick={this.props.onClickAction} src={require("../../assets/images/icons/" + icon.fileName)} alt={icon.name} />
                            );
                        })
                    }
                </label>
            );
        }

    }

}

export default CollapseTable;