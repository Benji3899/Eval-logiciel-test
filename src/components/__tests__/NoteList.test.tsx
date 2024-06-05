// src/components/__tests__/NoteList.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteList from '../NoteList';
import { NoteProvider } from '../../contexts/NoteContext';

test('renders NoteList component', () => {
    const { getByText, queryByText } = render(
        <NoteProvider> {}
            <NoteList />
        </NoteProvider>
    );

    expect(getByText(/Sort by:/i)).toBeInTheDocument();
    expect(getByText(/Date/i)).toBeInTheDocument();
    expect(getByText(/Grade/i)).toBeInTheDocument();
});

test('displays "No notes available." when there are no notes', () => {
    const { getByText } = render(
        <NoteProvider>
            <NoteList />
        </NoteProvider>
    );

    expect(getByText(/No notes available./i)).toBeInTheDocument();
});

test('displays notes when there are notes', () => {
    // Mettez en place un état où il y a des notes
    const notes = [
        { id: 1, title: 'Note 1', grade: 15, comment: 'Comment 1' },
        { id: 2, title: 'Note 2', grade: 18, comment: 'Comment 2' },
    ];
    const { getByText } = render(
        <NoteProvider>
            <NoteList />
        </NoteProvider>
    );

    expect(getByText(/Note 1/i)).toBeInTheDocument();
    expect(getByText(/Note 2/i)).toBeInTheDocument();
});

test('sorts notes by date when "Sort by Date" button is clicked', () => {
    // Mettez en place un état où il y a des notes dans un ordre spécifique
    const notes = [
        { id: 1, title: 'Note 1', grade: 15, comment: 'Comment 1' },
        { id: 2, title: 'Note 2', grade: 18, comment: 'Comment 2' },
    ];
    const { getByText, getAllByTestId } = render(
        <NoteProvider>
            <NoteList />
        </NoteProvider>
    );

    fireEvent.click(getByText(/Date/i));

    // Vérifiez si les notes sont dans l'ordre attendu après le tri
    const noteItems = getAllByTestId('note-item');
    expect(noteItems[0]).toHaveTextContent('Note 1');
    expect(noteItems[1]).toHaveTextContent('Note 2');
});

// Ajoutez des tests similaires pour le tri par grade
