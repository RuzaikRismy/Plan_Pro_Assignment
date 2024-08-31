import React from "react";
import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const TextError = (props) => {
  const theme = useTheme();
  return (
    <Typography
      variant="body2"
      style={{
        backgroundColor: 'transparent',
        color: theme.palette.reds.dark,
      }}
    >
      {props.children}
    </Typography>
  );
};

export default TextError;
