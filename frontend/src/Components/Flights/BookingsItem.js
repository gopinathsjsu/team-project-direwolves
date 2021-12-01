import React from "react";
import "./BookingsItem.css"

const BookingList2 = ({booking}) => {
  return (
    <div class="brow">
      <div class="bcell" data-title="Name">
        {booking.flightId.arrivalAirport.city}
      </div>
      <div class="bcell" data-title="Age">
        {booking.flightId.arrivalDateTime}
      </div>
      <div class="bcell" data-title="Occupation">
        {booking.userId.firstName} {booking.userId.lastName}
      </div>
      <div class="bcell" data-title="Location">
      {booking.flightId.departureAirport.shortCode} - {booking.flightId.arrivalAirport.shortCode}
      </div>
    </div>
  );
};

export default BookingList2;
