import { useState } from "react";


export function useVisualMode(initial) {
  const [ mode,    setMode    ] = useState(initial);
  const [ history, setHistory ] = useState([ initial ]);

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

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(prev => history[0]);
      setHistory(prev => [...prev]);
    }
  }

  return { mode, transition, back };

}
