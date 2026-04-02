import { test, expect } from '@playwright/test';

test.describe('Operations Console - Enterprise Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Mock login by setting local storage
    await page.addInitScript(() => {
      window.localStorage.setItem('token', 'mock-enterprise-token');
      window.localStorage.setItem('email', 'admin@virtex.com');
    });
    await page.goto('/dashboard');
  });

  test('should display operational dashboard with real metrics', async ({ page }) => {
    await expect(page.getByText('Operational Control Plane')).toBeVisible();
    await expect(page.getByText('Total Ecosystem Tenants')).toBeVisible();
    await expect(page.getByText('System Audit Stream')).toBeVisible();
  });

  test('should navigate to tenant catalog and show provision button', async ({ page }) => {
    await page.click('text=Tenants');
    await expect(page.getByText('Enterprise Tenant Catalog')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Provision New Tenant' })).toBeVisible();
  });

  test('should allow navigating to monitoring module', async ({ page }) => {
    await page.click('text=Monitoring');
    await expect(page.getByText('System Observability')).toBeVisible();
  });

  test('should allow navigating to security/audit module', async ({ page }) => {
    await page.click('text=Security');
    await expect(page.getByText('Operations Security & Audit')).toBeVisible();
  });

  test('should allow navigating to incident management', async ({ page }) => {
    await page.click('text=Support');
    await expect(page.getByText('Operational Incident Management')).toBeVisible();
  });
});
