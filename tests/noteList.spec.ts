// tests/noteList.spec.ts
import { test, expect } from '@playwright/test';

test.describe('NoteList Component', () => {
    test.beforeEach(async ({ page }) => {
        // Naviguer vers la page où le composant NoteList est rendu
        await page.goto('/');
    });

    test('should render NoteList component', async ({ page }) => {
        // Vérifier que les éléments de tri et les notes sont présents
        await expect(page.locator('text=Sort by:')).toBeVisible();
        await expect(page.locator('button', { hasText: 'Date' })).toBeVisible();
        await expect(page.locator('button', { hasText: 'Grade' })).toBeVisible();
    });

    test('should display "No notes available." when there are no notes', async ({ page }) => {
        // Vérifier le message lorsqu'il n'y a pas de notes
        await expect(page.locator('text=No notes available.')).toBeVisible();
    });

    test('should display notes when there are notes', async ({ page }) => {
        // Simuler l'ajout de notes (à adapter selon votre implémentation)
        await page.evaluate(() => {
            const notes = [
                { id: 1, title: 'Note 1', grade: 15, comment: 'Comment 1' },
                { id: 2, title: 'Note 2', grade: 18, comment: 'Comment 2' },
            ];
            // Utilisez une méthode pour injecter ces notes dans votre store
            window.localStorage.setItem('notes', JSON.stringify(notes));
            window.dispatchEvent(new Event('storage'));
        });

        // Recharger la page pour prendre en compte les notes injectées
        await page.reload();

        // Vérifier que les notes sont affichées
        await expect(page.locator('text=Note 1')).toBeVisible();
        await expect(page.locator('text=Note 2')).toBeVisible();
    });

    test('should sort notes by date when "Sort by Date" button is clicked', async ({ page }) => {
        // Simuler l'ajout de notes
        await 
