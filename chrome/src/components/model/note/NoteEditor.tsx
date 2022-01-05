import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  useCreateNote,
  useUpdateNote,
  useSelectNote,
  useSelectedNote,
} from '../../../hooks/noteHooks';
import './NoteEditor.scss';

const NoteEditor: React.VFC = React.memo(() => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  const note = useSelectedNote();

  const { createNote } = useCreateNote();
  const { updateNote } = useUpdateNote();
  const { selectNote } = useSelectNote();

  const handleClickSave = useCallback(() => {
    if (!editor) return;

    if (note == null) {
      // new
      createNote({ body: editor.getHTML() }).then(note => {
        selectNote(note);
      });
    } else {
      // edit
      if (!note.id) return;
      updateNote(note.id, { body: editor.getHTML() });
    }
  }, [createNote, editor, note, selectNote, updateNote]);

  useEffect(() => {
    if (!editor) return;
    if (!note) return;
    if (editor.getHTML() !== note.body) {
      editor.commands.setContent(note.body);
    }
  }, [editor, note]);

  return <EditorContent className='note-editor' editor={editor} />;
});

NoteEditor.displayName = 'NoteEditor';

export default NoteEditor;
