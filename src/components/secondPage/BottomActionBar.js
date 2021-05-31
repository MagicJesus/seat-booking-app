import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Spacer,
  Box,
  Button,
  Square,
  Text,
  Center,
} from "@chakra-ui/react";

const BottomActionBar = () => {
  const history = useHistory();
  const reservationLength = useSelector(
    (state) => state.initialReservation.reservation
  );
  const seatCount = useSelector((state) => state.seatCount);

  return (
    <Flex height="10%">
      <Spacer />
      <Square bg="red"></Square>
      <Center>
        <Box className="seat seat-free description"></Box>
        <Text padding="10px">Miejsca wolne</Text>
      </Center>
      <Spacer />
      <Center>
        <Box className="seat seat-reserved description"></Box>
        <Text padding="10px">Miejsca zarezerwowane</Text>
      </Center>
      <Spacer />
      <Center>
        <Box className="seat seat-selected description"></Box>
        <Text padding="10px">Twój wybór</Text>
      </Center>
      <Spacer />
      <Center>
        <Button
          onClick={() => {
            if (reservationLength.length < seatCount) {
              const alert =
                "Proszę wybrać jeszcze: " +
                (seatCount - reservationLength.length).toString() +
                " miejsc(a)";
              window.alert(alert);
            } else {
              history.push("/reservationComplete");
            }
          }}
        >
          Zarezerwuj miejsca
        </Button>
      </Center>

      <Spacer />
    </Flex>
  );
};

export default BottomActionBar;
