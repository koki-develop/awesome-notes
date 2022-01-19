import React, { useCallback } from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import BoldIcon from '@mui/icons-material/FormatBold';
import CodeIcon from '@mui/icons-material/Code';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughIcon from '@mui/icons-material/StrikethroughS';
import UnderlineIcon from '@mui/icons-material/FormatUnderlined';

export type NoteEditorBubbleMenuProps = {
  editor: Editor;
};

const NoteEditorBubbleMenu: React.VFC<NoteEditorBubbleMenuProps> = props => {
  const { editor } = props;

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

  return (
    <BubbleMenu editor={editor}>
      <Paper sx={{ p: 1 }}>
        <IconButton
          disableRipple
          onClick={handleClickBold}
          size='small'
          sx={{
            backgroundColor: editor.isActive('bold') ? 'divider' : undefined,
            borderRadius: 0,
            '&:not(:last-child)': {
              mr: 1,
            },
          }}
        >
          <BoldIcon />
        </IconButton>
        <IconButton
          disableRipple
          onClick={handleClickItalic}
          size='small'
          sx={{
            backgroundColor: editor.isActive('italic') ? 'divider' : undefined,
            borderRadius: 0,
            '&:not(:last-child)': {
              mr: 1,
            },
          }}
        >
          <ItalicIcon />
        </IconButton>
        <IconButton
          disableRipple
          onClick={handleClickUnderline}
          size='small'
          sx={{
            backgroundColor: editor.isActive('underline')
              ? 'divider'
              : undefined,
            borderRadius: 0,
            '&:not(:last-child)': {
              mr: 1,
            },
          }}
        >
          <UnderlineIcon />
        </IconButton>
        <IconButton
          disableRipple
          onClick={handleClickStrikethrough}
          size='small'
          sx={{
            backgroundColor: editor.isActive('strike') ? 'divider' : undefined,
            borderRadius: 0,
            '&:not(:last-child)': {
              mr: 1,
            },
          }}
        >
          <StrikethroughIcon />
        </IconButton>
        <IconButton
          disableRipple
          onClick={handleClickCode}
          size='small'
          sx={{
            backgroundColor: editor.isActive('code') ? 'divider' : undefined,
            borderRadius: 0,
            '&:not(:last-child)': {
              mr: 1,
            },
          }}
        >
          <CodeIcon />
        </IconButton>
      </Paper>
    </BubbleMenu>
  );
};

// NoteEditorBubbleMenu.displayName = 'NoteEditorBubbleMenu';

export default NoteEditorBubbleMenu;
