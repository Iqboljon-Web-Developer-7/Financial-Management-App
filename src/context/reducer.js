export const initialState = {
  wishlist: [],
  cart: [],
  token: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_WISH_ITEM":
      if (state.wishlist.findIndex((x) => x.id == action.product.id) < 0) {
        return { ...state, wishlist: [...state.wishlist, action.product] };
      }
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.product.id
        ),
      };

    default:
      break;
  }
};
