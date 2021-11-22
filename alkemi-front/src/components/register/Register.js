import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";
import bcrypt from "bcryptjs";
import './register.css'

const Register = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    comfirmedPassword: "",
  });
  const [resgistered, setRegistered] = useState(false);

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
    if (!user.comfirmedPassword.trim()) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validInput = validateInput({ user });

    if (!validInput) {
      alert("Complete todos los campos");
    } else {
      if (users === "Not result") {
        if (user.password === user.comfirmedPassword) {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(user.password, salt);
          axios({
            method: "post",
            url: "http://localhost:7000/users/add",
            data: {
              username: user.username,
              password: hash,
            },
          })
            .then((res) => {
              if (res.status === 200) {
                setRegistered(true);
              }
            })
            .catch((error) => console.log(error));
        }
      } else {
        if (users.find((data) => user.username === data.username)) {
          alert("El usuario ya existe");
        } else {
          if (user.password === user.comfirmedPassword) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(user.password, salt);
            axios({
              method: "post",
              url: "http://localhost:7000/users/add",
              data: {
                username: user.username,
                password: hash,
              },
            })
              .then((res) => {
                if (res.status === 200) {
                  console.log(res.status);
                  setRegistered(true);
                }
              })
              .catch((error) => console.log(error));
          }
        }
      }
    }
  };

  return (
    <div className="loginContainer">
      <h2>Register</h2>
      {!resgistered ? (
        <Form className="form">
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="username"
              name="username"
              id="exampleUsername"
              placeholder="username"
              required
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
              required
              value={user.password}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Comfirm Password</Label>
            <Input
              type="password"
              name="comfirmedPassword"
              id="examplePassword"
              placeholder="********"
              required
              value={user.comfirmedPassword}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default Register;
