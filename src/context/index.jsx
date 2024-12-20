import React, { useContext, createContext, useReducer, useEffect } from "react";
import { initialState, reducer } from "./reducer";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(state);

    localStorage.setItem("fincantionStatus", JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useStateValue = () => useContext(Context);
