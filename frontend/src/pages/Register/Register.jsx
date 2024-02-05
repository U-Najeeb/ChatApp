/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.scss";
import SnackBarContext from "../../context/SnackBarContext";
import { useContext, useState } from "react";
import axios from "axios";
import { registerRoute } from "../../utils/apiRoutes";
const Register = () => {
  const { snackbar, setSnackbar } = useContext(SnackBarContext);
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
  
    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords Do Not Match",
        serverity: "error",
      });
      return false;
    } else if (username.length < 3) {
      setSnackbar({
        open: true,
        message: "Username is too short",
        serverity: "warning",
      });
      return false;
    } else if (email.length === 0) {
      setSnackbar({
        open: true,
        message: "Email is required",
        serverity: "warning",
      });
      return false;
    }
  
    return true; // Return true if all validations pass
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (handleValidation()) {
      try {
        const { username, email, password } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
  
        console.log(data);
  
        if (data) {
          localStorage.setItem("current--user", JSON.stringify(data.registeredUser));
          navigate('/');
        }
      } catch (error) {
        console.error("Registration failed:", error.message);
        // You might want to show an error snackbar or handle the error in some way
      }
    }
  };
  

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer className="form--container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src="" alt="" />
            <h1>Talky</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Confirm Your Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create User</button>

          <span>
            Already have an account ?<Link to={"/login"}> Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div``;

export default Register;
