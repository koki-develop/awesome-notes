import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useUpdateNote } from '@/hooks/noteHooks';
import { Note } from '@/models/note';
import './NoteEditor.scss';

export type NoteEditorProps = {
  note: Note;
};

const NoteEditor: React.VFC<NoteEditorProps> = React.memo(props => {
  const { note } = props;
  const [body, setBody] = useState<string>(note.body);
  const [editing, setEditing] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: body,
    onUpdate({ editor }) {
      setBody(editor.getHTML());
    },
    onFocus() {
      setEditing(true);
    },
    onBlur() {
      setEditing(false);
    },
  });

  const { updateNote } = useUpdateNote();

  // ノートを選択時
  useEffect(() => {
    if (!editor) return;
    if (editing) return;
    if (editor.getHTML() === note.body) return;
    setBody(note.body);
    editor.chain().setContent(note.body).focus().run();
  }, [editing, editor, note]);

  // 内容更新時
  useEffect(() => {
    if (note.body === body) return;
    if (!note.id) return;
    updateNote(note.id, { body });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, updateNote]);

  return <EditorContent className='note-editor' editor={editor} />;
});

NoteEditor.displayName = 'NoteEditor';

export default NoteEditor;
