import React from 'react';
import { RecoilRoot } from 'recoil';
import NoteList from '../model/note/NoteList';
import NoteEditor from '../model/note/NoteEditor';

const App: React.VFC = React.memo(() => {
  return (
    <RecoilRoot>
      <div>
        <div>
          <NoteList />
        </div>
        <div>
          <NoteEditor />
        </div>
      </div>
    </RecoilRoot>
  );
});

App.displayName = 'App';

export default App;
