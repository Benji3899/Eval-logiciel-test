// src/components/NoteList.tsx
import React, { useState } from 'react';
import { useNotes } from '../contexts/NoteContext';
import NoteItem from './NoteItem';

const NoteList: React.FC = () => {
    const { notes, sortByDate, sortByGrade } = useNotes();
    const [sortBy, setSortBy] = useState<'date' | 'grade'>('date'); // State to track sorting option

    const handleSortByDate = () => {
        setSortBy('date');
        sortByDate();
    };

    const handleSortByGrade = () => {
        setSortBy('grade');
        sortByGrade();
    };

    return (
        <div>
            <div>
                Sort by:
                <button onClick={handleSortByDate}>Date</button>
                <button onClick={handleSortByGrade}>Grade</button>
            </div>
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


