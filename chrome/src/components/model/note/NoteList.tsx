import React, { useCallback } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { useNotes } from '../../../hooks/noteHooks';
import { useCreateNote, useSelectNote } from '../../../hooks/noteHooks';
import NoteListItem from './NoteListItem';

const NoteList: React.VFC = React.memo(() => {
  const notes = useNotes();

  const { selectNote } = useSelectNote();
  const { createNote } = useCreateNote();

  const handleClickNew = useCallback(() => {
    createNote({ body: '' }).then(note => {
      selectNote(note);
    });
  }, [createNote, selectNote]);

  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClickNew}>
          <AddIcon />
          <ListItemText primary='New Note' />
        </ListItemButton>
      </ListItem>
      <Divider />
      {notes.map(note => (
        <React.Fragment key={note.id}>
          <NoteListItem note={note} />
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
});

NoteList.displayName = 'NoteList';

export default NoteList;
