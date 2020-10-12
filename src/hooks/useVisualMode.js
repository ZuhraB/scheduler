import { useState } from "react";

// this fuction returns three objects 
export function useVisualMode(initial) {
  const [ mode,    setMode    ] = useState(initial);
  const [ history, setHistory ] = useState([ initial ]);
//transition is a stack which if no mode was set, current mode else set history based on 
//replace. if replace is true then we dont include it in the history. 
  function transition(currentMode, replace = false) {
    setMode(currentMode); 
    
    setHistory(prev => {
      if (replace) {
        prev[prev.length- 1] = currentMode;
      } else {
        prev.push(currentMode)
      }
      return [ ...prev]
    });
  }
// updates histroy and moves the stack back
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(prev => history[0]);
      setHistory(prev => [...prev]);
    }
  }

  return { mode, transition, back };

}
