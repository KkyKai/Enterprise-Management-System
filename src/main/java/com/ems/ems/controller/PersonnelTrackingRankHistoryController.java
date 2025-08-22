package com.ems.ems.controller;

import com.ems.ems.model.PersonnelTrackingRankHistory;
import com.ems.ems.service.PersonnelTrackingRankHistoryService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/personnel-tracking-rank-histories")
public class PersonnelTrackingRankHistoryController {

    private final PersonnelTrackingRankHistoryService personnelTrackingRankHistoryService;

    public PersonnelTrackingRankHistoryController(PersonnelTrackingRankHistoryService personnelTrackingRankHistoryService) {
        this.personnelTrackingRankHistoryService = personnelTrackingRankHistoryService;
    }

    @GetMapping
    public List<PersonnelTrackingRankHistory> getAllPersonnelTrackingRankHistories() throws IOException {
        return personnelTrackingRankHistoryService.getAllPersonnelTrackingRankHistories();
    }

    @GetMapping("/{id}")
    public PersonnelTrackingRankHistory getPersonnelTrackingRankHistoryById(@PathVariable int id) throws IOException {
        return personnelTrackingRankHistoryService.getPersonnelTrackingRankHistoryById(id);
    }

    @PostMapping
    public PersonnelTrackingRankHistory createPersonnelTrackingRankHistory(@RequestBody PersonnelTrackingRankHistory personnelTrackingRankHistory) throws IOException {
        return personnelTrackingRankHistoryService.createPersonnelTrackingRankHistory(personnelTrackingRankHistory);
    }

    @PutMapping("/{id}")
    public PersonnelTrackingRankHistory updatePersonnelTrackingRankHistory(@PathVariable int id, @RequestBody PersonnelTrackingRankHistory personnelTrackingRankHistory) throws IOException {
        return personnelTrackingRankHistoryService.updatePersonnelTrackingRankHistory(id, personnelTrackingRankHistory);
    }

    @DeleteMapping("/{id}")
    public void deletePersonnelTrackingRankHistory(@PathVariable int id) throws IOException {
        personnelTrackingRankHistoryService.deletePersonnelTrackingRankHistory(id);
    }
}
