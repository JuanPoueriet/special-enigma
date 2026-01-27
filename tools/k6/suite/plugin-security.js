import http from 'k6/http';
import { check, sleep } from 'k6';
import { crypto } from 'k6/crypto';
import encoding from 'k6/encoding';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    'http_req_failed': ['rate<0.01'],
    'http_req_duration': ['p(95)<2000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const SECRET = __ENV.VIRTEEX_HMAC_SECRET || 'dev-secret';

function sign(contextStr) {
  return crypto.hmac('sha256', SECRET, contextStr, 'hex');
}

function getHeaders() {
  const context = JSON.stringify({ tenantId: 'tenant-hacker', userId: 'hacker', roles: ['admin'] });
  const contextBase64 = encoding.b64encode(context);
  const signature = sign(contextBase64);
  return {
    'Content-Type': 'application/json',
    'x-virteex-context': contextBase64,
    'x-virteex-signature': signature
  };
}

export default function () {
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
    const res = http.post(`${BASE_URL}/api/plugins/execute`, JSON.stringify({ code: test.code }), { headers: getHeaders() });

    check(res, {
      [`${test.name} handled gracefully`]: (r) => r.status === 200 || r.status === 400 || r.status === 422,
      [`${test.name} no server error`]: (r) => r.status !== 500,
    });

    sleep(1);
  }
}
