import React from "react";
import BookingsItem from "./BookingsItem";
const Bookings = () => {
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

                      <div className="table-wrapper">
                        <div class="table">
                          <div class="row header">
                            <div class="cell">Trip</div>
                            <div class="cell">Date</div>
                            <div class="cell">Traveller</div>
                            <div class="cell">Location</div>
                          </div>
                          <BookingsItem />
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
// .past-flights{
//   box-sizing: border-box;
//   font-family: Arial;
//   margin-top: 10px;
// }
// .transform{
//   perspective: 10000px;
// }

// .swap{
//   overflow: hidden;
//   position: relative;
// }

// .my-account-past-flights-card {
//   background-color: #fff;
// }
// .card--full {
//   width: 938px;
// }

// .header-bar {
//   min-height: 56px;
//   position: relative;
// }

// .header-bar--container {
//   padding: 12px 20px;
// }

// .endow--backdrop-outer-container {
//   bottom: 0;
//   left: 0;
//   position: absolute;
//   right: 0;
//   top: 0;
// }

// .swa-g-color-bg-neutral-gray2 {
//   background-color: #E6E7E8;
// }
// .endow--backdrop-background {
//   height: 100%;
// }

// .header-bar--content {
//   min-height: 32px;
// }


// .my-account-no-results-content {
//   text-align: center;
// }

// .my-account-no-results-content--title {
//   color: #111B40;
//   font: 22px/26px Arial;
// }

// .my-account-past-flights-card .past-flights-card--no-results-section {
//   padding: 27px 0 22px;
// }

// /*list start*/

// .atm-c-table--stacked {
//   display: table;
// }

// .atm-c-table--stacked>.atm-c-table__body {
//   display: table-row-group;
//   width: 100%;
// }

// .atm-c-table--stacked .atm-c-table__row {
//   display: table-row;
// }

// .atm-c-table__row:last-child {
//   border-bottom: 0;
// }

// .atm-c-table__row {
//   vertical-align: top;
//   border-bottom-width: 1px
// ;
//   border-bottom-style: solid;
//   border-bottom-color: #ccc;
// }

// .atm-c-table--stacked {
//   display: table;
// }

// .atm-c-table--stacked .atm-c-table__cell {
//   display: table-cell;
//   padding: 1rem 0.5rem;
//   min-width: 47em
// }

// .atm-c-table__cell--align-left {
//   text-align: left;
//   padding: 1rem 0.5rem;
// }

// td {
//   display: table-cell;
//   vertical-align: inherit;
// }

// .app-containers-ManageResMyTrips-panels-styles__pastTripColumn--1QPi4 {
//   line-height: 0.5;
// }
// .app-containers-ManageResMyTrips-panels-styles__tripTo--txTbK {
//   font-weight: 600;
// }

// .app-containers-ManageResMyTrips-panels-styles__pastConfirmationNumber--3E7wb {
//   font-size: 16px;
//   font-weight: 400;
//   margin: 0;
// }

// .app-containers-ManageResMyTrips-panels-styles__dateFlightItem--1ZURK {
//   flex-direction: row;
// }

// .app-containers-ManageResMyTrips-panels-styles__dateFlightItem--1ZURK {
//   display: flex;
// }
// .app-containers-ManageResMyTrips-panels-styles__dateFlightItem--1ZURK .app-containers-ManageResMyTrips-panels-styles__date--27yJ6 {
//   width: 140px;
//   font-weight: 400;
// }

// .app-containers-ManageResMyTrips-panels-styles__dateFlightItem--1ZURK .app-containers-ManageResMyTrips-panels-styles__date--27yJ6 {
//   margin-bottom: 0;
// }

// .app-containers-ManageResMyTrips-panels-styles__dateFlightItem--1ZURK .app-containers-ManageResMyTrips-panels-styles__date--27yJ6 {
//   font-size: 14px;
// }

// .atm-c-text-passage :last-child {
//   margin-bottom: 0;
// }

// .atm-c-text-passage :first-child {
//   margin-top: 0;
// }

// .atm-l-linelength-container {
//   max-width: 48rem;
// }

// .app-containers-ManageResMyTrips-panels-styles__dateFlightItem--1ZURK .app-containers-ManageResMyTrips-panels-styles__flights--1YRWB {
//   margin: 0 auto;
//   width: 90px;
// }

// .app-containers-ManageResMyTrips-panels-styles__dateFlightItem--1ZURK .app-containers-ManageResMyTrips-panels-styles__flights--1YRWB {
//   font-weight: 600;
// }

// .app-containers-ManageResMyTrips-panels-styles__flights--1YRWB {
//   min-height: 30px;
// }

// ul{
//   list-style: none;
// }

// /* For table list */
// body .wrapper {
//   margin: 0 auto;
//   padding: 40px;
//   max-width: 800px;
// }

// .table {
//   margin: 0 0 40px 0;
//   width: 100%;
//   box-shadow: 0 1px 3px rgb(0 0 0 / 20%);
//   display: table;
// }

// .row.header {
//   font-weight: 900;
//   color: #ffffff;
//   background: #ea6153;
// }

// .cell {
//   padding: 6px 12px;
//   display: table-cell;
// }

// .row {
//   display: table-row;
//   background: #f6f6f6;
// }

export default Bookings;
