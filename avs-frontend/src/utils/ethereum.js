import { ethers } from 'ethers';
import HelloWorldServiceManagerABI from '../abis/HelloWorldServiceManager.json';

const ANVIL_URL = 'http://localhost:8545';
const CHAIN_ID = '31337'; // Local Anvil chain ID

// Function to fetch contract address from deployment file
const getContractAddress = async () => {
  try {
    // Use fetch to get the deployment file (we can't use Node.js fs in browser)
    const response = await fetch(`/deployments/hello-world/${CHAIN_ID}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch deployment file: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.addresses.helloWorldServiceManager;
  } catch (error) {
    console.error('Error loading contract address:', error);
    throw error;
  }
};

export const connectToEthereum = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(ANVIL_URL);
    
    // Get contract address from deployment file
    const contractAddress = await getContractAddress();
    if (!contractAddress) {
      throw new Error('Contract address not found in deployment file');
    }
    
    const contract = new ethers.Contract(
      contractAddress,
      HelloWorldServiceManagerABI,
      provider
    );
    
    return { provider, contract };
  } catch (error) {
    console.error('Error connecting to Ethereum:', error);
    throw error;
  }
};

export const submitTask = async (name) => {
  try {
    const { provider, contract } = await connectToEthereum();
    const signer = await provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    
    const tx = await contractWithSigner.createNewTask(name);
    await tx.wait();
    
    return tx;
  } catch (error) {
    console.error('Error submitting task:', error);
    throw error;
  }
};

export const listenForEvents = (callback) => {
  const setupListeners = async () => {
    try {
      const { contract } = await connectToEthereum();
      
      // Listen for new tasks
      contract.on('NewTaskCreated', (taskIndex, task) => {
        callback({
          type: 'NewTaskCreated',
          taskIndex: taskIndex,
          name: task.name,
          taskCreatedBlock: task.taskCreatedBlock,
        });
      });
      
      // Listen for task responses
      contract.on('TaskResponded', (taskIndex, task, operator) => {
        callback({
          type: 'TaskResponded',
          taskIndex: taskIndex,
          name: task.name,
          taskCreatedBlock: task.taskCreatedBlock,
          operator: operator,
        });
      });
      
      return () => {
        contract.removeAllListeners('NewTaskCreated');
        contract.removeAllListeners('TaskResponded');
      };
    } catch (error) {
      console.error('Error setting up event listeners:', error);
    }
  };
  
  return setupListeners();
};