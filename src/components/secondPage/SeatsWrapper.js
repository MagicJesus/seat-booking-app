import React from "react";
import { useSelector } from "react-redux";
import SeatComponent from "./SeatComponent";
import { Box } from "@chakra-ui/react";
import "../../styles/seats.css";
import BottomActionBar from "./BottomActionBar";

const SeatsWrapper = () => {
  const seats = useSelector((state) => state.seats.seatBase);
  const initialReservation = useSelector(
    (state) => state.initialReservation.reservation
  );

  function findRows() {
    let rowCount = 0;
    if (seats) {
      seats.forEach((el) => {
        if (el.cords.x > rowCount) {
          rowCount = el.cords.x;
        }
      });
    }
    return rowCount;
  }

  function findCols() {
    let colCount = 0;
    if (seats) {
      seats.forEach((el) => {
        if (el.cords.y > colCount) {
          colCount = el.cords.y;
        }
      });
    }
    return colCount;
  }

  function createIterator() {
    const numberOfRows = findRows();
    const numberOfCols = findCols();
    const iteratorArray = [];
    for (let i = 0; i <= numberOfRows; i++) {
      for (let j = 0; j <= numberOfCols; j++) {
        iteratorArray.push({ x: i, y: j });
      }
    }
    return iteratorArray;
  }

  // Helper function to determine which seats to render
  function findByCords(x, y) {
    let seat = {};
    if (seats) {
      seats.forEach((el) => {
        if (el.cords.x === x && el.cords.y === y) {
          seat = el;
        }
      });
    }
    return seat;
  }

  const allSeats = createIterator().map((cords) => {
    let key = cords.x.toString() + cords.y.toString();
    const realSeat = findByCords(cords.x, cords.y);
    if (Object.entries(realSeat).length > 0) {
      if (initialReservation.includes(realSeat.id)) {
        return (
          <SeatComponent
            key={realSeat.id}
            id={realSeat.id}
            visible={true}
            reserved={realSeat.reserved}
            isSelected={true}
          />
        );
      } else {
        return (
          <SeatComponent
            key={realSeat.id}
            id={realSeat.id}
            visible={true}
            reserved={realSeat.reserved}
          />
        );
      }
    } else {
      return (
        <SeatComponent
          key={key}
          x={cords.x}
          y={cords.y}
          visible={false}
          id={key}
        />
      );
    }
  });

  return (
    <Box className="window">
      <Box className="seats-wrapper">{seats ? allSeats : 0}</Box>
      <BottomActionBar selectedSeats={initialReservation} />
    </Box>
  );
};

export default SeatsWrapper;
