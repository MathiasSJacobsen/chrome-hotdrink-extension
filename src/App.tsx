import {useEffect, useState} from 'react';  
import { ConstraintSystem } from './types'; 

import './App.css';
 
function App() {
  const [constraintSystem, setConstraintSystem] = useState<ConstraintSystem>({});

  useEffect(() => {
    updateConstraintVariables();
  }, []);


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

    const prettyPrintArray = (arr: Array<string | number| boolean>) => {
      return arr.map((item) => {
        return item.toString();
      }).join(", ");
    }
  return (
    <div className="App">
      <div className='contentWrapper'>
        <h1>HotDrink variables</h1>
        {constraintSystem.variables ? constraintSystem.variables.map((item, index) => {
          return (
            <div key={index} >
              <p><b>{item.name}</b>: {Array.isArray(item.value) ? prettyPrintArray(item.value) : item.value}</p>
            </div>
          )
        }) : (<p>This page does not have any constraint systems under the <code>window.constraintSystem</code></p>)}
        <button onClick={updateConstraintVariables}>Refresh</button>
    </div>

    </div>
  );
}
 
export default App;