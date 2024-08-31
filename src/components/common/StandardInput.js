/**** StandardInput component calling way
    <StandardInput
        StandardInputID=""
        StandardInputName=""
        StandardInputClass=""
        StandardInputLabel=""
        StandardInputValue=""
    />
****/
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class StandardInput extends Component {
    render() {
        return (
            <TextField 
                id={ this.props.StandardInputID } 
                name={ this.props.StandardInputName } 
                className={ this.props.StandardInputClass } 
                label={ this.props.StandardInputLabel } 
                value={ this.props.StandardInputValue } 
                autoComplete={this.props.autoComplete} 
                onChange={this.props.StandardInputOnChange}
            />
        );
    }
}

export default StandardInput;