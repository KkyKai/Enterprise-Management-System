package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.Vocation;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class VocationService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public VocationService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<Vocation> getAllVocations() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-vocations", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<Vocation>>() {});
    }

    public Vocation getVocationById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-vocation-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, Vocation.class);
    }

    public Vocation createVocation(Vocation vocation) throws IOException {
        String payload = lambdaService.invokeLambda("create-vocation", objectMapper.writeValueAsString(vocation));
        return objectMapper.readValue(payload, Vocation.class);
    }

    public Vocation updateVocation(int id, Vocation vocation) throws IOException {
        String payload = lambdaService.invokeLambda("update-vocation", objectMapper.writeValueAsString(vocation));
        return objectMapper.readValue(payload, Vocation.class);
    }

    public void deleteVocation(int id) throws IOException {
        lambdaService.invokeLambda("delete-vocation", String.valueOf(id));
    }
}
