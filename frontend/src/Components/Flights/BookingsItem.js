import React from "react";
import "./BookingsItem.css"

const BookingList2 = ({booking}) => {
  return (
    <div class="row">
      <div class="cell" data-title="Name">
        San Francisco
      </div>
      <div class="cell" data-title="Age">
        Aug 09 2021
      </div>
      <div class="cell" data-title="Occupation">
        John Doe
      </div>
      <div class="cell" data-title="Location">
        BOM - SFO
      </div>
    </div>
  );
};

export default BookingList2;
