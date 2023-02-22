import React from "react";
import {
    Typography,
    TextField,
  } from "@mui/material";
function Input(props) {

    const {error,name,onChange,type} = props
  return (
    <div>
      <TextField
        name={name}
        id="username"
        variant="outlined"
        onChange={onChange}
        type={type}
      />
      {error.username && error.username != "" ? (
        <Typography variant="body2" gutterBottom>
          {error.username}
        </Typography>
      ) : null}
    </div>
  );
}

export default Input;
