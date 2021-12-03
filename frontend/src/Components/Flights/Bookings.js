import BookingsItem from "./BookingsItem";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bookings.css";
import {
  getDateFromStr,
  getDateFromUtils,
  getTimeFromStr,
  getUserProfile,
} from "../Services/ControllerUtils";
import NavigationBar from "../Navbar/Navbar";
import { useHistory } from "react-router";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Bookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const history = useHistory();
  let profile = getUserProfile();
  console.log(profile);


  const fetchBookings = async () => {
    const result = await axios.post("http://localhost:3001/getBooking", {
      userId: profile._id,
      isAdmin: profile.isAdmin,
    })
    setBookings(result.data.data);
  }


  useEffect(() => {
    if (profile) {
      fetchBookings();
    }
  }, []);

  return (
    <>
      {localStorage.getItem("userData") ? <NavigationBar /> : history.push("/")}
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
                          {bookings.length >0 ? 
                            <div className="browH">
                              <div className="bcell">Trip</div>
                              <div className="bcell">Date</div>
                              <div className="bcell">Traveller</div>
                              <div className="bcell">Location</div>
                              <div className="bcell">Seat No</div>
                              <div className="bcell">Price</div>
                              <div className="bcell">Booking Status</div>
                              <div className="bcell"></div>
                            </div> : "" }
                            {/* <BookingsItem /> */}

                            {bookings.length == 0
                              ? ""
                              : bookings.map((booking) => (
                                <div class="brow" key={booking.id}>
                                  <div class="bcell" data-title="Name">
                                    {booking.flightId.arrivalAirport.city}
                                  </div>
                                  <div class="bcell" data-title="Age">
                                    {getTimeFromStr(booking.flightId.arrivalDateTime)}
                                  </div>
                                  <div class="bcell" data-title="Occupation">
                                    {booking.userId.firstName} {booking.userId.lastName}
                                  </div>
                                  <div class="bcell" data-title="Location">
                                    {booking.flightId.departureAirport.shortCode} - {booking.flightId.arrivalAirport.shortCode}
                                  </div>
                                  <div class="bcell" data-title="Seat No">
                                    {booking.seatNumber} 
                                  </div>
                                  <div class="bcell" data-title="Price">
                                    {(booking.isMileage?"":"$ ")+ booking.price+(booking.isMileage?" Pts":"")}
                                  </div>
                                  <div class="bcell" data-title="Price">
                                    {booking.bookingStatus}
                                  </div>
                                  <div class="bcell" data-title="Location">
                                    {booking.bookingStatus !=="Cancelled" && <div><Link to={{
                                      pathname: "/createReservation",
                                      query: booking,
                                      modeOfPayment: !booking.isMileage ? "D" : "P",
                                      sourcePage: "E"
                                    }}><Button variant="outline-dark">Update</Button></Link> <Button variant="outline-danger" onClick={(e) => {
                                      axios.post(`http://localhost:3001/cancelReservation`, { bookingId: booking._id })
                                        .then((response) => {
                                          fetchBookings();
                                        });
                                    }}>Cancel</Button>
                                    </div>}
                                  </div>
                                </div>
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
    </>
  );
};



export default Bookings;
