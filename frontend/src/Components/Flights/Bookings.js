import React from "react";
import BookingsItem from "./BookingsItem";
import { useState } from "react";
import axios from "axios";
import "./Bookings.css";

const Bookings = ({ user }) => {
  const [bookings, setBookings] = useState("");
  const getBookings = () => {
    axios.get(`http://jsonplaceholder.typicode.com/users`).then((res) => {
      setBookings(res.data);
      console.log(res.data);
    });
  };

  const bookings2 = [
    {
      userId: 12345,
      flightId: 4321,
      bookingDate: { type: Date, default: Date.now() },
      seatId: "A1",
      bookingStatus: "Booked",
      mileageId: "00000",
  },
  {
    userId: 12345,
    flightId: 4321,
    bookingDate: { type: Date, default: Date.now() },
    seatId: "A1",
    bookingStatus: "Booked",
    mileageId: "00000",
},
    
  ]

  


  return (
    <div className="past-flights">
      <div className="transform endow rectangle">
        <div className="swap">
          <div className="transform endow rectangle card card--full my-account-past-flights-card">
            <div className="swap">
              <div className="header-bar">
                <div className="transform endow rectangle header-bar--container">
                  <div className="endow--backdrop-outer-container">
                    <div className="endow--backdrop-background swa-g-color-bg-neutral-gray2"></div>
                  </div>
                  <div className="swap header-bar--content">
                    <div className="header-bar--content">
                      <h2
                        className="heading heading_semi-large header-bar--heading header-bar--heading_focusable"
                        id="past"
                        tabindex="-1"
                      >
                        0 past flights
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="transform endow rectangle">
                <div className="swap">
                  <div className="my-account-past-flights-card--filter-area"></div>
                  <div className="past-flights-card--no-results-section">
                    <div className="my-account-no-results-content">
                      {/* <span className="my-account-no-results-content--title">
                        You have no past flights.
                      </span> */}

                      <div className="wrapper">
                        <div class="table">
                          <div class="row-header">
                            <div class="cell">Trip</div>
                            <div class="cell">Date</div>
                            <div class="cell">Traveller</div>
                            <div class="cell">
                              <button onClick={getBookings}> </button>Location
                            </div>
                          </div>
                          {/* <BookingsItem /> */}

                          {bookings.length == 0
                            ? "Click here to book Flights"
                            : bookings.map((booking) => (
                                <BookingsItem
                                  key={booking.id}
                                  booking={booking}
                                />
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// /*bookings */

export default Bookings;
