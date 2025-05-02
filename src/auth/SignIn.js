import React, { useState } from "react";
import { Auth } from "aws-amplify";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await Auth.signIn(username, password);
      alert("Sign-in successful!");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignIn;