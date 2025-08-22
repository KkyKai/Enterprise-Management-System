package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.Country;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CountryService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public CountryService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<Country> getAllCountries() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-countries", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<Country>>() {});
    }

    public Country getCountryById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-country-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, Country.class);
    }

    public Country createCountry(Country country) throws IOException {
        String payload = lambdaService.invokeLambda("create-country", objectMapper.writeValueAsString(country));
        return objectMapper.readValue(payload, Country.class);
    }

    public Country updateCountry(int id, Country country) throws IOException {
        String payload = lambdaService.invokeLambda("update-country", objectMapper.writeValueAsString(country));
        return objectMapper.readValue(payload, Country.class);
    }

    public void deleteCountry(int id) throws IOException {
        lambdaService.invokeLambda("delete-country", String.valueOf(id));
    }
}
