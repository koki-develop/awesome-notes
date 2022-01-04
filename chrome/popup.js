(async () => {
  const url = chrome.runtime.getURL("app.html");
  await chrome.tabs.create({ url });
})();
