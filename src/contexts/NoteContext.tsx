// src/contexts/NoteContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Note } from '../interfaces/Note';
import { v4 as uuidv4 } from 'uuid';

interface NoteContextProps {
    notes: Note[];
    addNote: (title: string, grade: number, comment: string) => void;
    updateNote: (id: string, title: string, grade: number, comment: string) => void;
    removeNote: (id: string) => void;
    sortByDate: () => void;
    sortByGrade: () => void;
}

const NoteContext = createContext<NoteContextProps | undefined>(undefined);

export const useNoteStore = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNotes must be used within a NoteProvider');
    }
    return context;
};

export const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (title: string, grade: number, comment: string) => {
        const newNote: Note = {
            id: uuidv4(),
            title,
            grade,
            comment,
            date: new Date().toISOString(),
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    const updateNote = (id: string, title: string, grade: number, comment: string) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, title, grade, comment } : note
            )
        );
    };

    const removeNote = (id: string) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const sortByDate = () => {
        setNotes((prevNotes) =>
            [...prevNotes].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        );
    };

    const sortByGrade = () => {
        setNotes((prevNotes) =>
            [...prevNotes].sort((a, b) => a.grade - b.grade)
        );
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, updateNote, removeNote, sortByDate, sortByGrade }}>
            {children}
        </NoteContext.Provider>
    );
};
