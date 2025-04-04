# Hello World AVS Frontend

A Ghibli-styled React frontend for the Hello World AVS project. This application allows users to:

1. Create new tasks by submitting a name
2. View events emitted by the contract in real-time

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Running Anvil chain with deployed Hello World AVS contracts

## Setup

1. Clone the repository and navigate to the `avs-frontend` directory
2. Install dependencies:

```
npm install
```

## Running the application

1. First, make sure your Anvil chain is running with the Hello World AVS contracts deployed:

```
# Start anvil
npm run start:anvil

# In another terminal
npm run deploy:core
npm run deploy:hello-world

# Start the operator to see task responses
npm run start:operator
```

2. Start the frontend application:

```
cd avs-frontend
npm start
```

The application will be available at http://localhost:3000

## How it works

The frontend automatically:

1. Copies the contract deployment file from `contracts/deployments/hello-world/31337.json` to the public directory
2. Reads the HelloWorldServiceManager contract address from this file
3. Connects to the contract on the local Anvil chain
4. Listens for task-related events

## Usage

1. Enter a name in the input field and click "Create Task" to submit a new task
2. Watch the Events panel for real-time updates as tasks are created and operators respond

## Troubleshooting

If you encounter connection issues:

1. Make sure Anvil is running at http://localhost:8545
2. Ensure you've deployed the contracts with `npm run deploy:core` and `npm run deploy:hello-world`
3. Check the console for specific error messages
4. Try restarting the frontend application after deploying the contracts