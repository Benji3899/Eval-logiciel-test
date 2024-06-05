// src/App.tsx
import React from 'react';
import { NoteProvider } from './contexts/NoteContext';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App: React.FC = () => {
    return (
        <NoteProvider>
            <div>
                <h1>Note Manager</h1>
                <NoteForm />
                <NoteList />
            </div>
        </NoteProvider>
    );
};

export default App;
