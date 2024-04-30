import React from "react";

function useNonInitialEffect(effect: any, deps: any) {
  const initialRender = React.useRef(true);

  React.useEffect(() => {
    let effectReturns = () => { };

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
    return undefined;
  }, deps);
}

export default useNonInitialEffect;
