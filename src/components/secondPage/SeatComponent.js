import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "../../styles/seats.css";
import { useSelector, useDispatch } from "react-redux";
import { setInitialReservation } from "../../actions";

const SeatComponent = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(
    props.isSelected ? props.isSelected : false
  );

  const seatCount = useSelector((state) => state.seatCount);
  const reservation = useSelector(
    (state) => state.initialReservation.reservation
  );

  function handleUnselect() {
    const indexOf = reservation.indexOf(props.id);
    const remainder = [...reservation];
    remainder.splice(indexOf, 1);
    setSelected(!selected);
    dispatch(setInitialReservation(remainder));
  }

  function handleSelect() {
    if (reservation.length === seatCount) {
      window.alert("Wybierz tyle miejsc ile zadeklarowałeś!");
    } else {
      setSelected(!selected);
      dispatch(setInitialReservation([...reservation, props.id]));
    }
  }

  if (props.visible) {
    if (props.reserved) {
      return <Box className="seat seat-reserved"></Box>;
    } else {
      if (selected || props.isSelected) {
        return (
          <Box className="seat seat-selected" onClick={handleUnselect}></Box>
        );
      } else {
        return <Box className="seat" onClick={handleSelect}></Box>;
      }
    }
  } else {
    return <Box className="seat seat-invisible"></Box>;
  }
};

export default SeatComponent;
