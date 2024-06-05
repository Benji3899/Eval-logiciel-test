// src/store/useNoteStore.ts
import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Note {
    id: string;
    title: string;
    grade: number;
    comment: string;
    date: string;
}

interface NoteStore {
    notes: Note[];
    addNote: (title: string, grade: number, comment: string) => void;
    updateNote: (id: string, title: string, grade: number, comment: string) => void;
    removeNote: (id: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
    notes: [],
    addNote: (title, grade, comment) => {
        const newNote: Note = {
            id: uuidv4(),
            title,
            grade,
            comment,
            date: new Date().toISOString(),
        };
        set((state) => ({ notes: [...state.notes, newNote] }));
    },
    updateNote: (id, title, grade, comment) => {
        set((state) => ({
            notes: state.notes.map((note) =>
                note.id === id ? { ...note, title, grade, comment } : note
            ),
        }));
    },
    removeNote: (id) => {
        set((state) => ({
            notes: state.notes.filter((note) => note.id !== id),
        }));
    },
}));
