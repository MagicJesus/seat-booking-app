import React from "react";
import { useSelector } from "react-redux";
import "../../styles/confirmation.css";

const ReservationCompletePage = () => {
  const finalReservation = useSelector(
    (state) => state.initialReservation.reservation
  );

  const confirmation = finalReservation.map((seatCode) => {
    let seatNumber = seatCode.slice(2);
    return (
      <div key={seatCode} className="seat-list-element">
        - Rząd: {parseInt(seatCode[1]) + 1}, miejsce: {parseInt(seatNumber) + 1}
      </div>
    );
  });

  return (
    <div className="confirmation">
      <h1 className="header">Twoja rezerwacja przebiegła pomyślnie!</h1>
      <div className="seat-list">
        Wybrałeś miejsca:
        {confirmation}
      </div>
      <h1 className="header">
        {" "}
        W razie problemów, prosimy o kontakt z działem administracji
      </h1>
      <hr className="line"></hr>
    </div>
  );
};

export default ReservationCompletePage;
