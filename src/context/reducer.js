export const initialState = JSON.parse(
  localStorage.getItem("fincantionStatus")
) || {
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
    case "ADD_TRANSACTION": // Handle new transaction
      return {
        ...state,
        transactions: [...state.transactions, action.item],
      };
    default:
      return state;
  }
};
