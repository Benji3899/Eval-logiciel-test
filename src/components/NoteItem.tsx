// src/components/NoteItem.tsx
import React, { useState } from 'react';
import { Note } from '../interfaces/Note';
import { useNotes } from '../contexts/NoteContext';
import NoteEditForm from './NoteEditForm';

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { removeNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div style={{ backgroundColor: getBackgroundColor(note.grade) }}>
      {isEditing ? (
        <NoteEditForm note={note} onCancel={handleCancelEdit} />
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.grade}/20</p>
          <p>{note.comment}</p>
          <p>{new Date(note.date).toLocaleDateString()}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => removeNote(note.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

const getBackgroundColor = (grade: number): string => {
  if (grade < 8) return 'red';
  if (grade < 10) return 'orange';
  if (grade < 13) return 'yellow';
  return 'green';
};

export default NoteItem;
