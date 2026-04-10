import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the main heading', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', {
        name: /Acompaña.*el aprendizaje de tus hijos/s,
      })
    ).toBeVisible();
  });

  test('should display the call-to-action button', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('link', { name: /Empieza gratis ahora/i })
    ).toBeVisible();
  });

  test('should display the three feature cards', async ({ page }) => {
    await page.goto('/');
    const featureHeading = page.getByRole('heading', {
      name: 'Gamificación física',
    });
    await featureHeading.scrollIntoViewIfNeeded();
    await expect(
      page.getByRole('heading', { name: 'Personalización inmediata' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Confianza y motivación' })
    ).toBeVisible();
    await expect(featureHeading).toBeVisible();
  });

  test('should navigate to register page when CTA is clicked', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Empieza gratis ahora/i }).click();
    await expect(page).toHaveURL(/\/register/);
  });

  test('should display the header with logo', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('TUTOR_AI').first()).toBeVisible();
  });

  test('should display the footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('© 2026 TUTOR_AI')).toBeVisible();
  });
});
