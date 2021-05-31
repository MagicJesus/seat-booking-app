const initialState = {
  seatBase: [],
};

const seatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE-SEATS":
      return { ...state, seatBase: action.payload };
    default:
      return state;
  }
};

export default seatsReducer;
