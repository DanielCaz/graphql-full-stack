# Simple AppSync + React Example

A full-stack GraphQL application demonstrating AWS AppSync integration with AWS CDK and React. This project showcases how to build a serverless GraphQL API using AWS AppSync, with DynamoDB as the data source, and a modern React frontend.

## Features

- GraphQL API powered by AWS AppSync
- DynamoDB for data persistence
- Infrastructure as Code using AWS CDK
- Serverless architecture
- Type-safe GraphQL operations
- React frontend with GraphQL integration
- AWS Amplify for frontend-backend communication
- DaisyUI for responsive design

## Architecture

The application uses:

- AWS AppSync for GraphQL API management
- DynamoDB tables for data storage
- AWS CDK for infrastructure deployment
- TypeScript for type-safe development
- React for the frontend interface
- AWS Amplify for GraphQL client operations
- DaisyUI component library

## Prerequisites

- AWS Account
- Node.js & Bun installed
- AWS CDK CLI installed
- TypeScript knowledge
- React development experience
- AWS Amplify CLI installed

## Getting Started

1. Clone the repository

2. Install CDK dependencies

```bash
cd infrastructure
npm install
```

3. Deploy the infrastructure

```bash
cdk deploy
```

4. Download the `aws-exports.js` file from the AWS AppSync console and place it in the root of the `webapp` directory

5. Install React dependencies

```bash
cd webapp
bun install
```

6. Start the React app

```bash
bun run dev
```

7. Open the app in your browser

```bash
http://localhost:5173
```
