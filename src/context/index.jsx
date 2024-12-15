import React, { useContext, createContext, useReducer, useEffect } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    cards: JSON.parse(localStorage.getItem("cards")) || [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_CARD":
        return {
          cards: [...state.cards, action.item],
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("fincantionStatus", JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useStateValue = () => useContext(Context);
