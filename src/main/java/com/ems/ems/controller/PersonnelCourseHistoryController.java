package com.ems.ems.controller;

import com.ems.ems.model.PersonnelCourseHistory;
import com.ems.ems.service.PersonnelCourseHistoryService;
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
@RequestMapping("/personnel-course-histories")
public class PersonnelCourseHistoryController {

    private final PersonnelCourseHistoryService personnelCourseHistoryService;

    public PersonnelCourseHistoryController(PersonnelCourseHistoryService personnelCourseHistoryService) {
        this.personnelCourseHistoryService = personnelCourseHistoryService;
    }

    @GetMapping
    public List<PersonnelCourseHistory> getAllPersonnelCourseHistories() throws IOException {
        return personnelCourseHistoryService.getAllPersonnelCourseHistories();
    }

    @GetMapping("/{id}")
    public PersonnelCourseHistory getPersonnelCourseHistoryById(@PathVariable int id) throws IOException {
        return personnelCourseHistoryService.getPersonnelCourseHistoryById(id);
    }

    @PostMapping
    public PersonnelCourseHistory createPersonnelCourseHistory(@RequestBody PersonnelCourseHistory personnelCourseHistory) throws IOException {
        return personnelCourseHistoryService.createPersonnelCourseHistory(personnelCourseHistory);
    }

    @PutMapping("/{id}")
    public PersonnelCourseHistory updatePersonnelCourseHistory(@PathVariable int id, @RequestBody PersonnelCourseHistory personnelCourseHistory) throws IOException {
        return personnelCourseHistoryService.updatePersonnelCourseHistory(id, personnelCourseHistory);
    }

    @DeleteMapping("/{id}")
    public void deletePersonnelCourseHistory(@PathVariable int id) throws IOException {
        personnelCourseHistoryService.deletePersonnelCourseHistory(id);
    }
}
