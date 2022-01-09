import React, { useCallback, useMemo } from 'react';
import { formatRelative } from 'date-fns';
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

  const isEmpty = useMemo(() => {
    return note.title === '';
  }, [note.title]);

  const handleClickItem = useCallback(() => {
    selectNote(note);
  }, [note, selectNote]);

  const handleClickDelete = useCallback(() => {
    deleteNote(note.id);
    if (selectedNote?.id === note.id) {
      selectNote(null);
    }
  }, [deleteNote, note.id, selectNote, selectedNote?.id]);

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
          primary={isEmpty ? 'New Note' : note.title}
          primaryTypographyProps={{
            sx: {
              color: isEmpty ? theme => theme.palette.text.disabled : undefined,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
          secondary={formatRelative(note.updatedAt, new Date())}
        />
      </ListItemButton>
    </ListItem>
  );
});

NoteListItem.displayName = 'NoteListItem';

export default NoteListItem;
