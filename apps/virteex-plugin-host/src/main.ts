import Fastify from 'fastify';
import { SandboxService } from './sandbox.service';
import { PluginAdmissionService } from './services/plugin-admission.service';

const server = Fastify({ logger: true });
const sandbox = new SandboxService();
const admissionService = new PluginAdmissionService();

server.post('/execute', async (request, reply) => {
  const body = request.body as { code: string; name?: string; dependencies?: Record<string, string> };

  if (!body.code) {
    return reply.status(400).send({ error: 'Code is required' });
  }

  // 1. Admission Control
  const pluginPackage = {
    name: body.name || 'anonymous-plugin',
    code: body.code,
    dependencies: body.dependencies
  };

  const admission = await admissionService.validatePlugin(pluginPackage);

  if (admission.status === 'rejected') {
    return reply.status(403).send({
      error: 'Plugin rejected by admission policy',
      reason: admission.reason,
      details: admission.details,
      riskScore: admission.riskScore
    });
  }

  // 2. Execution in Sandbox
  const result = await sandbox.run(body.code);

  if (!result.success) {
    // If it's a runtime error (e.g. throw), we return 200 with error details? Or 422?
    // Standard practice for "Execution Failed" (but service worked) is 200 with error payload,
    // unless it's a system error.
    return reply.send({
      status: 'execution_failed',
      logs: result.logs,
      error: result.error,
      executionTimeMs: result.executionTimeMs
    });
  }

  return reply.send({
    status: 'success',
    logs: result.logs,
    executionTimeMs: result.executionTimeMs
  });
});

// Health Check
server.get('/health', async () => {
  return { status: 'ok', version: '1.0.0' };
});

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Plugin Host Service listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
