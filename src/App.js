import React from "react";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";

Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <h1>Welcome to Amplify React Webapp</h1>
      <SignUp />
      <SignIn />
    </div>
  );
}

export default App;