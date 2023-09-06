import React, { useState } from "react";
import { useLocation } from "wouter";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [location, setLocation] = useLocation();
  // Store state data for CRUD operations
  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const createUser = async (event) => {
    event.preventDefault();
    if (email.length == 0 || password.length == 0) return;
    const dataBody = {
      user: {
        email,
        password,
      },
    };
    try {
      const response = await fetch(`/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response.headers.get("Authorization"));
      localStorage.setItem("token", response.headers.get("Authorization"));
      const data = await response.json();
      console.log(data);
      setLocation(`/entries`);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={createUser}>
      <h1>Get started for free</h1>
      <section>
        <div>
          <div>
            <label htmlFor="user_sign_up_email">Email</label>
          </div>
          <div>
            <input
              name="userRegistrationEmail"
              onChange={(event) => onChange(event, setEmail)}
              className="text-black"
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="user_sign_up_password">Password</label>
          </div>
          <div>
            <input
              name="userRegistrationPassword"
              onChange={(event) => onChange(event, setPassword)}
              className="text-black"
            />
          </div>
        </div>
      </section>
      <section>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </section>
      <span>Already have an account?</span>
      <a href="/sign_in">Log in</a>
    </form>
  );
}

export default SignUp;
