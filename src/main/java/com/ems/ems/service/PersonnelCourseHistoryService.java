package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.PersonnelCourseHistory;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PersonnelCourseHistoryService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public PersonnelCourseHistoryService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<PersonnelCourseHistory> getAllPersonnelCourseHistories() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-personnel-course-histories", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<PersonnelCourseHistory>>() {});
    }

    public PersonnelCourseHistory getPersonnelCourseHistoryById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-personnel-course-history-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, PersonnelCourseHistory.class);
    }

    public PersonnelCourseHistory createPersonnelCourseHistory(PersonnelCourseHistory personnelCourseHistory) throws IOException {
        String payload = lambdaService.invokeLambda("create-personnel-course-history", objectMapper.writeValueAsString(personnelCourseHistory));
        return objectMapper.readValue(payload, PersonnelCourseHistory.class);
    }

    public PersonnelCourseHistory updatePersonnelCourseHistory(int id, PersonnelCourseHistory personnelCourseHistory) throws IOException {
        String payload = lambdaService.invokeLambda("update-personnel-course-history", objectMapper.writeValueAsString(personnelCourseHistory));
        return objectMapper.readValue(payload, PersonnelCourseHistory.class);
    }

    public void deletePersonnelCourseHistory(int id) throws IOException {
        lambdaService.invokeLambda("delete-personnel-course-history", String.valueOf(id));
    }
}
