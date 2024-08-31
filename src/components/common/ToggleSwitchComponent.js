import React, { Component } from 'react';

/**************************
Sample ToggleSwitchComponent calling way

<ToggleSwitchComponent
    value={ true }
    switchClass="switch"
    toggleSwitchId="status"
    toggleSwitchName="status"
    toggleInputClass="form-control"
    toggleSliderRoundClass="slider round"
    toggleSwitchCallback={ this.statusChangeAction.bind(this) }
/>

***************************/

class ToggleSwitchComponent extends Component {
    constructor(props){
        super(props);
        this.state = { 
            toggleValue: this.props.value === true, 
            toggleSwitchId: this.props.toggleSwitchId,
            toggleSwitchName: this.props.toggleSwitchName 
        };
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.toggleSwitchId !== prevProps.toggleSwitchId){
            this.setState({ 
                toggleSwitchId: this.props.toggleSwitchId, 
                toggleSwitchName: this.props.toggleSwitchName, 
                toggleValue: this.props.value 
            });
        }
    }

    render() {
        return (
            // <div>
            <label className={ this.props.switchClass }>
                <input 
                    type="checkbox" 
                    className={ this.props.toggleInputClass }
                    id={ this.state.toggleSwitchId } 
                    name={ this.state.toggleSwitchName } 
                    onChange={ this.toggleSwitchCallback.bind(this) } 
                    checked={ this.state.toggleValue }
                />
                <span className={ this.props.toggleSliderRoundClass }></span>
            </label>
            // </div>
        );
    }

    toggleSwitchCallback(event){
        this.setState({toggleValue: !this.state.toggleValue});
        if(this.props.toggleSwitchCallback){
            this.props.toggleSwitchCallback(event, this.props.toggleElementIndex);
        }
    }

}

export default ToggleSwitchComponent;