# Amplify Gen 2 Chat App

A simple real-time chat app using AWS Amplify Gen 2 and vanilla HTML/JS.

## File Structure

```
/
├── amplify/
│   ├── backend/
│   │   └── data/
│   │       └── schema.graphql
│   └── workflows/
│       └── deploy.yaml
├── public/
│   └── index.html
├── src/
│   └── main.js
├── .gitignore
├── package.json
└── README.md
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. If you haven't already, initialize Amplify Gen 2 (see AWS docs).

3. Push backend and generate outputs:
   ```bash
   npx amplify codegen
   npx amplify push
   ```

4. Run locally:
   ```bash
   npx http-server public
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

## How it Works

- **Amplify Gen 2** provides a real-time GraphQL API for chat messages.
- **Frontend** is a simple HTML page and vanilla JS.
- **No authentication**: anyone can join as any username.
- Expand features by updating `amplify/backend/data/schema.graphql` and frontend code.

---