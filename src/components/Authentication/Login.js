import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Link from "@material-ui/core/Link/Link";
import Grid from "@material-ui/core/Grid/Grid";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container/Container";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/projects?size=100");
    }
  }, []);

  async function login() {
    let item = { username, password };
    let result = await fetch("https://localhost:8443/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(result);
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/projects?size=100");
  }
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Menedżer projektów
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
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
  }));

  const classes = useStyles();

  return (
    // <div>
    //   <h1 className="text-center">Strona logowania</h1>
    //   <div className="col-sm-6 offset-sm-3">
    //     <input
    //       type="text"
    //       placeholder="Nazwa użytkownika"
    //       className="form-control"
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <br />
    //     <input
    //       type="password"
    //       placeholder="Hasło"
    //       className="form-control"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <br />
    //     <button onClick={login} className="btn btn-primary text-center">
    //       Zaloguj
    //     </button>
    //   </div>
    // </div>
    <Container className="bg-light" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Zaloguj się
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Zapamiętaj mnie"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={login}
          >
            Zaloguj się
          </Button>
          <Grid container>
            <Grid item className="mt-3">
              <Link href="/register" variant="body2">
                {"Nie masz konta? Zarejestruj się"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
