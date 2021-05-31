const initialState = {
  reservation: [],
};

const initialReservationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "INITIAL-RESERVATION":
      return { ...state, reservation: [...payload] };
    default:
      return state;
  }
};

export default initialReservationReducer;
