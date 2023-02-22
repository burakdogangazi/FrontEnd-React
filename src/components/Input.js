import React from "react";

function Input(props) {

    const {error,name,onChange} = props
  return (
    <div>
      <TextField
        name={name}
        id="username"
        variant="outlined"
        onChange={onChange}
      />
      {error.username && error.username != "" ? (
        <Typography variant="body2" gutterBottom>
          {errors.username}
        </Typography>
      ) : null}
    </div>
  );
}

export default Input;
