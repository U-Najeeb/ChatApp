/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Login.scss";
import SnackBarContext from "../../context/SnackBarContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { loginRoute} from "../../utils/apiRoutes";

const Register = () => {
  const { snackbar, setSnackbar } = useContext(SnackBarContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleValidation = () => {
    const { password, email } = values;

    if (password === "") {
      setSnackbar({
        open: true,
        message: "Email or Password Are Required",
        serverity: "error",
      });
      return false;
    } else if (email === "") {
      setSnackbar({
        open: true,
        message: "Email or Password Are Required",
        serverity: "error",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if(localStorage.getItem("current--user")){
      navigate("/")
    }
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      setSnackbar({
        open : true,
        message : data.message,
        serverity : "error"
      })
      if (data.loggedInUser) {
        setSnackbar({
          open: true,
          message: "Logged in Successfully",
          severity: "success",
        });
        localStorage.setItem("current--user", JSON.stringify(data.loggedInUser))
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    
  };
  return (
    <>
      <FormContainer className="form--container">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="brand">
            <img src="" alt="" />
            <h1>Talky</h1>
          </div>

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

          <button type="submit">Login</button>

          <span>
            Not A User?<Link to={"/register"}> Register</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div``;

export default Register;
