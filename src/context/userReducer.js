const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        currentUser: action.payload,
      };
      break;
    case "LOGOUT":
      return {
        currentUser: action.payload,
      };
      break;

    default:
      return state;
      break;
  }
};

export default UserReducer;
