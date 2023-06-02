
const fs = require('fs');
const Web3 = require('web3');

// Create a new Web3 instance
const web3 = new Web3('https://mainnet.infura.io/v3/f2b8d8d4253d4da99fdeb8124dc0e106');

// Read the JSON file
const jsonString = fs.readFileSync('addresses.json', 'utf8');
const addresses = JSON.parse(jsonString);
const whitelist = [];

// Function to check the number of transactions for an address
async function getTransactionCount(address) {
  try {
    const count = await web3.eth.getTransactionCount(address);
    console.log(address + " - " + count);
    return count;
  } catch (error) {
    console.error('Error:', error);
    return 0;
  }
}

// Filter and remove addresses with zero transactions
async function filterAddresses() {
  // Iterate over the addresses in the object
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];

    // Get the number of transactions
    const count = await getTransactionCount(address);

    // If the number of transactions is zero, remove the address
    if (count > 0) {
      whitelist.push(address);
    }

    // Convert the updated object back to JSON
    const updatedJsonString = JSON.stringify(whitelist);

    // Write the JSON back to the file
    fs.writeFileSync('updated_addresses.json', updatedJsonString, 'utf8');
  }
}

// Run the filterAddresses function
filterAddresses();
