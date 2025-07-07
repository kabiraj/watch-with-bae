document.addEventListener('DOMContentLoaded', () => {

    //show media button
    console.log("popup loaded");
    chrome.tabs.query({active:true, currentWindow:true}, (tabs) =>{
        const tabId = tabs[0].id;
        chrome.storage.local.get(tabId.toString(), (result) => {
            const videoCount = result[tabId.toString()] || 0;
            document.getElementById('video-count').textContent = videoCount;
        });
    }); 


    document.getElementById("show-media").addEventListener("click", ()=>{
        console.log("show media clicked!");
        chrome.tabs.query({active:true, currentWindow:true}, (tabs) =>{
            const tabId = tabs[0].id;
            const key = tabId.toString() + '_urls';

            chrome.storage.local.get([key], (result)=>{
                const urlsArray = result[key] || [];
                console.log("Vidoes", urlsArray)
                chrome.tabs.sendMessage(tabId, {
                    action: "showOverlay"
                });
            })
        });
    });
})
