import React from 'react';
import { RecoilRoot } from 'recoil';
import { useSelectedNote } from '@/hooks/noteHooks';
import Layout from '@/components/Layout';
import NoteEditor from '@/components/model/note/NoteEditor';

const App: React.VFC = React.memo(() => {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
});

App.displayName = 'App';

export default App;

const AppContent: React.VFC = React.memo(() => {
  const note = useSelectedNote();

  return <Layout>{note && <NoteEditor note={note} />}</Layout>;
});

AppContent.displayName = 'AppContent';
