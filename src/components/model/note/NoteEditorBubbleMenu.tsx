import CodeIcon from '@mui/icons-material/Code';
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import UnderlineIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughIcon from '@mui/icons-material/StrikethroughS';
import Paper from '@mui/material/Paper';
import { BubbleMenu, Editor } from '@tiptap/react';
import { EditorState } from 'prosemirror-state';
import React, { useCallback } from 'react';
import NoteEditorBubbleMenuButton from './NoteEditorBubbleMenuButton';

export type NoteEditorBubbleMenuProps = {
  editor: Editor;
};

const NoteEditorBubbleMenu: React.VFC<NoteEditorBubbleMenuProps> = props => {
  const { editor } = props;

  const shouldShowMenu = useCallback((props: { state: EditorState }) => {
    const { state } = props;
    if (state.selection.empty) return false;
    const { content } = state.selection.content();

    for (let i = 0; i < content.childCount; i++) {
      const node = content.child(i);
      if (!['horizontalRule'].includes(node.type.name)) {
        return true;
      }
    }
    return false;
  }, []);

  return (
    <BubbleMenu editor={editor} shouldShow={shouldShowMenu}>
      <Paper sx={{ p: 1 }}>
        <NoteEditorBubbleMenuButton editor={editor} mark={'bold'}>
          <BoldIcon />
        </NoteEditorBubbleMenuButton>
        <NoteEditorBubbleMenuButton editor={editor} mark={'italic'}>
          <ItalicIcon />
        </NoteEditorBubbleMenuButton>
        <NoteEditorBubbleMenuButton editor={editor} mark={'underline'}>
          <UnderlineIcon />
        </NoteEditorBubbleMenuButton>
        <NoteEditorBubbleMenuButton editor={editor} mark={'strike'}>
          <StrikethroughIcon />
        </NoteEditorBubbleMenuButton>
        <NoteEditorBubbleMenuButton editor={editor} mark={'code'}>
          <CodeIcon />
        </NoteEditorBubbleMenuButton>
      </Paper>
    </BubbleMenu>
  );
};

export default NoteEditorBubbleMenu;
