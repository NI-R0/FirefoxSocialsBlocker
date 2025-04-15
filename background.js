// Triggered when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && isBlockedUrl(changeInfo.url)) {
        chrome.tabs.update(tabId, { url: "https://www.tagesschau.de/archiv/allemeldungen" });
    }
});

// Triggered when user switches to a tab
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab.url && isBlockedUrl(tab.url)) {
            chrome.tabs.update(tab.id, { url: "https://www.tagesschau.de/archiv/allemeldungen" });
        }
    });
});
