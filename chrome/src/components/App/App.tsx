import React from 'react';
import { RecoilRoot } from 'recoil';
import { useSelectedNote } from '@/hooks/noteHooks';
import Layout from '@/components/Layout';
import NoteEditor from '@/components/model/note/NoteEditor';

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

  return <Layout popup={popup}>{note && <NoteEditor note={note} />}</Layout>;
});

AppContent.displayName = 'AppContent';
