const initialState = { historyProduit: [] };

function toggleHistory(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "TOGGLE_HISTORY":
      nextState = {
        ...state,
        historyProduit: [...state.historyProduit, action.value],
      };
      return nextState || state;
    default:
      return state;
  }
}

export default toggleHistory;
