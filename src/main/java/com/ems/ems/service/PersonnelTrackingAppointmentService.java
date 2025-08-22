package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.PersonnelTrackingAppointment;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PersonnelTrackingAppointmentService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public PersonnelTrackingAppointmentService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<PersonnelTrackingAppointment> getAllPersonnelTrackingAppointments() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-personnel-tracking-appointments", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<PersonnelTrackingAppointment>>() {});
    }

    public PersonnelTrackingAppointment getPersonnelTrackingAppointmentById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-personnel-tracking-appointment-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, PersonnelTrackingAppointment.class);
    }

    public PersonnelTrackingAppointment createPersonnelTrackingAppointment(PersonnelTrackingAppointment personnelTrackingAppointment) throws IOException {
        String payload = lambdaService.invokeLambda("create-personnel-tracking-appointment", objectMapper.writeValueAsString(personnelTrackingAppointment));
        return objectMapper.readValue(payload, PersonnelTrackingAppointment.class);
    }

    public PersonnelTrackingAppointment updatePersonnelTrackingAppointment(int id, PersonnelTrackingAppointment personnelTrackingAppointment) throws IOException {
        String payload = lambdaService.invokeLambda("update-personnel-tracking-appointment", objectMapper.writeValueAsString(personnelTrackingAppointment));
        return objectMapper.readValue(payload, PersonnelTrackingAppointment.class);
    }

    public void deletePersonnelTrackingAppointment(int id) throws IOException {
        lambdaService.invokeLambda("delete-personnel-tracking-appointment", String.valueOf(id));
    }
}
