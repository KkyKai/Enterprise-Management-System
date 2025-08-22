package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.PersonnelTrackingRankHistory;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PersonnelTrackingRankHistoryService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public PersonnelTrackingRankHistoryService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<PersonnelTrackingRankHistory> getAllPersonnelTrackingRankHistories() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-personnel-tracking-rank-histories", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<PersonnelTrackingRankHistory>>() {});
    }

    public PersonnelTrackingRankHistory getPersonnelTrackingRankHistoryById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-personnel-tracking-rank-history-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, PersonnelTrackingRankHistory.class);
    }

    public PersonnelTrackingRankHistory createPersonnelTrackingRankHistory(PersonnelTrackingRankHistory personnelTrackingRankHistory) throws IOException {
        String payload = lambdaService.invokeLambda("create-personnel-tracking-rank-history", objectMapper.writeValueAsString(personnelTrackingRankHistory));
        return objectMapper.readValue(payload, PersonnelTrackingRankHistory.class);
    }

    public PersonnelTrackingRankHistory updatePersonnelTrackingRankHistory(int id, PersonnelTrackingRankHistory personnelTrackingRankHistory) throws IOException {
        String payload = lambdaService.invokeLambda("update-personnel-tracking-rank-history", objectMapper.writeValueAsString(personnelTrackingRankHistory));
        return objectMapper.readValue(payload, PersonnelTrackingRankHistory.class);
    }

    public void deletePersonnelTrackingRankHistory(int id) throws IOException {
        lambdaService.invokeLambda("delete-personnel-tracking-rank-history", String.valueOf(id));
    }
}
