window.perfWatch = {};
window.chromeWindow = {};


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    window.perfWatch[sender.tab?.id!] = request.essential || null; 


    window.chromeWindow[sender.tab?.id!] = request.test || null;

    
    
});


export {};