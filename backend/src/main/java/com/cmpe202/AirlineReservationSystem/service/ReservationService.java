package com.cmpe202.AirlineReservationSystem.service;

import com.cmpe202.AirlineReservationSystem.repository.FlightRepository;
import com.cmpe202.AirlineReservationSystem.repository.PassengerRepository;
import com.cmpe202.AirlineReservationSystem.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;
    
	@Autowired
	private PassengerRepository passengerRepository;
	
	@Autowired
	private FlightRepository flightRepository;

}
