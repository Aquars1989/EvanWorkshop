import React, { useContext, createContext, useReducer,type Dispatch } from "react";

// context for using state
const GuestStateContext = createContext({Ip:"",GuestName:"",GuestNameWord1:"",GuestNameWord2:"",GuestNameWord3:""});

// context for updating state
const GuestDispatchContext = createContext((() => undefined) as Dispatch<any>);

// reducer function
const reducer = (state:any, action:any) => {
  return action;
};

export default function GuestProvider({ children } :any) {
  const [state, dispatch] = useReducer(reducer, {
    Ip: "",
    GuestName: "guest",
    GuestNameWord1: "",
    GuestNameWord2: "unknow",
    GuestNameWord3: "guest",
  });

  return (
    <GuestDispatchContext.Provider value={dispatch}>
      <GuestStateContext.Provider value={state}>
        {children}
      </GuestStateContext.Provider>
    </GuestDispatchContext.Provider>
  );
}

// use them context we've created
export const useGuestStateContext = () => useContext(GuestStateContext);
export const useGuestDispatchContext = () => useContext(GuestDispatchContext);
