package com.ems.ems.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonnelTrackingRankHistory {

    private int rank_history_id;
    private int personnel_id;
    private int rank_id;
    private Date start_date;
    private Date end_date;
}
