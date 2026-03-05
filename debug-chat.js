// Test script to debug the chat API
async function testChatAPI() {
  try {
    console.log('Testing chat API...');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3001/api/health');
    console.log('Health status:', healthResponse.status);
    const healthData = await healthResponse.json();
    console.log('Health data:', healthData);
    
    // Test chat endpoint
    console.log('2. Testing chat endpoint...');
    const chatResponse = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello, this is a test message',
        model: 'fast',
      }),
    });
    
    console.log('Chat status:', chatResponse.status);
    const chatData = await chatResponse.json();
    console.log('Chat data:', chatData);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testChatAPI();
