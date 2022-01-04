import React, { useCallback } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
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
          <NoteListItem
            note={note}
            selected={selectedId === note.id}
            onSelect={onSelect}
          />
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
});

NoteList.displayName = 'NoteList';

export default NoteList;
