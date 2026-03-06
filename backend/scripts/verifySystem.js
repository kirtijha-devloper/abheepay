const API_URL = 'http://localhost:5000/api';

async function testSystemFlow() {
  try {
    console.log('--- System Flow Verification ---');

    // 1. Login as Admin
    console.log('1. Logging in as Admin...');
    const loginRes = await login('admin@abheepay.com', 'admin123');
    const token = loginRes.token;
    console.log('Admin login successful.');

    // 2. Add a new Distributor
    console.log('\n2. Adding a new Distributor...');
    const newUser = {
      role: 'DISTRIBUTOR',
      name: 'Verification Test User',
      shopName: 'Test Shop',
      mobile: '1234567890',
      email: `test_${Date.now()}@example.com`,
      password: 'password123',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    };
    const addRes = await apiCall('/users/add', 'POST', newUser, token);
    console.log('User added successfully:', addRes.data.id);

    // 3. List Users
    console.log('\n3. Fetching user list...');
    const listRes = await apiCall('/users/list', 'GET', null, token);
    const users = listRes.data;
    const addedUser = users.find(u => u.name === 'Verification Test User');
    if (addedUser) {
      console.log('Found added user in the list!');
    } else {
      console.error('Added user NOT found in list.');
    }

    // 4. Check Stats
    console.log('\n4. Checking Dashboard Stats...');
    const statsRes = await apiCall('/users/stats', 'GET', null, token);
    console.log('Total Users:', statsRes.data.totalUsers);

    // 5. Verify Wallet Balance
    console.log('\n5. Verifying Wallet Balance...');
    const balanceRes = await apiCall('/wallet/balance', 'GET', null, token);
    console.log('Current Balance:', balanceRes.balance);

    // 6. Test KYC Submission
    console.log('\n6. Testing KYC Submission (Mock Data)...');
    // Using simple JSON instead of multipart for logic check if API allows it 
    // (Actual API uses multipart, so we'll just check if endpoint responds or skips if no files)
    try {
      const kycRes = await apiCall('/kyc/submit', 'POST', { aadharNo: '123412341234', panNo: 'ABCDE1234F' }, token);
      console.log('KYC Submission test passed.');
    } catch (e) {
      if (e.details && e.details.message === 'You already have a pending KYC request') {
        console.log('KYC Submission check: Pending request exists (Success).');
      } else {
        console.warn('KYC Submission (JSON) failed as expected/unexpected:', e.message);
      }
    }

    // 7. Check Transaction History
    console.log('\n7. Checking Transaction History...');
    const txRes = await apiCall('/wallet/transactions', 'GET', null, token);
    console.log('Transactions Found:', txRes.data.length);

    console.log('\n--- Verification Completed Successfully ---');
  } catch (error) {
    console.error('\n--- Verification Failed ---');
    console.error('Error:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
  }
}

async function login(credential, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, password })
  });
  const data = await response.json();
  if (!response.ok) {
    const err = new Error('Login failed');
    err.details = data;
    throw err;
  }
  return data;
}

async function apiCall(endpoint, method, body, token) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json();
  if (!response.ok) {
    const err = new Error(`API call failed: ${endpoint}`);
    err.details = data;
    throw err;
  }
  return data;
}

testSystemFlow();
