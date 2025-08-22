package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.Employee;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class EmployeeService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public EmployeeService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<Employee> getAllEmployees() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-employees", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<Employee>>() {});
    }

    public Employee getEmployeeById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-employee-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, Employee.class);
    }

    public Employee createEmployee(Employee employee) throws IOException {
        String payload = lambdaService.invokeLambda("create-employee", objectMapper.writeValueAsString(employee));
        return objectMapper.readValue(payload, Employee.class);
    }

    public Employee updateEmployee(int id, Employee employee) throws IOException {
        String payload = lambdaService.invokeLambda("update-employee", objectMapper.writeValueAsString(employee));
        return objectMapper.readValue(payload, Employee.class);
    }

    public void deleteEmployee(int id) throws IOException {
        lambdaService.invokeLambda("delete-employee", String.valueOf(id));
    }
}
