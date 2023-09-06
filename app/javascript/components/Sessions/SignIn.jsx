import React, { useState } from "react";
import { useLocation } from "wouter";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useLocation();
  // Store state data for CRUD operations
  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const signInUser = async (event) => {
    event.preventDefault();
    if (email.length == 0 || password.length == 0) return;
    const dataBody = {
      user: {
        email,
        password,
      },
    };
    try {
      const response = await fetch(`/login`, {
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
      setLocation(`/entries`);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={signInUser}>
      <h1>Log in to Dreampack</h1>
      <section>
        <div>
          <div>
            <label htmlFor="user_sign_in_email">Email</label>
          </div>
          <div>
            <input
              name="userEmail"
              onChange={(event) => onChange(event, setEmail)}
              className="text-black"
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="user_sign_in_password">Password</label>
          </div>
          <div>
            <input
              name="userPassword"
              onChange={(event) => onChange(event, setPassword)}
              className="text-black"
            />
          </div>
        </div>
      </section>
      <section>
        <div>
          <button type="submit">Log in</button>
        </div>
      </section>
      <span>Not a member yet?</span>
      <a href="/sign_up">Sign up for free</a>
    </form>
  );
}

export default SignIn;
