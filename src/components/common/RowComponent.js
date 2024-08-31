// import React, { PureComponent } from 'react';
// import ToggleSwitchComponent from './ToggleSwitchComponent';
// import InputComponent from '../common/InputComponent';
// import { Link } from 'react-router-dom';

// class RowComponent extends PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             readeOny: true,
//         }
//     }

//     render() {
//         return (
//             <tr key={this.props.tableRowIndex}>
//                 {
//                     this.props.columns.map((cell, cellIndex) => {
//                         return (
//                             <td className={cell.contentClass} key={cellIndex}>
//                                 {cell.template ? this.getTemplate(cell.template, this.props.rowData, [cell.id], this.props.rowDataIndex) : this.props.rowData[cell.id]}
//                             </td>
//                         );
//                     })
//                 }
//             </tr>
//         );
//     }

//     getTemplate(templateData, row, columnId, index) {
//         if (templateData.type === "toggleSwitch") {
//             return (
//                 <ToggleSwitchComponent
//                     value={row[columnId]}
//                     switchClass="switch"
//                     toggleSwitchId={row[this.props.uniqueField]}
//                     toggleSwitchName={row[this.props.uniqueField]}
//                     toggleInputClass="form-control"
//                     toggleElementIndex={index}
//                     toggleSliderRoundClass="slider round"
//                     toggleSwitchCallback={this.toggleSwitchChangeAction.bind(this)}
//                 />
//             );
//         } else if (templateData.type === "AnchorTag") {
//             return (
//                 <Link to={templateData.redirectLink + row[templateData.redirectId]}>{row[columnId]}</Link>
//             );
//         } else if (templateData.type === "clickableIconBlock") {
//             return (
//                 <label >
//                     {
//                         templateData.icons.map((icon) => {
//                             return(
//                                 <img className={"pr-2 " + icon.name} id={icon.id + "_" + row[this.props.uniqueField].toString()}
//                                     onClick={ this.props.onClickAction } 
//                                     src={ require("../../assets/images/icons/" + icon.fileName) } 
//                                     alt={ icon.name }
//                                     data-toggle={ icon.isToolTip ? "tooltip" : '' } 
//                                     data-placement={ icon.toolTipPosition } 
//                                     title={ icon.isToolTip ? icon.name : null }
//                                 />
//                             );
//                         })
//                     }
//                 </label>
//             );
//         } else if (templateData.type === "clickableTextBlock") {
//             return (
//                 <div>
//                     {
//                         templateData.texts.map((text) => {
//                             return(
//                                 <span 
//                                     className={"mr-3 " + text.name} 
//                                     id={text.id + row[this.props.uniqueField].toString()} 
//                                     onClick={this.props.onClickAction}
//                                     >
//                                     { text.fieldName }
//                                 </span>
//                             );
//                         })
//                     }
//                 </div>
//             );
//         }
//         // else if (templateData.type === "iconsAndText") {
//         //     return (
//         //         <label>
//         //             <div className="iconsAndText">{row[columnId]} </div>
//         //             {
//         //                 templateData.iconsAndData.map((icon2) => {
//         //                     return (
//         //                         <img className={"pr-2 " + icon2.name} id={icon2.id + row[this.props.uniqueField].toString()} onClick={this.props.onClickAction} src={require("../../assets/images/icons/" + icon2.fileName)} alt={icon2.name} />
//         //                     );
//         //                 })
//         //             }
//         //         </label>
//         //     )
//         // } 
//         // else if (templateData.type === "doubleLineData") {
//         //     return (
//         //         <div>
//         //             <p className="doubleLineDataTopData">{row[columnId].split(',')[0]}</p>
//         //             <p className="doubleLineDataBottomData">{row[columnId].split(',')[1]}</p>
//         //         </div>
//         //     )
//         // } 
//         // else if (templateData.type === "editDeletePrint") {
//         //     return (
//         //         <div>
//         //             <i className="fa fa-pencil editFunctions" id={row[columnId]} onClick={this.editFunction.bind(this)}  ></i>
//         //             <i className="fa fa-trash ml-2 editFunctions" id={"remove_" + row[this.props.uniqueField].toString()} onClick={this.props.onClickAction}></i>
//         //             <i className="fa fa-print ml-2 editFunctions" onClick={this.props.onClickAction} ></i>
//         //         </div>
//         //     );
//         // } 
//         // else if (templateData.type === "editableField" && !this.state.readeOny) {
//         //     return (
//         //         <div className="editable-filed-class">
//         //             <InputComponent
//         //                 inputClass="form-control "
//         //                 inputType="number"
//         //                 inputId={row[columnId]}
//         //                 inputName={columnId}
//         //                 inputValue={row[columnId]}
//         //                 inputOnBlur={this.rowOnblurAction.bind(this)}
//         //             />
//         //         </div>
//         //     );
//         // }else if (templateData.type === "editableField") {
//         //     return row[columnId];
//         // }
//         // else if (templateData.type === "buttonSet") {
//         //     return (
//         //         <div>
//         //             <button type="button" id={templateData.buttonLabel2 + "_" + row[this.props.uniqueField].toString()} className="btn  row-component-template-button-style" onClick={this.props.onClickAction}>{templateData.buttonLabel2}</button>
//         //         </div>
//         //     );
//         // }
//         // else if (templateData.type === "buttonGroup") {
//         //     return (
//         //         templateData.buttons.map((button) => {
//         //             return(
//         //                 <button type="button" id={button.id + "_" + row[this.props.uniqueField].toString()} className="btn row-component-template-button-style" onClick={ this.props.onClickAction }>{button.label}</button>
//         //             );
//         //         })
//         //     );
//         // }else if (templateData.type === "colorScheme") {
//         //     return (
//         //         <div id="circle">
//         //             <span className={"colorScheme " + this.props.rowData[columnId]}></span>
//         //         </div>
//         //     );
//         // }
//     }

//     toggleSwitchChangeAction(event, index) {
//         var dataIndex = (this.props.pageDetail.currentPage - 1) * this.props.pageDetail.offSet + index;

//         if (this.props.dataChangeAction) {
//             this.props.dataChangeAction(event, dataIndex);
//         }
//     }

//     rowOnblurAction(e) {
//         let name = e.target.name;
//         let data = this.props.rowData;
//         let value = e.target.value;
//         this.setState({ readeOny: true });
//         this.props.dataChangeAction(name, data, value);
//     }

//     editFunction(e) {
//         this.setState({ readeOny: false });
//     }
// }

// export default React.memo(RowComponent);

import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';


export default function RowComponent(props) {

    return (
        props.columns.map((column, columnIndex) => (
            <TableCell className={column.contentClass} align={column.columnAlign} lg={column.width.lg} md={column.width.md} lg={column.width.sm} lg={column.width.xs}>
                {column.template ? getTemplate(column.template, props.rowData, [column.id], props.rowDataIndex) : props.rowData[column.id]}
            </TableCell>
        ))
    );

    function getTemplate(templateData, row, columnId, index) {
        if (templateData.type === "AnchorTag") {
            return (
                <Link style={{ color: "#000" }} to={templateData.redirectLink + row[templateData.redirectId]}>{row[columnId]}</Link>
            );
        } else if (templateData.type === "clickableIconBlock") {
            return (
                <Typography>
                    {
                        templateData.icons.map((icon) => {
                            return (
                                <Tooltip title={icon.name} placement={icon.toolTipPosition} arrow={icon.istoolTipArrow}>
                                    <Icon
                                        className={"pr-2 " + icon.iconClass} id={icon.id + "_" + row[props.uniqueField].toString()}
                                        onClick={props.onClickAction}
                                    >
                                        {icon.iconName}
                                    </Icon>
                                </Tooltip>
                            );
                        })
                    }
                </Typography>
            );
        } else if (templateData.type === "clickableTextBlock") {
            return (
                <Grid direction="row">
                    {
                        templateData.texts.map((text) => {
                            return (
                                <Typography className={"mr-3 " + text.name} id={text.id + row[props.uniqueField].toString()} onClick={props.onClickAction}>
                                    { text.fieldName}
                                </Typography>
                            );
                        })
                    }
                </Grid>
            );
        }

    }
}