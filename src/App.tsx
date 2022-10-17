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



  return (
    <div className="App">
      <div className='contentWrapper'>
        <p>HotDrink variables:</p>
        {constraintSystem.variables ? constraintSystem.variables.map((item, index) => {
          return (
            <div key={index} >
              <p>{item.name}: {item.value}</p>
            </div>
          )
        }) : (<p>This page does not have any constraint systems under the <code>window.constraintSystem</code></p>)}
        <button onClick={updateConstraintVariables}>Fetch new values</button>
    </div>

    </div>
  );
}
 
export default App;