// src/components/NoteEditForm.tsx
import React, { useState, useEffect } from 'react';
import { useNoteStore } from '../contexts/NoteContext';
import { Note } from '../interfaces/Note';

interface NoteEditFormProps {
  note: Note;
  onCancel: () => void;
}

const NoteEditForm: React.FC<NoteEditFormProps> = ({ note, onCancel }) => {
  const { updateNote } = useNoteStore();
  const [title, setTitle] = useState(note.title);
  const [grade, setGrade] = useState(note.grade);
  const [comment, setComment] = useState(note.comment);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateNote(note.id, title, grade, comment);
    onCancel(); // Close the edit form after updating
  };

  return (
    <form onSubmit={handleUpdate}>
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
      <button type="submit">Update Note</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NoteEditForm;
