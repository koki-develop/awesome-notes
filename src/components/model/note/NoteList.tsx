import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import List, { ListProps } from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { useCallback } from 'react';
import NoteListItem from '@/components/model/note/NoteListItem';
import { useNotes , useCreateNote, useSelectNote } from '@/hooks/noteHooks';

export type NoteListProps = ListProps;

const NoteList: React.VFC<NoteListProps> = React.memo(props => {
  const notes = useNotes();

  const { selectNote } = useSelectNote();
  const { createNote } = useCreateNote();

  const handleClickNew = useCallback(() => {
    createNote({ title: '', body: '' }).then(note => {
      selectNote(note);
    });
  }, [createNote, selectNote]);

  return (
    <List disablePadding {...props}>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClickNew}>
          <AddIcon />
          <ListItemText primary='New' />
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
