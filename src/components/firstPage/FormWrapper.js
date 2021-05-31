import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSeatCount, setAdjacency } from "../../actions";
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

const FormWrapper = () => {
  const [adjacent, setAdjacent] = useState(false);
  const [seatCount, setSeatsCount] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch(setSeatCount(parseInt(seatCount)));
    dispatch(setAdjacency(adjacent));
    history.push("/seats");
  };

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
              console.log(e);
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
