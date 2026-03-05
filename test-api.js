// Test API endpoints
// Run this in browser console when your app is running

async function testAPI() {
  try {
    // Test health endpoint
    const healthResponse = await fetch('/api/health');
    const health = await healthResponse.json();
    console.log('Health check:', health);
    
    // Test posts endpoint
    const postsResponse = await fetch('/api/posts');
    const posts = await postsResponse.json();
    console.log('Posts:', posts);
    
    // Test creating a post
    const testPost = {
      author: "Test User",
      description: "This is a test post",
      platform: "Test"
    };
    
    const createResponse = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPost)
    });
    
    const createdPost = await createResponse.json();
    console.log('Created post:', createdPost);
    
  } catch (error) {
    console.error('API test failed:', error);
  }
}

// Run the test
testAPI();
