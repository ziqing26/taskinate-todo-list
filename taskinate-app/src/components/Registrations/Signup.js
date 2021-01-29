import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
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
  button: {
    backgroundColor: "#b2ebf2",
  },
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, password_confirmation } = this.state;
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    axios
      .post("api/v3/users", { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleLogin(response.data);
          this.redirect();
        } else {
          this.setState({
            errors: response.data.errors,
          });
        }
      })
      .catch((error) => console.log("api errors:", error));
  };
  redirect = () => {
    this.props.history.push("/welcome");
  };
  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };
  render() {
    const { username, email, password, password_confirmation } = this.state;
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <br />
          <br />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              placeholder="password confirmation"
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={this.handleChange}
            />

            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              placeholder="submit"
              type="submit"
            >
              Sign Up
            </Button>

            <div>
              <br />
              or <Link to="/login">log in</Link>
            </div>
          </form>

          <div>{this.state.errors ? this.handleErrors() : null}</div>
        </div>
      </Container>
    );
  }
}
export default withStyles(styles)(Signup);
