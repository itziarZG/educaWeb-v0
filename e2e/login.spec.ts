import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should display the login form', async ({ page }) => {
    await page.goto('/login');
    await expect(
      page.getByRole('heading', { name: /Iniciar Sesión/i })
    ).toBeVisible();
  });

  test('should display email and password fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Contraseña')).toBeVisible();
  });

  test('should display the submit button', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('button', { name: /Entrar/i })).toBeVisible();
  });

  test('should display the Google login button', async ({ page }) => {
    await page.goto('/login');
    await expect(
      page.getByRole('button', { name: /Continuar con Google/i })
    ).toBeVisible();
  });

  test('should navigate to login from header', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/login/);
  });
});
