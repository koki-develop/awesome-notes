import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import React from 'react';

export type NoteEditorBubbleMenuButtonProps = IconButtonProps & {
  active?: boolean;
};

const NoteEditorBubbleMenuButton: React.VFC<NoteEditorBubbleMenuButtonProps> =
  React.memo(props => {
    const { active, ...iconButtonProps } = props;

    return (
      <IconButton
        {...iconButtonProps}
        disableRipple
        size='small'
        sx={{
          backgroundColor: active ? 'divider' : undefined,
          borderRadius: 0,
          '&:not(:last-child)': {
            mr: 1,
          },
          ...iconButtonProps.sx,
        }}
      />
    );
  });

NoteEditorBubbleMenuButton.displayName = 'NoteEditorBubbleMenuButton';

export default NoteEditorBubbleMenuButton;
