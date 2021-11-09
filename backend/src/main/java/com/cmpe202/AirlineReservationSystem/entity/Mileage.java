/**
 * 
 */
package com.cmpe202.AirlineReservationSystem.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author vinayguda
 *
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Mileage")
public class Mileage {
	
	@Id
	@GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String mileageId; 
	private float points;
    
	@OneToOne(targetEntity=Passenger.class, cascade=CascadeType.DETACH)
	private Passenger passenger;

}
