/*** Chip component calling way
    <ChipComponent
        chipLabel="Allergies"
        chipDefaultSet={ [] }
        isDisabled={ true }
        // chipSetChangeAction={ this.chipChangeAction }
    />
***/

import React, { Component, createRef } from 'react';
import ChipInput from 'material-ui-chip-input'

class ChipComponent extends Component {
    constructor(props){
        super(props);
        this.chipChangeAction=this.chipChangeAction.bind(this);
        this.inputChangeAction=this.inputChangeAction.bind(this);
        this.state={
            inputValue: "",
        };
    }

    render() {
        return (
            <div>
                <ChipInput
                    defaultValue={this.props.chipDefaultSet }
                    fullWidth={ true }
                    label={ this.props.chipLabel }
                    onChange={ this.chipChangeAction }
                    inputValue={ this.state.inputValue }
                    onUpdateInput={ this.inputChangeAction }
                    disabled={ this.props.isDisabled }
                />
                
            </div>
        );
    }

    inputChangeAction(event){
        this.setState({ inputValue: event.target.value });
    }

    chipChangeAction(chipList){
        this.setState({ inputValue:"" });
        if(this.props.chipSetChangeAction){
           this.props.chipSetChangeAction(chipList);
           }
        
    }



}

export default ChipComponent;