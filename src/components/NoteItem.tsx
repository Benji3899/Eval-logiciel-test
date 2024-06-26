// src/components/NoteItem.tsx
import React, { useState } from 'react';
import { Note } from '../interfaces/Note';
import { useNoteStore } from '../contexts/NoteContext';
import NoteEditForm from './NoteEditForm';

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { removeNote } = useNoteStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsConfirming(true);
  };

  const confirmDelete = () => {
    removeNote(note.id);
    setIsConfirming(false);
  };

  const cancelDelete = () => {
    setIsConfirming(false);
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
              <button onClick={handleDelete}>Delete</button>
            </>
        )}
        {isConfirming && (
            <div>
              <p>Are you sure you want to delete this note?</p>
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
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
