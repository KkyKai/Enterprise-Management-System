package com.ems.ems.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonnelTrackingAchievements {

    private int achievement_tracking_id;
    private int personnel_id;
    private String achievements;
    private Date conferred_date;
}
