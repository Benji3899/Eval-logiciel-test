// import { test, expect } from '@playwright/test';
//
// test('I can create a task and it appears in the task list', async ({
//   page,
// }) => {
//   await page.goto('http://localhost:5173/');
//   await page.getByPlaceholder('Add a new task').click();
//   await page.getByPlaceholder('Add a new task').fill('Test tache');
//   await page.getByRole('button', { name: 'Add' }).click();
//
//   const list = page.getByRole('listitem');
//
//   await expect(list).toHaveCount(1);
//   await expect(page.getByText('Test tache')).toBeDefined();
// });
//
// test('I can delete a task in task list', async ({ page }) => {
//   await page.goto('http://localhost:5173/');
//   await page.getByPlaceholder('Add a new task').click();
//   await page.getByPlaceholder('Add a new task').fill('Delete task');
//   await page.getByRole('button', { name: 'Add' }).click();
//   await page.getByRole('button').nth(2).click();
//
//   const list = page.getByRole('listitem');
//
//   await expect(list).toHaveCount(0);
//   await expect(page.getByText('Test tache')).not.toBeInViewport();
// });
