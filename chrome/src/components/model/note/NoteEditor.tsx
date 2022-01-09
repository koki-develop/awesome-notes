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
  const [content, setContent] = useState<Pick<Note, 'title' | 'body'>>({
    title: note.title,
    body: note.body,
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: content.body,
    onUpdate({ editor }) {
      const title = editor.getText().trim().split('\n')[0].slice(0, 50);
      setContent({ title, body: editor.getHTML() });
    },
  });

  const { updateNote } = useUpdateNote();

  // ノートを選択時
  useEffect(() => {
    if (!editor) return;
    setContent({ title: note.title, body: note.body });
    editor.chain().setContent(note.body).focus().run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  // 内容更新時
  useEffect(() => {
    if (note.title === content.title && note.body === content.body) return;
    updateNote(note.id, content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, updateNote]);

  return <EditorContent className='note-editor' editor={editor} />;
});

NoteEditor.displayName = 'NoteEditor';

export default NoteEditor;
