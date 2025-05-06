import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Welcome, {user.username}</h1>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;