package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.PersonnelTrackingAchievements;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PersonnelTrackingAchievementsService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public PersonnelTrackingAchievementsService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<PersonnelTrackingAchievements> getAllPersonnelTrackingAchievements() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-personnel-tracking-achievements", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<PersonnelTrackingAchievements>>() {});
    }

    public PersonnelTrackingAchievements getPersonnelTrackingAchievementsById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-personnel-tracking-achievements-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, PersonnelTrackingAchievements.class);
    }

    public PersonnelTrackingAchievements createPersonnelTrackingAchievements(PersonnelTrackingAchievements personnelTrackingAchievements) throws IOException {
        String payload = lambdaService.invokeLambda("create-personnel-tracking-achievements", objectMapper.writeValueAsString(personnelTrackingAchievements));
        return objectMapper.readValue(payload, PersonnelTrackingAchievements.class);
    }

    public PersonnelTrackingAchievements updatePersonnelTrackingAchievements(int id, PersonnelTrackingAchievements personnelTrackingAchievements) throws IOException {
        String payload = lambdaService.invokeLambda("update-personnel-tracking-achievements", objectMapper.writeValueAsString(personnelTrackingAchievements));
        return objectMapper.readValue(payload, PersonnelTrackingAchievements.class);
    }

    public void deletePersonnelTrackingAchievements(int id) throws IOException {
        lambdaService.invokeLambda("delete-personnel-tracking-achievements", String.valueOf(id));
    }
}
