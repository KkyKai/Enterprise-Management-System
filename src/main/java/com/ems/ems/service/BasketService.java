package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.Basket;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class BasketService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public BasketService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<Basket> getAllBaskets() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-baskets", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<Basket>>() {});
    }

    public Basket getBasketById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-basket-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, Basket.class);
    }

    public Basket createBasket(Basket basket) throws IOException {
        String payload = lambdaService.invokeLambda("create-basket", objectMapper.writeValueAsString(basket));
        return objectMapper.readValue(payload, Basket.class);
    }

    public Basket updateBasket(int id, Basket basket) throws IOException {
        String payload = lambdaService.invokeLambda("update-basket", objectMapper.writeValueAsString(basket));
        return objectMapper.readValue(payload, Basket.class);
    }

    public void deleteBasket(int id) throws IOException {
        lambdaService.invokeLambda("delete-basket", String.valueOf(id));
    }
}
