package com.ems.ems.controller;

import com.ems.ems.model.PersonnelTrackingAchievements;
import com.ems.ems.service.PersonnelTrackingAchievementsService;
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
@RequestMapping("/personnel-tracking-achievements")
public class PersonnelTrackingAchievementsController {

    private final PersonnelTrackingAchievementsService personnelTrackingAchievementsService;

    public PersonnelTrackingAchievementsController(PersonnelTrackingAchievementsService personnelTrackingAchievementsService) {
        this.personnelTrackingAchievementsService = personnelTrackingAchievementsService;
    }

    @GetMapping
    public List<PersonnelTrackingAchievements> getAllPersonnelTrackingAchievements() throws IOException {
        return personnelTrackingAchievementsService.getAllPersonnelTrackingAchievements();
    }

    @GetMapping("/{id}")
    public PersonnelTrackingAchievements getPersonnelTrackingAchievementsById(@PathVariable int id) throws IOException {
        return personnelTrackingAchievementsService.getPersonnelTrackingAchievementsById(id);
    }

    @PostMapping
    public PersonnelTrackingAchievements createPersonnelTrackingAchievements(@RequestBody PersonnelTrackingAchievements personnelTrackingAchievements) throws IOException {
        return personnelTrackingAchievementsService.createPersonnelTrackingAchievements(personnelTrackingAchievements);
    }

    @PutMapping("/{id}")
    public PersonnelTrackingAchievements updatePersonnelTrackingAchievements(@PathVariable int id, @RequestBody PersonnelTrackingAchievements personnelTrackingAchievements) throws IOException {
        return personnelTrackingAchievementsService.updatePersonnelTrackingAchievements(id, personnelTrackingAchievements);
    }

    @DeleteMapping("/{id}")
    public void deletePersonnelTrackingAchievements(@PathVariable int id) throws IOException {
        personnelTrackingAchievementsService.deletePersonnelTrackingAchievements(id);
    }
}
