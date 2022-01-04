import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  useCreateNote,
  useUpdateNote,
  useSelectNote,
  useSelectedNote,
} from '../../../hooks/noteHooks';

const NoteEditor: React.VFC = React.memo(() => {
  const [body, setBody] = useState<string>('');

  const note = useSelectedNote();

  const { createNote } = useCreateNote();
  const { updateNote } = useUpdateNote();
  const { selectNote } = useSelectNote();

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
        selectNote(note);
      });
    } else {
      // edit
      if (!note.id) return;
      updateNote(note.id, { body });
    }
  }, [body, createNote, note, selectNote, updateNote]);

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
