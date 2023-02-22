import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input"

function UserSignupPage() {
  let [agreedClicked, setAgreedClicked] = useState(false);

  let [pendingApiCall, setPendingApiCall] = useState(false);

  let [errors, setErrors] = useState({});

  let [state, setState] = useState({
    username: null,
    password: null,
    passwordRepeat: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const errors = { ...errors };

    errors[name] = undefined;

    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      errors,
    }));

    console.log(state);
  };

  let onSubmitForm = async (event) => {
    event.preventDefault();

    setPendingApiCall(true);

    const { username, displayName, password } = state;
    const body = {
      username,
      displayName,
      password,
    };

    try {
      const response = await signUp(body);
    } catch (error) {
      //console.log(error.response.data.validationErrors);

      if (error.response.data.validationErrors) {
        setErrors((prevState) => ({
          ...prevState,
          errors: error.response.data.validationErrors,
        }));
      }
    }

    pendingApiCall(false);
  };

  let onChangeAgreed = (event) => {
    setAgreedClicked(event.target.checked);
  };

  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          mt: 15,
        }}
      >
        <Grid container sx={{ width: "600px", height: "600px" }}>
          <Grid xs={12}>
            <Typography variant="h2" gutterBottom>
              Sign Up
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Grid container>
              <Grid xs={4} sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Username :
                </Typography>
              </Grid>
              <Grid xs={8}>
                  <Input name="username" error={errors.validationErrors.username} onChange={handleInputChange} />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Grid container>
              <Grid xs={4} sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Display Name:
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Input name="displayName" error={errors.validationErrors.displayName} onChange={handleInputChange} />
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <Grid container>
              <Grid xs={4} sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Password :
                </Typography>
              </Grid>
              <Grid xs={8}>
                <TextField
                  name="password"
                  id="password"
                  type="password"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <Grid container>
              <Grid xs={4} sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Password Repeat:
                </Typography>
              </Grid>
              <Grid xs={8}>
                <TextField
                  name="passwordRepeat"
                  id="passwordRepeat"
                  type="password"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <Grid contaniner>
              <Grid xs={12} sx={{ mb: 3 }}>
                <Checkbox onChange={onChangeAgreed} />
                <Typography component="span" variant="body2" gutterBottom>
                  Okudum Kabul ediyorum.
                </Typography>
              </Grid>

              <Grid xs={12}>
                <Button
                  disabled={!agreedClicked && pendingApiCall}
                  onSubmit={onSubmitForm}
                  variant="contained"
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default UserSignupPage;
