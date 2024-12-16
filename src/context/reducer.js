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
  conversionRates: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...state,
        cards: [...state.cards, action.item],
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.item],
      };
    case "ADD_TRANSACTION":
      let newBalance = state.balance.value;
      if (action.item.type === "income") {
        newBalance += action.item.value;
      } else if (action.item.type === "outcome") {
        newBalance -= action.item.value;
      }
      return {
        ...state,
        balance: {
          ...state.balance,
          value: newBalance,
        },
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
    case "SET_CONVERSION_RATES":
      return {
        ...state,
        conversionRates: action.conversionRates,
      };
    default:
      return state;
  }
};
