// Map to track detected video URLs per tab (tabId => Set of URLs)
const tabVideos = new Map();

// Listen for completed network requests in all tabs
chrome.webRequest.onCompleted.addListener(
    (details) => {
        const url = details.url;
        const tabId = details.tabId;

        // Only process video playlist or file URLs
        if(url.includes('.m3u8') || url.includes('.mp4')){
            // If this tab hasn't been seen before, initialize its Set
            if(!tabVideos.has(tabId)){
                tabVideos.set(tabId, new Set());
            }
            // Use the base URL (folder) to group video fragments
            const baseURL = url.substring(0, url.lastIndexOf('/') + 1);
            tabVideos.get(tabId).add(baseURL);

            // Get the current count of unique video sources for this tab
            const count = tabVideos.get(tabId).size;
            const urlsArray = Array.from(tabVideos.get(tabId));
            
            // Update the badge on the extension icon for this tab
            chrome.action.setBadgeText({
                text: count.toString(),
                tabId: tabId
            });
            // Save the count to storage so the popup can access it
            chrome.storage.local.set({ [tabId.toString()]: count });
            chrome.storage.local.set({ [tabId.toString() + '_urls']: urlsArray });
        }
    },
    { urls: ["<all_urls>"] }
);

// Listen for navigation events (when a new page loads in a tab)
chrome.webNavigation.onCommitted.addListener((details) => {
    // Only reset for the main frame (not iframes)
    if (details.frameId === 0) {
        const tabId = details.tabId;
        // Reset the video set for this tab
        tabVideos.set(tabId, new Set());
        // Clear the badge for this tab
        chrome.action.setBadgeText({ text: '', tabId: tabId });
        // Reset the count in storage for this tab
        chrome.storage.local.set({ [tabId.toString()]: 0 });
    }
});

// Clean up when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    tabVideos.delete(tabId);
});