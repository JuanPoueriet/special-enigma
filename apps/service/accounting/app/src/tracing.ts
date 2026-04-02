import { createOtelSdk } from '@virtex/shared-util-server-server-config';
import { Logger } from '@nestjs/common';

export const otelSDK = createOtelSdk('virtex-accounting-service');

// Graceful shutdown
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => Logger.log('SDK shut down successfully', 'Tracing'),
      (err) => Logger.error('Error shutting down SDK', err, 'Tracing')
    )
    .finally(() => process.exit(0));
});
