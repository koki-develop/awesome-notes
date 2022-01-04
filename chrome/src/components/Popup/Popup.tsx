import React, { useCallback } from 'react';

const Popup: React.VFC = React.memo(() => {
  const handleClickOpenApp = useCallback(() => {
    const url = chrome.runtime.getURL('app.html');
    chrome.tabs.create({ url });
  }, []);

  return (
    <div>
      <h1>Popup</h1>
      <button onClick={handleClickOpenApp}>Open App</button>
    </div>
  );
});

Popup.displayName = 'Popup';

export default Popup;
