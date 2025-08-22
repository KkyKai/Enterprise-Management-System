package com.ems.ems.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    private int personnel_id;
    private String pernr;
    private String name;
    private String keycloak_id;
    private String email;
    private int current_rank_id;
    private int current_vocation_id;
    private int current_appointment_id;
}
