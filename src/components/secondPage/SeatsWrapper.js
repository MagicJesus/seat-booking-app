import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSeatsAction } from "../../actions";
import SeatComponent from "./SeatComponent";
import { Box } from "@chakra-ui/react";
import "../../styles/seats.css";
import BottomActionBar from "./BottomActionBar";
import axios from "axios";

const SeatsWrapper = () => {
  const [seats, setSeats] = useState([]);
  const dispatch = useDispatch();
  const seatCount = useSelector((state) => state.seatCount);
  const isAdjacent = useSelector((state) => state.isAdjacent);
  const [reservedSeats, setReservedSeats] = useState([]);

  useEffect(() => {
    if (seats.length === 0) {
      axios.get("http://localhost:3005/seats").then((res) => {
        if (res.status === 200) {
          dispatch(updateSeatsAction(res.data));
          setSeats(res.data);
        }
      });
    }
  }, [seats.length, dispatch]);

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

  const proposedSeats = () => {
    const proposition = [];
    console.log(seats);
    if (isAdjacent) {
      for (let i = 0; i < seats.length; i++) {
        console.log(seats[i].cords.x, seats[i].cords.y, proposition.length);
      }
    } else {
      for (let i = 0; i < seats.length; i++) {
        if (proposition.length === seatCount) {
          console.log(proposition);
          return proposition;
        } else {
          if (seats[i].reserved === false) {
            proposition.push(seats[i].id);
          }
        }
      }
    }
  };

  const allSeats = createIterator().map((cords) => {
    let key = cords.x.toString() + cords.y.toString();
    const realSeat = findByCords(cords.x, cords.y);
    if (Object.entries(realSeat).length > 0) {
      return (
        <SeatComponent
          key={realSeat.id}
          id={realSeat.id}
          visible={true}
          reserved={realSeat.reserved}
          setReservedSeats={setReservedSeats}
          reservedSeats={reservedSeats}
        />
      );
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
      <BottomActionBar selectedSeats={reservedSeats} />
    </Box>
  );
};

export default SeatsWrapper;
