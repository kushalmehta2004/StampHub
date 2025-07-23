// Test script to verify wallet functionality
console.log('Testing wallet integration...');

// Simulate user login
const testUser = {
  id: 'user-test-123',
  name: 'Test User',
  email: 'test@example.com'
};

// Test wallet balance storage
const testBalance = 5000;
localStorage.setItem(`wallet_${testUser.id}`, testBalance.toString());

// Test transaction storage
const testTransaction = {
  id: 'TXN' + Date.now(),
  type: 'deposit',
  amount: testBalance,
  description: 'Test deposit',
  date: new Date().toISOString(),
  status: 'completed',
  method: 'Test Deposit'
};

localStorage.setItem(`transactions_${testUser.id}`, JSON.stringify([testTransaction]));

// Verify storage
const storedBalance = localStorage.getItem(`wallet_${testUser.id}`);
const storedTransactions = localStorage.getItem(`transactions_${testUser.id}`);

console.log('Stored balance:', storedBalance);
console.log('Stored transactions:', JSON.parse(storedTransactions));

console.log('Wallet integration test completed!');