package com.ems.ems.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    private int course_id;
    private String course_title;
    private int supplier_id;
    private int basket_id;
    private int country_id;
}
