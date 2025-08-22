package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.Supplier;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class SupplierService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public SupplierService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<Supplier> getAllSuppliers() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-suppliers", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<Supplier>>() {});
    }

    public Supplier getSupplierById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-supplier-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, Supplier.class);
    }

    public Supplier createSupplier(Supplier supplier) throws IOException {
        String payload = lambdaService.invokeLambda("create-supplier", objectMapper.writeValueAsString(supplier));
        return objectMapper.readValue(payload, Supplier.class);
    }

    public Supplier updateSupplier(int id, Supplier supplier) throws IOException {
        String payload = lambdaService.invokeLambda("update-supplier", objectMapper.writeValueAsString(supplier));
        return objectMapper.readValue(payload, Supplier.class);
    }

    public void deleteSupplier(int id) throws IOException {
        lambdaService.invokeLambda("delete-supplier", String.valueOf(id));
    }
}
