import React from "react";

const BookingList = () => {
  return (
    <tbody class="atm-c-tabs__body">
      <tr class="atm-c-table__row">
        <td class="atm-c-table__cell atm-c-table__cell--align-left">
          <div class="app-containers-ManageResMyTrips-panels-styles__pastTripColumn--1QPi4">
            <p class="app-containers-ManageResMyTrips-panels-styles__tripTo--txTbK">
              San Francisco
            </p>
            <p class="app-containers-ManageResMyTrips-panels-styles__pastConfirmationNumber--3E7wb">
              D1N574
            </p>
          </div>
        </td>
        <td class="atm-c-table__cell atm-c-table__cell--align-left" colspan="2">
          <div class="app-containers-ManageResMyTrips-panels-styles__dateFlightItem--1ZURK">
            <div class="atm-c-text-passage app-containers-ManageResMyTrips-panels-styles__date--27yJ6">
              <div class="atm-l-linelength-container">
                <span>Mon, Aug 9, 2021</span>
              </div>
            </div>
            <ul class="app-containers-ManageResMyTrips-panels-styles__flights--1YRWB">
              <li>BOM - DEL</li>
            </ul>
          </div>
          <div class="app-containers-ManageResMyTrips-panels-styles__dateFlightItem--1ZURK">
            <div class="atm-c-text-passage app-containers-ManageResMyTrips-panels-styles__date--27yJ6">
              <div class="atm-l-linelength-container">
                <span>Tue, Aug 10, 2021</span>
              </div>
            </div>
            <ul class="app-containers-ManageResMyTrips-panels-styles__flights--1YRWB">
              <li>DEL - SFO</li>
            </ul>
          </div>
        </td>
        <td
          class="atm-c-table__cell atm-c-table__cell--align-left"
          data-heading="Traveler"
        >
          <ul>
            <li>Rugved Manoorkar</li>
          </ul>
        </td>
        <td
          class="atm-c-table__cell app-containers-ManageResMyTrips-panels-styles__receiptLinks--1ZQxp atm-c-table__cell--align-left"
          data-heading="Receipt"
        >
          <button class="atm-c-btn atm-c-btn--link">
            <span class="atm-c-btn__text"></span>
          </button>
          <br />
          <a
            class="app-containers-ManageResMyTrips-panels-styles__receiptLink--3low8"
            href="/en/us/receipts"
          >
            Find all receipts
          </a>
        </td>
      </tr>
    </tbody>
  );
};

export default BookingList;
