import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "../../styles/seats.css";
import { useSelector } from "react-redux";
const SeatComponent = (props) => {
  const [selected, setSelected] = useState(
    props.isSelected ? props.isSelected : false
  );

  const seatCount = useSelector((state) => state.seatCount);

  function handleUnselect() {
    const indexOf = props.reservedSeats.indexOf(props.id);
    const remainder = [...props.reservedSeats];
    remainder.splice(indexOf, 1);
    setSelected(!selected);
    props.setReservedSeats(remainder);
    console.log(props.reservedSeats);
  }

  function handleSelect() {
    if (props.reservedSeats.length === seatCount) {
      window.alert("Wybierz tyle miejsc ile zadeklarowaleś");
    } else {
      setSelected(!selected);
      props.setReservedSeats([...props.reservedSeats, props.id]);
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
