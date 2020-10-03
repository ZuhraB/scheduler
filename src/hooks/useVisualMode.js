import { useState } from "react";


export function useVisualMode(initial) {
  const [ mode,    setMode    ] = useState(initial);
  const [ history, setHistory ] = useState([ initial ]);

  function transition(currentMode, replace = false) {
    setMode(currentMode); 
    if (replace) {
      history[history.length- 1] = currentMode;
    } else {
      history.push(currentMode)
    }
    setHistory([ ...history ]);
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory([ ...history ]);
    }
  }

  return { mode, transition, back };

}
