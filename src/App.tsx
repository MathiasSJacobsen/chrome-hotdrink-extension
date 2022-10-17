import React from 'react';  
import { ConstraintSystem, DOMMessage, DOMMessageResponse } from './types'; 

import './App.css';
 
function App() {
  const [constraintSystem, setConstraintSystem] = React.useState<ConstraintSystem>({});


  const updateConstraintVariables = () => {
    let bg = chrome.extension.getBackgroundPage();
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      let currentTabId = tabs[0].id;
      let chromeWindow = bg!.chromeWindow[currentTabId!];

      // safety check: when page is still loading
      if (!chromeWindow) {
          return;
      }

      setConstraintSystem(chromeWindow)
      
    });
   }



  return (
    <div className="App">
      <div>
        <p>HotDrink variables:</p>
        <button onClick={updateConstraintVariables}>Click me!</button>
        {constraintSystem.variables && constraintSystem.variables.map((item, index) => {
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