const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT":
      return {
        ...state,
        darkMode: false,
      };
      break;
    case "DARK":
      return {
        ...state,
        darkMode: true,
      };
      break;
    case "TOGGLE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
      break;

    default:
      return state;
      break;
  }
};

export default DarkModeReducer;
