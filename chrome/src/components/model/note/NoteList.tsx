import React, { useCallback } from 'react';
import { useNotes } from '../../../hooks/noteHooks';
import { Note } from '../../../models/note';
import { useCreateNote } from '../../../hooks/noteHooks';
import NoteListItem from './NoteListItem';

export type NoteListProps = {
  selectedId: number | null;

  onSelect: (note: Note) => void;
};

const NoteList: React.VFC<NoteListProps> = React.memo(props => {
  const { selectedId, onSelect } = props;

  const notes = useNotes();
  const { createNote } = useCreateNote();

  const handleClickNew = useCallback(() => {
    createNote({ body: '' }).then(note => {
      onSelect(note);
    });
  }, [createNote, onSelect]);

  return (
    <ul>
      {notes.map(note => (
        <NoteListItem
          key={note.id}
          note={note}
          selected={selectedId === note.id}
          onSelect={onSelect}
        />
      ))}
      <li>
        <button onClick={handleClickNew}>New</button>
      </li>
    </ul>
  );
});

NoteList.displayName = 'NoteList';

export default NoteList;
