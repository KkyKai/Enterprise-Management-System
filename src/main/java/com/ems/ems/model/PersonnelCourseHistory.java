package com.ems.ems.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonnelCourseHistory {

    private int enrollment_id;
    private int personnel_id;
    private int schedule_id;
    private int status_id;
    private Date completion_date;
}
