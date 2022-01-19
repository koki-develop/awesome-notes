import React, { useCallback, useEffect, useState } from 'react';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { useEditor, EditorContent } from '@tiptap/react';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Underline from '@tiptap/extension-underline';
import { useUpdateNote } from '@/hooks/noteHooks';
import { Note } from '@/models/note';
import NoteEditorBubbleMenu from './NoteEditorBubbleMenu';
import NoteEditorTrailingNodeExtension from './NoteEditorTrailingNodeExtension';
import './NoteEditor.scss';

const getPlaceholder = (node: ProsemirrorNode): string => {
  switch (node.type.name) {
    case 'heading':
      return `Heading${node.attrs.level}`;
    default:
      return '';
  }
};

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
    extensions: [
      Link.configure({
        autolink: true,
        linkOnPaste: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => getPlaceholder(node),
      }),
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Underline,
      NoteEditorTrailingNodeExtension,
    ],
    content: content.body,
    onUpdate({ editor }) {
      const title = editor.getText().trim().split('\n')[0].slice(0, 50);
      setContent({ title, body: editor.getHTML() });
    },
  });

  const { updateNote } = useUpdateNote();

  const handleClickBold = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const handleClickItalic = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const handleClickUnderline = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const handleClickStrikethrough = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const handleClickCode = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    editor.commands.focus();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    editor
      .chain()
      .setContent(note.body)
      .focus()
      .setTextSelection(0)
      .setMeta('addToHistory', false)
      .run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  useEffect(() => {
    if (note.title === content.title && note.body === content.body) return;
    const timeoutId = setTimeout(() => {
      updateNote(note.id, content);
    }, 200);
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, updateNote]);

  return (
    <>
      {editor && <NoteEditorBubbleMenu editor={editor} />}
      <EditorContent className='note-editor' editor={editor} />
    </>
  );
});

NoteEditor.displayName = 'NoteEditor';

export default NoteEditor;
