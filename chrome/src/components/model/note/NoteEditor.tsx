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
  const [editing, setEditing] = useState<boolean>(false);
  const [inputting, setInputting] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: body,
    onUpdate({ editor }) {
      setInputting(true);
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

  // 入力時
  useEffect(() => {
    if (!inputting) return;
    const timeoutId = setTimeout(() => {
      setInputting(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputting]);

  // 内容更新時
  useEffect(() => {
    if (!inputting) return;
    if (note.body === body) return;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    updateNote(note.id!, { body });
  }, [body, inputting, note.body, note.id, updateNote]);

  return <EditorContent className='note-editor' editor={editor} />;
});

NoteEditor.displayName = 'NoteEditor';

export default NoteEditor;
