// src/components/NoteForm.tsx
import React, { useState } from 'react';
import { useNoteStore } from '../contexts/NoteContext';

const NoteForm: React.FC = () => {
    const { addNote } = useNoteStore();
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState<number | ''>('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (typeof grade === 'number') {
            addNote(title, grade, comment);
            setTitle('');
            setGrade('');
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Grade:</label>
                <input
                    type="number"
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Comment:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <button type="submit">Add Note</button>
        </form>
    );
};

export default NoteForm;
