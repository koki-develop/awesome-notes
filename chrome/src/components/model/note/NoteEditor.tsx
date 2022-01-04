import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Note } from '../../../models/note';
import {
  useNote,
  useCreateNote,
  useUpdateNote,
} from '../../../hooks/noteHooks';

export type NoteEditorProps = {
  id: number | null;
  onCreated: (note: Note) => void;
};

const NoteEditor: React.VFC<NoteEditorProps> = React.memo(props => {
  const [body, setBody] = useState<string>('');

  const { id, onCreated } = props;
  const note = useNote(id);

  const { createNote } = useCreateNote();
  const { updateNote } = useUpdateNote();

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBody(e.currentTarget.value);
    },
    [],
  );

  const handleClickSave = useCallback(() => {
    if (note == null) {
      // new
      createNote({ body }).then(note => {
        onCreated(note);
      });
    } else {
      // edit
      if (!note.id) return;
      updateNote(note.id, { body });
    }
  }, [body, createNote, note, onCreated, updateNote]);

  useEffect(() => {
    setBody(note?.body ?? '');
  }, [note?.body]);

  return (
    <div>
      <TextField multiline value={body} onChange={handleChangeText} />
      <Button onClick={handleClickSave}>Save</Button>
    </div>
  );
});

NoteEditor.displayName = 'NoteEditor';

export default NoteEditor;
