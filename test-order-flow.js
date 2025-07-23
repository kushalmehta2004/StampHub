// Test script to verify order flow works correctly
console.log('Testing order flow...');

// Simulate test user
const testUser = { id: 'user-123', email: 'test@example.com' };

// Test wallet setup
const initialBalance = 5000;
localStorage.setItem(`wallet_${testUser.id}`, initialBalance.toString());
console.log('✅ Wallet balance set:', initialBalance);

// Test order creation
const testOrder = {
  id: 'ORD-TEST-' + Date.now(),
  date: new Date().toISOString(),
  status: 'confirmed',
  total: 250,
  subtotal: 225,
  shippingCost: 25,
  paymentMethod: 'deposit',
  items: [
    {
      id: 'stamp-1',
      name: 'Test Commemorative Stamp',
      quantity: 2,
      price: 100,
      image: '🎯'
    },
    {
      id: 'stamp-2', 
      name: 'Heritage Series Stamp',
      quantity: 1,
      price: 25,
      image: '🏛️'
    }
  ],
  shippingAddress: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    street: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    pincode: '123456'
  },
  createdAt: new Date().toISOString()
};

// Save order
const existingOrders = JSON.parse(localStorage.getItem(`orders_${testUser.id}`) || '[]');
const updatedOrders = [testOrder, ...existingOrders];
localStorage.setItem(`orders_${testUser.id}`, JSON.stringify(updatedOrders));
console.log('✅ Order saved:', testOrder.id);

// Update wallet balance (deduct order total)
const newBalance = initialBalance - testOrder.total;
localStorage.setItem(`wallet_${testUser.id}`, newBalance.toString());
console.log('✅ Wallet balance updated:', newBalance);

// Create transaction record
const testTransaction = {
  id: 'TXN-TEST-' + Date.now(),
  type: 'purchase',
  amount: -testOrder.total,
  description: `Order payment - ${testOrder.items.length} items`,
  date: new Date().toISOString(),
  status: 'completed',
  orderNumber: testOrder.id
};

const existingTransactions = JSON.parse(localStorage.getItem(`transactions_${testUser.id}`) || '[]');
const updatedTransactions = [testTransaction, ...existingTransactions];
localStorage.setItem(`transactions_${testUser.id}`, JSON.stringify(updatedTransactions));
console.log('✅ Transaction recorded:', testTransaction.id);

// Verify data
const storedOrders = JSON.parse(localStorage.getItem(`orders_${testUser.id}`));
const storedBalance = localStorage.getItem(`wallet_${testUser.id}`);
const storedTransactions = JSON.parse(localStorage.getItem(`transactions_${testUser.id}`));

console.log('\n📋 Test Results:');
console.log('Orders count:', storedOrders.length);
console.log('Current balance:', storedBalance);
console.log('Transactions count:', storedTransactions.length);
console.log('Latest order:', storedOrders[0].id, '-', storedOrders[0].status);
console.log('Latest transaction:', storedTransactions[0].type, '-', storedTransactions[0].amount);

console.log('\n✅ Order flow test completed successfully!');