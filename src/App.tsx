import React from 'react';  
import { DOMMessage, DOMMessageResponse } from './types'; 

import './App.css';
 
function App() {
  const [title, setTitle] = React.useState('');
  const [test, setTest] = React.useState({variables: [
    {name: 'test', value: 'test'}
  ]});

  const [headlines, setHeadlines] = React.useState<string[]>([]);
/*
  React.useEffect(() => {

    window.addEventListener('DOMContentLoaded', () => {
      let bg = chrome.extension.getBackgroundPage();
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      
      let currentTabId = tabs[0].id;
      let currentPerf = bg!.perfWatch[currentTabId!];
      let chromeWindow = bg!.chromeWindow[currentTabId!];
      console.log('currentTabId', currentTabId);

      // safety check: when page is still loading
      if (!currentPerf) {
          return;
      }
      if (!chromeWindow) {
          return;
      }

      setTest(chromeWindow)
      
    });

    });
      
  }, []);
*/
  setInterval(() => {
    let bg = chrome.extension.getBackgroundPage();
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      let currentTabId = tabs[0].id;
      let currentPerf = bg!.perfWatch[currentTabId!];
      let chromeWindow = bg!.chromeWindow[currentTabId!];

      // safety check: when page is still loading
      if (!currentPerf) {
          return;
      }
      if (!chromeWindow) {
          return;
      }

      setTest(chromeWindow)
      
    });
  }, 1000);





  return (
    <div className="App">
      <div>
        <p>Performance Metrics</p>
        {test && test.variables.map((item, index) => {
          return (
            <div>
              <p>{item.name}</p>
              <p>{item.value}</p>
            </div>
          )
        })}

        <div className='perf-tile' id='tile-section'>
        </div>
    </div>

    </div>
  );
}
 
export default App;