import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useUpdateNote } from '../../../hooks/noteHooks';
import './NoteEditor.scss';
import { Note } from '../../../models/note';

export type NoteEditorProps = {
  note: Note;
};

const NoteEditor: React.VFC<NoteEditorProps> = React.memo(props => {
  const { note } = props;
  const [body, setBody] = useState<string>(note.body);

  const editor = useEditor({
    extensions: [StarterKit],
    content: body,
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
  });

  const { updateNote } = useUpdateNote();

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== note.body) {
      setBody(note.body);
      editor.chain().setContent(note.body).focus().run();
    }
  }, [editor, note]);

  useEffect(() => {
    if (note.body === body) return;
    const timeoutId = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      updateNote(note.id!, { body });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [body, note, updateNote]);

  return <EditorContent className='note-editor' editor={editor} />;
});

NoteEditor.displayName = 'NoteEditor';

export default NoteEditor;
