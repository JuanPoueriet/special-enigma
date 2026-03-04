# Runbook: GraphQL Federation Incidents

## 1. Composition Failure
**Symptoms**: Gateway fails to start, "CRITICAL: Supergraph SDL missing" or "signature verification failed" in logs.
**Mitigation**:
1. Check CI/CD pipeline for composition job results.
2. Verify that all subgraphs are reachable and their schemas are valid.
3. If signature fails, ensure the correct public key is deployed and the manifest matches the SDL.
4. Rollback to the last known good signed supergraph.

## 2. Latency Degradation (p99)
**Symptoms**: Latency spikes, "Query is too complex" errors.
**Mitigation**:
1. Inspect Query Plans for unusually deep or wide resolutions.
2. Check for N+1 issues in subgraphs (ensure DataLoaders are active).
3. Review tenant complexity budgets; adjust tier if necessary.
4. Scale affected subgraph instances.

## 3. Breaking Contract Detected
**Symptoms**: CI gate "federation:check-diff" fails with exit code 1.
**Mitigation**:
1. Review the "Change Classification Report" in CI logs.
2. If change is accidental, revert it.
3. If change is intentional, follow the Deprecation Policy (add @deprecated, set sunset window).
4. Do NOT bypass the gate without Architecture Committee approval.

## 4. Security Violation
**Symptoms**: Sensitive fields exposed without @auth/@sensitive directives.
**Mitigation**:
1. Immediate rollback if deployed.
2. Update schema to include mandatory security metadata.
3. Run "federation:validate-contracts" locally to verify fix.
