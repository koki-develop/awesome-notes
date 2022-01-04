import React, { useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
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
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton onClick={handleClickDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton selected={selected} onClick={handleClickItem}>
        <ListItemText primary={note.body} />
      </ListItemButton>
    </ListItem>
  );
});

NoteListItem.displayName = 'NoteListItem';

export default NoteListItem;
