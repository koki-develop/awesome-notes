import React, { useCallback, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useDeleteNote,
  useSelectNote,
  useSelectedNote,
} from '@/hooks/noteHooks';
import { Note } from '@/models/note';

export type NoteListItemProps = {
  note: Note;
};

const NoteListItem: React.VFC<NoteListItemProps> = React.memo(props => {
  const { note } = props;

  const selectedNote = useSelectedNote();
  const { deleteNote } = useDeleteNote();
  const { selectNote } = useSelectNote();

  const selected = useMemo(() => {
    return selectedNote?.id === note.id;
  }, [note.id, selectedNote?.id]);

  const handleClickItem = useCallback(() => {
    selectNote(note);
  }, [note, selectNote]);

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
      <ListItemButton
        selected={selected}
        onClick={handleClickItem}
        sx={{ overflow: 'hidden' }}
      >
        <ListItemText
          primary={note.body}
          primaryTypographyProps={{
            sx: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
});

NoteListItem.displayName = 'NoteListItem';

export default NoteListItem;
