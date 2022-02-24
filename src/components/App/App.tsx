import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { RecoilRoot } from 'recoil';
import NoteEditor from '@/components/model/note/NoteEditor';
import { useSelectedNote } from '@/hooks/noteHooks';
import Layout from '@/components/Layout';

export type AppProps = {
  popup?: boolean;
};

const App: React.VFC<AppProps> = React.memo(props => {
  return (
    <RecoilRoot>
      <AppContent {...props} />
    </RecoilRoot>
  );
});

App.displayName = 'App';

export default App;

const AppContent: React.VFC<AppProps> = React.memo(props => {
  const { popup } = props;

  const note = useSelectedNote();

  return (
    <Layout popup={popup}>
      <Box display={note ? undefined : 'none'}>
        <NoteEditor note={note} />
      </Box>
      {!note && (
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'divider',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='h5'
            sx={{
              color: theme => theme.palette.text.disabled,
              textAlign: 'center',
            }}
          >
            Please select a note.
          </Typography>
        </Box>
      )}
    </Layout>
  );
});

AppContent.displayName = 'AppContent';
