chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    if(window === window.top){
        if(request.action === "showOverlay"){
            if(!document.getElementById("watchwithbae-overlay")){
                showOverlay();
            }
        }
    }else{
        console.log("skippping overlay creating");
    }

});

function showOverlay() {
    const host = document.createElement('div');
    host.id = 'watchwithbae-overlay';
    host.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background-color: rgba(0, 0, 0, 0.5) !important;
        z-index: 99999 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    `;
    
    const shadow = host.attachShadow({ mode: 'open' });
    document.body.appendChild(host);

    fetch(chrome.runtime.getURL('overlay.html'))
    .then(res => res.text())
    .then(html => {
        shadow.innerHTML = html;
        return fetch(chrome.runtime.getURL('styles/overlay.css'));
    })
    .then(res => res.text())
    .then(css => {
        const style = document.createElement('style');
        style.textContent = css;
        shadow.appendChild(style);
    });
}


// function showOverlay(){
//     fetch(chrome.runtime.getURL('overlay.html'))
//     .then(response => response.text())
//     .then(html => {document.body.insertAdjacentHTML('beforeend', html)
//         const link = document.createElement('link')
//         link.rel = 'stylesheet';
//         link.href = chrome.runtime.getURL('styles/overlay.css');
//         document.head.appendChild(link)
//     });

// }