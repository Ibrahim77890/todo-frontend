import React, { useState } from "react";
import classes from "./AuthPage.module.css";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSelected, setIsSelected] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
        // Check whether it's a login or signup
        if (isSelected === "Login") {
            if(!email || !password){
                console.log("Enter all details to access.");
                return;
            }
          try {
            // Make API request to login
            const response = await fetch('http://localhost:5001/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
              // Handle successful login, e.g., redirect to dashboard
              console.log('Login successful');
              // Redirect to the home page or another route
              navigate('/todo');
            } else {
              // Handle login failure, e.g., show an error message
              console.error('Login failed');
            }
          } catch (error) {
            console.error('Error during login:', error);
          }
        } else if (isSelected === "SignUp") {
            if(!username || !email || !password){
                console.log("Enter all details to access.");
                return;
            }
          try {
            // Make API request to register a new user
            const response = await fetch('http://localhost:5001/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, email, password }),
            });
    
            if (response.ok) {
              // Handle successful registration, e.g., redirect to login page
              console.log('Registration successful');
            } else {
              // Handle registration failure, e.g., show an error message
              console.error('Registration failed');
            }
          } catch (error) {
            console.error('Error during registration:', error);
          }
        }
      };


  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e6e6e6",
      }}
    >
      <div
        style={{
          height: "fit-content",
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "30px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          padding: "24px",
        }}
      >
        <div className={classes.header}>
          <p
            style={
              isSelected === "Login"
                ? { backgroundColor: "tomato" }
                : { backgroundColor: "transparent" }
            }
            className={classes.header_item}
            onClick={() => setIsSelected("Login")}
          >
            Login
          </p>
          <p
            style={
              isSelected === "SignUp"
                ? { backgroundColor: "tomato" }
                : { backgroundColor: "transparent" }
            }
            className={
              isSelected === "SignUp"
                ? classes.header_item
                : classes.header_item
            }
            onClick={() => setIsSelected("SignUp")}
          >
            SignUp
          </p>
        </div>
        <form style={{ width: "100%"}}>
          {isSelected === "SignUp" && (
            <p className={classes.heading}>Username</p>
          )}
          {isSelected === "SignUp" && (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={"Write a username"}
              className={classes.input}
            />
          )}
          <p className={classes.heading}>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Write your email"}
            className={classes.input}
          />
          <p className={classes.heading}>Password</p>
          <input
            type="password"
            placeholder={"Write your password"}
            className={classes.input}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <span style={{ height: "20px", width: "100%" }} />
        <div className={classes.button} onClick={handleFormSubmit}>
          {isSelected === "Login" ? "Login" : "SignUp"}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
