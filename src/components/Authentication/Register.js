import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import TextField from "@material-ui/core/TextField/TextField";

// import LockOutlinedIcon from "@material-ui/icons/LockOutlined/LockOutlined";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container/Container";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [indexNumber, setindexNumber] = useState("");
  const [fullTimeStudies, setfullTimeStudies] = useState();

  async function register() {
    let item = {
      firstName,
      lastName,
      email,
      password,
      indexNumber,
      fullTimeStudies,
    };

    axios
      .post("https://localhost:8443/students", item, {
        auth: {
          username: "lecturer@example.com",
          password: "Elo123",
        },
      })
      .then((res) => console.log(item));
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  return (
    <Container className="bg-light" component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <form onSubmit={register} className={classes.form}>
          <h3 className="text-center">Dodaj użytkownika</h3>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputProps={{ minLength: 2 }}
            id="firstname"
            label="Imię"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputProps={{ minLength: 2 }}
            id="lastname"
            label="Nazwisko"
            name="lastname"
            autoComplete="lastname"
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Adres e-mail"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputProps={{ minLength: 6 }}
            type="password"
            id="password"
            label="Hasło"
            name="password"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            inputProps={{ minLength: 6 }}
            id="indexNumber"
            label="Numer indeksu"
            name="indexNumber"
            autoComplete="indexNumber"
            onChange={(e) => setindexNumber(e.target.value)}
          />

          <InputLabel className="mt-2" id="fullTimeStudies">
            Forma studiów
          </InputLabel>
          <Select
            required
            labelId="fullTimeStudies"
            id="fullTimeStudies_id"
            value={fullTimeStudies}
            onChange={(e) => setfullTimeStudies(e.target.value)}
          >
            <MenuItem value={true}>Stacjonarne</MenuItem>
            <MenuItem value={false}>Niestacjonarne</MenuItem>
          </Select>

          <Button
            className="mt-2"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Zarejestruj{" "}
          </Button>
          <p className="forgot-password text-right">
            Jesteś już zarejestrowany? <a href="/">Zaloguj się</a>
          </p>
        </form>
      </div>
    </Container>
  );
};

export default Register;
