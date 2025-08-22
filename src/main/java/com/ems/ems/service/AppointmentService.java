package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.Appointment;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class AppointmentService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public AppointmentService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<Appointment> getAllAppointments() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-appointments", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<Appointment>>() {});
    }

    public Appointment getAppointmentById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-appointment-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, Appointment.class);
    }

    public Appointment createAppointment(Appointment appointment) throws IOException {
        String payload = lambdaService.invokeLambda("create-appointment", objectMapper.writeValueAsString(appointment));
        return objectMapper.readValue(payload, Appointment.class);
    }

    public Appointment updateAppointment(int id, Appointment appointment) throws IOException {
        String payload = lambdaService.invokeLambda("update-appointment", objectMapper.writeValueAsString(appointment));
        return objectMapper.readValue(payload, Appointment.class);
    }

    public void deleteAppointment(int id) throws IOException {
        lambdaService.invokeLambda("delete-appointment", String.valueOf(id));
    }
}
