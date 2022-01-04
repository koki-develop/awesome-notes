import React from 'react';

const App: React.VFC = React.memo(() => {
  return (
    <div>
      <h1>Application</h1>
    </div>
  );
});

App.displayName = 'App';

export default App;
