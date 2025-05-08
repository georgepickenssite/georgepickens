# Example application that uses AWS Amplify Gen 2 and AWS AppSync Events

This example uses Next.js 15 with server actions to create two different types of chat rooms. The first is powered by Amplify AI kit, and allows users to chat with AI users. The other allows multiple users to sign in and chat with each other. The app uses AWS Amplify Gen 2 and uses various AWS services.

This app has the following features:

- Amplify Gen 2
- Next.js 15
- shadcn/ui
- Tailwind
- Amazon Cognito
- AWS AppSync Events
- AWS AppSync
- AWS Amplify AI kit

## Getting Started

### Prerequisites

- Node.js 18+ installed
- AWS account that has been set up for [AWS Amplify local setup](https://docs.amplify.aws/react/start/account-setup/) and has enabled access to the Claude 3.5 sonnet model in Amazon Bedrock.

### Installation

1. Clone the repository
2. Install the dependencies with your favorite Javscript package manager. For example, `npm install`
3. Run `npx ampx sandbox` to spin up a sandbox cloud backend
4. Run `npm run dev` to start up the Next.js React app locally.

## AWS Amplify Hosting

After testing locally you can run it in production on Amplify Hosting using this [guide](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started-next.html).
