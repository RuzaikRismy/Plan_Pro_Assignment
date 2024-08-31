import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxField(props) {
    return (
        <FormControlLabel
            className={ props.mainClassName }
            control={
                <Checkbox
                    id={ props.id }
                    name={ props.name }
                    color={ props.color || "primary" }
                    checked={ props.checked }
                    onChange={ (e) => { props.onChange(e) } }
                    className={ props.className }
                    disabled={ props.disabled }
                    { ...props }
                />
            }
            label={ props.label }
        />
    );
}