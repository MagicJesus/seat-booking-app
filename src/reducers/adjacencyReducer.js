const adjacencyReducer = (state = false, action) => {
  switch (action.type) {
    case "SET-ADJACENCY":
      return action.payload;
    default:
      return state;
  }
};

export default adjacencyReducer;
