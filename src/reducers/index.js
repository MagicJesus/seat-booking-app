import seatCountReducer from "./seatCountReducer";
import adjacencyReducer from "./adjacencyReducer";
import seatsReducer from "./seatsReducer";
import initialReservationReducer from "./initialReservationReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  seats: seatsReducer,
  seatCount: seatCountReducer,
  isAdjacent: adjacencyReducer,
  initialReservation: initialReservationReducer,
});

export default rootReducer;
