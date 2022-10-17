/*
import { DOMMessage, DOMMessageResponse } from "../types"; 
 
 // Function called when a new message is received
const messagesFromReactAppListener = (
   msg: DOMMessage,
   sender: chrome.runtime.MessageSender,
   sendResponse: (response: DOMMessageResponse) => void) => {

   console.log('[content.js]. Message received', msg);
    console.log(window.constraintSystem);
    //console.log('The background page is: ', chrome.extension.getBackgroundPage);
    

 
   const headlines = Array.from(document.getElementsByTagName<"h1">("h1"))
                       .map(h1 => h1.innerText);
    // Prepare the response object with information about the site
   const response: DOMMessageResponse = {
       title: 'hei',//document.title,
       headlines,
       test: window.performance
   };
 
   sendResponse(response);
}


 
/**
* Fired when a message is sent from either an extension process or a content script.
*/
/*
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

export {};ç

*/

import { DOMMessageResponse } from "../types";

function injectScript(file_path: string, tag: string) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

injectScript(chrome.extension.getURL('./static/js/injectScript.js'), 'body');


window.addEventListener('message', function(event) {
    if (event.data.type && (event.data.type === "GET_CONSTRAINT_SYSTEM")) {        
        chrome.runtime.sendMessage<DOMMessageResponse>({type: event.data.type, constraintSystem: event.data.constraintSystem});
    }});
    
export {}   

