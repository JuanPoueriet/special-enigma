import http from 'k6/http';
import { check, sleep } from 'k6';
import { crypto } from 'k6/crypto';
import encoding from 'k6/encoding';

export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 50,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 200, duration: '30s' },
        { target: 200, duration: '1m' },
        { target: 0, duration: '30s' },
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<200'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const SECRET = __ENV.VIRTEEX_HMAC_SECRET || 'dev-secret';
const TENANT_COUNT = 1000;

function sign(contextStr) {
  return crypto.hmac('sha256', SECRET, contextStr, 'hex');
}

export default function () {
  const tenantId = Math.floor(Math.random() * TENANT_COUNT) + 1;
  const context = JSON.stringify({
    tenantId: `tenant-${tenantId}`,
    userId: 'user-1',
    roles: ['admin']
  });

  const contextBase64 = encoding.b64encode(context);
  const signature = sign(contextBase64);

  const headers = {
    'Content-Type': 'application/json',
    'x-virteex-context': contextBase64,
    'x-virteex-signature': signature,
  };

  const res = http.get(`${BASE_URL}/api/samples`, { headers });

  check(res, { 'status was 200': (r) => r.status == 200 });
}
