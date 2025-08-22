package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.Modality;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ModalityService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public ModalityService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<Modality> getAllModalities() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-modalities", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<Modality>>() {});
    }

    public Modality getModalityById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-modality-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, Modality.class);
    }

    public Modality createModality(Modality modality) throws IOException {
        String payload = lambdaService.invokeLambda("create-modality", objectMapper.writeValueAsString(modality));
        return objectMapper.readValue(payload, Modality.class);
    }

    public Modality updateModality(int id, Modality modality) throws IOException {
        String payload = lambdaService.invokeLambda("update-modality", objectMapper.writeValueAsString(modality));
        return objectMapper.readValue(payload, Modality.class);
    }

    public void deleteModality(int id) throws IOException {
        lambdaService.invokeLambda("delete-modality", String.valueOf(id));
    }
}
