import seatCountReducer from "./seatCountReducer";
import adjacencyReducer from "./adjacencyReducer";
import seatsReducer from "./seatsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  seats: seatsReducer,
  seatCount: seatCountReducer,
  isAdjacent: adjacencyReducer,
});

export default rootReducer;
