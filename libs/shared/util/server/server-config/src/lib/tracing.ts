import { NodeSDK } from '@opentelemetry/sdk-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { KafkaJsInstrumentation } from '@opentelemetry/instrumentation-kafkajs';
import { Logger } from '@nestjs/common';

const SENSITIVE_KEYS = ['password', 'token', 'secret', 'authorization', 'cookie', 'accessToken', 'refreshToken', 'pii', 'email', 'phone'];

/**
 * Deeply redacts sensitive data from objects to prevent leakage in logs and traces.
 */
export function redactSensitiveData(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => redactSensitiveData(item));
  }

  const redacted: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const isSensitive = SENSITIVE_KEYS.some(sk => key.toLowerCase().includes(sk.toLowerCase()));
      if (isSensitive) {
        redacted[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        redacted[key] = redactSensitiveData(obj[key]);
      } else {
        redacted[key] = obj[key];
      }
    }
  }
  return redacted;
}

export function createOtelSdk(serviceName: string): NodeSDK {
  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
    traceExporter: new OTLPTraceExporter({
      url: process.env['OTEL_EXPORTER_OTLP_ENDPOINT'] || 'http://localhost:4318/v1/traces',
    }),
    instrumentations: [
      new HttpInstrumentation({
        requestHook: (span, request: any) => {
          const tenantId = request.headers?.['x-tenant-id'] || request.headers?.['X-Tenant-Id'];
          const requestId = request.headers?.['x-request-id'] || request.headers?.['X-Request-Id'];

          if (tenantId) {
            span.setAttribute('tenant.id', tenantId as string);
          }
          if (requestId) {
            span.setAttribute('request.id', requestId as string);
          }
        },
      }),
      new ExpressInstrumentation(),
      new NestInstrumentation(),
      new KafkaJsInstrumentation({}),
    ],
  });

  // Global shutdown handler
  process.on('SIGTERM', () => {
    Logger.log(`SIGTERM received. Starting graceful shutdown of Tracing SDK for ${serviceName}...`, 'Tracing');
    sdk.shutdown()
      .then(() => Logger.log('Tracing SDK shut down successfully', 'Tracing'))
      .catch((err) => Logger.error('Error shutting down Tracing SDK', err, 'Tracing'))
      .finally(() => process.exit(0));
  });

  return sdk;
}
