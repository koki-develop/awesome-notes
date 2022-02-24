import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback } from 'react';
import { useDeleteNote, useSelectNote } from '@/hooks/noteHooks';
import { Note } from '@/models/note';

export type NoteDeleteConfirmDialogProps = {
  note: Note;
  open: boolean;
  onClose: () => void;
};

const NoteDeleteConfirmDialog: React.VFC<NoteDeleteConfirmDialogProps> =
  React.memo(props => {
    const { note, open, onClose } = props;

    const { deleteNote } = useDeleteNote();
    const { selectNote } = useSelectNote();

    const handleConfirmDelete = useCallback(() => {
      deleteNote(note.id).then(() => {
        onClose();
        selectNote(null);
      });
    }, [deleteNote, note.id, onClose, selectNote]);

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Are you sure you want to delete this note permanently?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This operation cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant='contained'
            color='error'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  });

NoteDeleteConfirmDialog.displayName = 'NoteDeleteConfirmDialog';

export default NoteDeleteConfirmDialog;
