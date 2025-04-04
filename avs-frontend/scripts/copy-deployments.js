const fs = require('fs');
const path = require('path');

// Create necessary directories
const publicDir = path.join(__dirname, '../public');
const deploymentDir = path.join(publicDir, 'deployments/hello-world');

// Ensure the deployment directory exists
fs.mkdirSync(deploymentDir, { recursive: true });

// Copy deployment file
const sourceFile = path.join(__dirname, '../../contracts/deployments/hello-world/31337.json');
const destFile = path.join(deploymentDir, '31337.json');

try {
  // Check if the source file exists
  if (fs.existsSync(sourceFile)) {
    // Read the source file
    const data = fs.readFileSync(sourceFile, 'utf8');
    
    // Write the data to the destination file
    fs.writeFileSync(destFile, data);
    
    console.log(`Successfully copied deployment file to ${destFile}`);
  } else {
    console.error(`Source file not found: ${sourceFile}`);
    console.error('Please make sure you have deployed the Hello World AVS contracts.');
  }
} catch (err) {
  console.error('Error copying deployment file:', err);
}