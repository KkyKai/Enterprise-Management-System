package com.ems.ems.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonnelTrackingAppointment {

    private int appointment_tracking_id;
    private int personnel_id;
    private int appointment_id;
    private Date conferred_date;
}
