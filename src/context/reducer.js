export const initialState = JSON.parse(
  localStorage.getItem("fincantionStatus")
) || {
  balance: {
    value: 10000,
    currency: "USD",
  },
  mainCurrency: "USD",
  cards: [],
  transactions: [],
  categories: ["Food", "Transport", "Shopping"],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...state,
        cards: [...state.cards, action.item],
      };
    case "ADD_CATEGORY":
      console.log(action.item);
      return {
        ...state,
        categories: [...state.categories, action.item],
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.item],
      };
    case "SET_MAIN_CURRENCY":
      return {
        ...state,
        mainCurrency: action.currency,
        balance: {
          ...state.balance,
          currency: action.currency,
        },
      };
    default:
      return state;
  }
};
