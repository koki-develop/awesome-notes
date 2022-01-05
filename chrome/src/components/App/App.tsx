import React from 'react';
import { RecoilRoot } from 'recoil';
import Layout from '../Layout';
import NoteEditor from '../model/note/NoteEditor';

const App: React.VFC = React.memo(() => {
  return (
    <RecoilRoot>
      <Layout>
        <div>
          <NoteEditor />
        </div>
      </Layout>
    </RecoilRoot>
  );
});

App.displayName = 'App';

export default App;
