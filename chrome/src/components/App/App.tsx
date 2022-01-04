import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const App: React.VFC = React.memo(() => {
  const [text, setText] = useState<string>('');

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    },
    [],
  );

  const handleClickSave = useCallback(async () => {
    console.info('Saved:', text);
  }, [text]);

  return (
    <div>
      <TextField multiline value={text} onChange={handleChangeText} />
      <Button onClick={handleClickSave}>Save</Button>
    </div>
  );
});

App.displayName = 'App';

export default App;
