import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import bcrypt from "bcryptjs";
import './login.css'

const Login = ({ setLogged }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:7000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => alert(error));
  }, []);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateInput = ({ user }) => {
    if (!user.username.trim()) {
      return false;
    }
    if (!user.password.trim()) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const validInput = validateInput({ user });

    if (!validInput) {
      alert("Complete todos los campos");
    } else {
      if (users === "Not result") {
        alert("No hay usuarios creados, vaya a registrarse");
      } else {
        if (users.find((data) => user.username === data.username)) {
          let x = users.find((data) => user.username === data.username);
          let compare = bcrypt.compareSync(user.password, x.password);
          if (compare === true) {
            setLogged(true);
            setUser({
              username: '',
              password: '',
            })

          } else {
            alert("Contraseña incorrecta");
          }
        } else {
          alert("Usuario incorrecto");
        }
      }
    }
  };

  return (
    <div className="loginContainer">
      <h2>Sign In</h2>
      <Form className="form">
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="username"
            name="username"
            id="exampleUsername"
            placeholder="username"
            value={user.username}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="********"
            value={user.password}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        {"  "}
        <Button color="success">
          <a className="link" href="/registro">
            Register
          </a>
        </Button>
      </Form>
    </div>
  );
};

export default Login;
