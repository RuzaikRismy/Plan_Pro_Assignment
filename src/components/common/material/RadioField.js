import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

export default function RadioField(props) {
    return (
        <FormControlLabel
            className={props.mainClassName}
            control={
                <Radio
                    id={props.id}
                    name={props.name}
                    color={props.color || "primary"}
                    checked={props.checked}
                    onChange={(e) => { props.onChange(e) }}
                    className={props.className}
                    disabled={props.disabled}
                    {...props}
                />
            }
            label={props.label}
        />
    );
}
