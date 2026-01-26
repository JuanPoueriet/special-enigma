import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { trace, context, Span } from '@opentelemetry/api';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';

@Injectable()
export class TelemetryService implements OnModuleInit, OnModuleDestroy {
  private sdk: NodeSDK;
  private readonly logger = new Logger(TelemetryService.name);

  constructor() {
    let traceExporter;
    let spanProcessor;

    if (process.env['OTEL_EXPORTER_OTLP_ENDPOINT']) {
        traceExporter = new OTLPTraceExporter();
        spanProcessor = new BatchSpanProcessor(traceExporter);
    } else {
        traceExporter = new ConsoleSpanExporter();
        spanProcessor = new SimpleSpanProcessor(traceExporter);
    }

    this.sdk = new NodeSDK({
      resource: resourceFromAttributes({
        [SemanticResourceAttributes.SERVICE_NAME]: process.env['SERVICE_NAME'] || 'virteex-service',
      }),
      spanProcessor,
      instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new NestInstrumentation(),
      ],
    });
  }

  onModuleInit() {
    this.sdk.start();
    this.logger.log('Telemetry SDK started');
  }

  async onModuleDestroy() {
    try {
      await this.sdk.shutdown();
      this.logger.log('Telemetry SDK shut down');
    } catch (err) {
      this.logger.error('Error shutting down Telemetry SDK', err);
    }
  }

  getTracer(name: string = 'virteex-kernel') {
    return trace.getTracer(name);
  }

  getActiveSpan(): Span | undefined {
    return trace.getSpan(context.active());
  }

  setTraceAttributes(attributes: Record<string, string | number | boolean>) {
    const span = this.getActiveSpan();
    if (span) {
      span.setAttributes(attributes);
    }
  }

  recordSecurityEvent(eventName: string, details: Record<string, any>) {
    const span = this.getActiveSpan();
    if (span) {
      span.addEvent(eventName, details);
    }
    this.logger.warn(`[SECURITY] ${eventName}`, details);
  }
}
