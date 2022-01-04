import React, { useCallback } from 'react';
import { useDeleteNote } from '../../../hooks/noteHooks';
import { Note } from '../../../models/note';

export type NoteListItemProps = {
  note: Note;
  selected: boolean;

  onSelect: (note: Note) => void;
};

const NoteListItem: React.VFC<NoteListItemProps> = React.memo(props => {
  const { note, selected, onSelect } = props;

  const { deleteNote } = useDeleteNote();

  const handleClickItem = useCallback(() => {
    onSelect(note);
  }, [note, onSelect]);

  const handleClickDelete = useCallback(() => {
    if (!note.id) return;
    deleteNote(note.id);
  }, [deleteNote, note.id]);

  return (
    <li>
      <span
        onClick={handleClickItem}
        style={{ fontWeight: selected ? 'bold' : undefined }}
      >
        {note.body.slice(0, 10)}
        {note.body.length > 10 ? '...' : null}
      </span>
      <button onClick={handleClickDelete}>delete</button>
    </li>
  );
});

NoteListItem.displayName = 'NoteListItem';

export default NoteListItem;
