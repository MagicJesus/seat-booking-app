export const setSeatCount = (seatCount) => {
  return {
    type: "SET-SEAT-COUNT",
    payload: seatCount,
  };
};

export const setAdjacency = (isAdjacent) => {
  return {
    type: "SET-ADJACENCY",
    payload: isAdjacent,
  };
};

export const updateSeatsAction = (seats) => {
  return {
    type: "UPDATE-SEATS",
    payload: seats,
  };
};

export const setInitialReservation = (reservation) => {
  return {
    type: "INITIAL-RESERVATION",
    payload: reservation,
  };
};
