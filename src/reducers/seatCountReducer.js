const seatCountReducer = (state = 1, action) => {
  switch (action.type) {
    case "SET-SEAT-COUNT":
      return action.payload;
    default:
      return state;
  }
};

export default seatCountReducer;
