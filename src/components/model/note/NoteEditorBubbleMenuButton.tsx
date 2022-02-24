import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Editor } from '@tiptap/react';
import React, { useCallback } from 'react';

export type MarkName = 'bold' | 'italic' | 'underline' | 'strike' | 'code';

export type NoteEditorBubbleMenuButtonProps = Omit<
  IconButtonProps,
  'onClick'
> & {
  editor: Editor;
  mark: MarkName;
};

const NoteEditorBubbleMenuButton: React.VFC<
  NoteEditorBubbleMenuButtonProps
> = props => {
  const { editor, mark, ...iconButtonProps } = props;

  const handleClick = useCallback(() => {
    if (mark === 'code') {
      editor.chain().focus().toggleMark(mark).run();
    } else {
      editor.chain().focus().unsetCode().toggleMark(mark).run();
    }
  }, [editor, mark]);

  return (
    <IconButton
      {...iconButtonProps}
      disableRipple
      size='small'
      onClick={handleClick}
      sx={{
        backgroundColor: editor.isActive(mark) ? 'divider' : undefined,
        borderRadius: 0,
        '&:not(:last-child)': {
          mr: 1,
        },
        ...iconButtonProps.sx,
      }}
    />
  );
};

export default NoteEditorBubbleMenuButton;
