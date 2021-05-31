import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSeatCount,
  setAdjacency,
  updateSeatsAction,
  setInitialReservation,
} from "../../actions";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const FormWrapper = () => {
  const [adjacent, setAdjacent] = useState(false);
  const [seatCount, setSeatsCount] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const seats = useSelector((state) => state.seats.seatBase);

  useEffect(() => {
    if (seats.length === 0) {
      axios.get("http://localhost:3005/seats").then((res) => {
        if (res.status === 200) {
          dispatch(updateSeatsAction(res.data));
        }
      });
    }
  });

  const handleSubmit = () => {
    dispatch(setSeatCount(parseInt(seatCount)));
    dispatch(setAdjacency(adjacent));
    proposeSeats();
    history.push("/seats");
  };

  function proposeSeats() {
    const proposition = [];
    if (adjacent) {
      let position = 0;
      while (proposition.length < seatCount && position < seats.length) {
        let currentSeat = seats[position];
        let nextSeat = seats[position + 1];
        if (!nextSeat) {
          proposition.length = 0;
          dispatch(setInitialReservation(proposition));
          window.alert(
            "Nie znaleziono takiej ilości sąsiednich miejsc, proszę wybrać ręcznie"
          );
          return;
        }
        if (
          nextSeat.reserved === false &&
          nextSeat.cords.y - currentSeat.cords.y === 1 &&
          nextSeat.cords.x === currentSeat.cords.x
        ) {
          // Check if next seat from current one is a valid seat
          // if it is valid, add current seat to the list and move on
          proposition.push(currentSeat.id);
          position += 1;
          continue;
        } else {
          // If next seat is not valid, check if current one fills the list
          // if it does, add it to the list and finish the loop
          if (proposition.length + 1 === parseInt(seatCount)) {
            proposition.push(currentSeat.id);
            break;
          } else {
            // If next seat is invalid, and current seat does not fill the list,
            // empty the proposition and start from the next seat
            proposition.length = 0;
            position += 1;
            continue;
          }
        }
      }
      dispatch(setInitialReservation(proposition));
    } else {
      for (let i = 0; i < seats.length; i++) {
        if (proposition.length === parseInt(seatCount)) {
          dispatch(setInitialReservation(proposition));
          return;
        } else {
          if (seats[i].reserved === false) {
            proposition.push(seats[i].id);
          }
        }
      }
    }
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <FormControl className="form-control">
          <FormLabel>Ilość miejsc</FormLabel>
          <NumberInput
            defaultValue={1}
            min={1}
            max={20}
            onChange={(e) => {
              setSeatsCount(e);
            }}
          >
            <NumberInputField></NumberInputField>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Checkbox
            width="50%"
            onChange={(e) => {
              setAdjacent(e.target.checked);
            }}
          >
            Czy miejsca mają być obok siebie?
          </Checkbox>
          <Button
            width="50%"
            margin="auto"
            colorScheme="telegram"
            type="submit"
          >
            Wybierz miejsca
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default FormWrapper;
