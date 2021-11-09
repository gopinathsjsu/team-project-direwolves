package com.cmpe202.AirlineReservationSystem.repository;


import com.cmpe202.AirlineReservationSystem.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReservationRepository  extends JpaRepository<Reservation, String> {

	Reservation findByReservationNumber(String reservationNumber);
	
}
