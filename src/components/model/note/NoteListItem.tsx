import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { formatRelative } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelectNote, useSelectedNote } from '@/hooks/noteHooks';
import { Note } from '@/models/note';
import NoteDeleteConfirmDialog from './NoteDeleteConfirmDialog';

export type NoteListItemProps = {
  note: Note;
};

const NoteListItem: React.VFC<NoteListItemProps> = React.memo(props => {
  const { note } = props;

  const [deleteConfirming, setDeleteConfirming] = useState<boolean>(false);

  const selectedNote = useSelectedNote();
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
    selectNote(note);
    setDeleteConfirming(true);
  }, [note, selectNote]);

  const handleCloseDeleteConfirm = useCallback(() => {
    setDeleteConfirming(false);
  }, []);

  return (
    <>
      <NoteDeleteConfirmDialog
        note={note}
        open={deleteConfirming}
        onClose={handleCloseDeleteConfirm}
      />

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
                color: isEmpty
                  ? theme => theme.palette.text.disabled
                  : undefined,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            }}
            secondary={formatRelative(note.updatedAt, new Date())}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
});

NoteListItem.displayName = 'NoteListItem';

export default NoteListItem;
