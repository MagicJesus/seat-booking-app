import React from "react";
import {
  Flex,
  Spacer,
  Box,
  Button,
  Square,
  Text,
  Center,
} from "@chakra-ui/react";

const BottomActionBar = ({ selectedSeats }) => {
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
        <Button onClick={() => window.alert(selectedSeats)}>
          Zarezerwuj miejsca
        </Button>
      </Center>

      <Spacer />
    </Flex>
  );
};

export default BottomActionBar;
