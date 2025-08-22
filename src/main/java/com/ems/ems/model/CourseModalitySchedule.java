package com.ems.ems.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseModalitySchedule {

    private int schedule_id;
    private int course_id;
    private int modality_id;
    private Date course_available_start_date;
    private Date course_available_end_date;
}
