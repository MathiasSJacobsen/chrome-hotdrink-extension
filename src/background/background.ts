import { DOMMessageResponse } from "../types";

window.chromeWindow = {};

chrome.runtime.onMessage.addListener(function(request:DOMMessageResponse, sender, sendResponse) { 
    window.chromeWindow[sender.tab?.id!] = request.constraintSystem || null;
});


export {};