import React, { useCallback, useEffect, useState } from 'react';
import { LocalStorage } from '../../lib/localStorage';
import NoteList from '../model/note/NoteList';
import NoteEditor from '../model/note/NoteEditor';
import { Note } from '../../models/note';

const App: React.VFC = React.memo(() => {
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(
    LocalStorage.getSelectedNoteId(),
  );

  const handleCreatedNote = useCallback((note: Note) => {
    console.log('created:', note);
    setSelectedNoteId(note.id || null);
  }, []);

  const handleSelectNote = useCallback((note: Note) => {
    setSelectedNoteId(note.id || null);
  }, []);

  useEffect(() => {
    LocalStorage.setSelectedNoteId(selectedNoteId);
  }, [selectedNoteId]);

  return (
    <div>
      <div>
        <NoteList selectedId={selectedNoteId} onSelect={handleSelectNote} />
      </div>
      <div>
        <NoteEditor id={selectedNoteId} onCreated={handleCreatedNote} />
      </div>
    </div>
  );
});

App.displayName = 'App';

export default App;
