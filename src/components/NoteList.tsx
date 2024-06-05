// src/components/NoteList.tsx
import React from 'react';
import { useNotes } from '../contexts/NoteContext';
import NoteItem from './NoteItem';

const NoteList: React.FC = () => {
    const { notes } = useNotes();

    return (
        <div>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <NoteItem key={note.id} note={note} />
                ))
            ) : (
                <p>No notes available.</p>
            )}
        </div>
    );
};

export default NoteList;
