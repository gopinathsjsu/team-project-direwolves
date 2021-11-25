import React from "react";

const Bookings = () => {
  return (
    <div className="past-flights">
      <div className="transform endow rectangle">
        <div className="swap" >
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
                      <span className="my-account-no-results-content--title">
                        You have no past flights.
                      </span>
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

export default Bookings;
