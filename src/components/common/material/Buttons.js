import React from 'react';
import Button from '@material-ui/core/Button';

export default function Buttons(props) {
    return (
        <Button
            {...props}
            classes={props.classes}
            color={props.color || 'default'}
            variant={props.variant || 'contained'}
            onClick={props.onClick}
        >
            { props.label}
        </Button>
    );
}