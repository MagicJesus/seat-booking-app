import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import FormWrapper from "./components/firstPage/FormWrapper";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SeatsWrapper from "./components/secondPage/SeatsWrapper";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Switch>
            <Route path="/seats">
              <SeatsWrapper />
            </Route>
            <Route path="/">
              <FormWrapper />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
