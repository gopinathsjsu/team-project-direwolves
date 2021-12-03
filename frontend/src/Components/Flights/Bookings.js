import React from "react";
import BookingsItem from "./BookingsItem";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Bookings.css";
import {
  getDateFromStr,
  getDateFromUtils,
  getTimeFromStr,
  getUserProfile,
} from "../Services/ControllerUtils";
import NavigationBar from "../Navbar/Navbar";

const Bookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  let profile = getUserProfile();
  console.log(profile)

  useEffect(async () => {
    const result = await axios
      .post("http://localhost:3001/getBooking", {
        body: JSON.stringify({
          email: profile.email,
          isAdmin: profile.isAdmin,
          
      })
      })
      // .then((res) => {
      //   console.log(res.data);
      // });
    console.log(result.data.data, "  Result");
    setBookings(result.data.data);
  },[]);

  return (
    <div className="past-flights">
      <NavigationBar />
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
                        tabIndex="-1"
                      >
                        {bookings.length} past flights
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

                      <div className="bwrapper">
                        <div className="btable">
                          <div className="browH">
                            <div className="bcell">Trip</div>
                            <div className="bcell">Date</div>
                            <div className="bcell">Traveller</div>
                            <div className="bcell">Location</div>
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
