package com.cmpe202.AirlineReservationSystem.service;

import com.cmpe202.AirlineReservationSystem.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PassengerService {
	@Autowired
	private PassengerRepository passengerRepository;

}
