import React from "react";
import "./BookingsItem.css"

const BookingList2 = ({booking}) => {
  return (
    <div class="brow">
      <div class="bcell" data-title="Name">
        San Francisco
      </div>
      <div class="bcell" data-title="Age">
        Aug 09 2021
      </div>
      <div class="bcell" data-title="Occupation">
        John Doe
      </div>
      <div class="bcell" data-title="Location">
        BOM - SFO
      </div>
    </div>
  );
};

export default BookingList2;
