package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.Rank;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class RankService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public RankService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<Rank> getAllRanks() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-ranks", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<Rank>>() {});
    }

    public Rank getRankById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-rank-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, Rank.class);
    }

    public Rank createRank(Rank rank) throws IOException {
        String payload = lambdaService.invokeLambda("create-rank", objectMapper.writeValueAsString(rank));
        return objectMapper.readValue(payload, Rank.class);
    }

    public Rank updateRank(int id, Rank rank) throws IOException {
        String payload = lambdaService.invokeLambda("update-rank", objectMapper.writeValueAsString(rank));
        return objectMapper.readValue(payload, Rank.class);
    }

    public void deleteRank(int id) throws IOException {
        lambdaService.invokeLambda("delete-rank", String.valueOf(id));
    }
}
