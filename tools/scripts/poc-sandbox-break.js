const axios = require('axios');
const crypto = require('crypto');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SECRET = process.env.VIRTEEX_HMAC_SECRET || 'dev-secret';

function getHeaders(tenantId) {
  const context = JSON.stringify({ tenantId, userId: 'hacker', roles: ['admin'] });
  const contextBase64 = Buffer.from(context).toString('base64');
  const signature = crypto.createHmac('sha256', SECRET).update(contextBase64).digest('hex');
  return {
    'Content-Type': 'application/json',
    'x-virteex-context': contextBase64,
    'x-virteex-signature': signature
  };
}

async function runTest() {
  const maliciousPayloads = [
    {
      name: 'Infinite Loop',
      code: 'while(true) {}',
    },
    {
      name: 'External Fetch',
      code: 'fetch("http://google.com")',
    },
    {
      name: 'Process Exit',
      code: 'process.exit(1)',
    },
    {
      name: 'Console Spam',
      code: 'for(let i=0; i<1000; i++) log("spam")',
    }
  ];

  for (const test of maliciousPayloads) {
    console.log(`\nRunning POC: ${test.name}`);
    try {
      // Assuming endpoint structure
      const res = await axios.post(`${BASE_URL}/api/plugins/execute`, { code: test.code }, { headers: getHeaders('tenant-hacker') });
      console.log(`[${test.name}] HTTP Status: ${res.status}`);
      console.log(`[${test.name}] Data:`, JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.log(`[${test.name}] Caught Error:`, err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
    }
  }
}

if (require.main === module) {
  runTest().catch(console.error);
}
