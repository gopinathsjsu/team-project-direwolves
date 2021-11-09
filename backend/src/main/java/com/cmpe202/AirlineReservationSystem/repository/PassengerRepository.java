package com.cmpe202.AirlineReservationSystem.repository;

import com.cmpe202.AirlineReservationSystem.entity.Passenger;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger, String> {

	Passenger findByPhone(String phone);
	Optional<Passenger> findById(String id);
}
