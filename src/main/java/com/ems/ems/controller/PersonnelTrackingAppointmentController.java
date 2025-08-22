package com.ems.ems.controller;

import com.ems.ems.model.PersonnelTrackingAppointment;
import com.ems.ems.service.PersonnelTrackingAppointmentService;
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
@RequestMapping("/personnel-tracking-appointments")
public class PersonnelTrackingAppointmentController {

    private final PersonnelTrackingAppointmentService personnelTrackingAppointmentService;

    public PersonnelTrackingAppointmentController(PersonnelTrackingAppointmentService personnelTrackingAppointmentService) {
        this.personnelTrackingAppointmentService = personnelTrackingAppointmentService;
    }

    @GetMapping
    public List<PersonnelTrackingAppointment> getAllPersonnelTrackingAppointments() throws IOException {
        return personnelTrackingAppointmentService.getAllPersonnelTrackingAppointments();
    }

    @GetMapping("/{id}")
    public PersonnelTrackingAppointment getPersonnelTrackingAppointmentById(@PathVariable int id) throws IOException {
        return personnelTrackingAppointmentService.getPersonnelTrackingAppointmentById(id);
    }

    @PostMapping
    public PersonnelTrackingAppointment createPersonnelTrackingAppointment(@RequestBody PersonnelTrackingAppointment personnelTrackingAppointment) throws IOException {
        return personnelTrackingAppointmentService.createPersonnelTrackingAppointment(personnelTrackingAppointment);
    }

    @PutMapping("/{id}")
    public PersonnelTrackingAppointment updatePersonnelTrackingAppointment(@PathVariable int id, @RequestBody PersonnelTrackingAppointment personnelTrackingAppointment) throws IOException {
        return personnelTrackingAppointmentService.updatePersonnelTrackingAppointment(id, personnelTrackingAppointment);
    }

    @DeleteMapping("/{id}")
    public void deletePersonnelTrackingAppointment(@PathVariable int id) throws IOException {
        personnelTrackingAppointmentService.deletePersonnelTrackingAppointment(id);
    }
}
