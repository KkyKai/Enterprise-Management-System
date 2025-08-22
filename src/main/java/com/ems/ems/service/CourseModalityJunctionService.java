package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.CourseModalityJunction;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CourseModalityJunctionService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public CourseModalityJunctionService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<CourseModalityJunction> getAllCourseModalityJunctions() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-course-modality-junctions", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<CourseModalityJunction>>() {});
    }

    public CourseModalityJunction getCourseModalityJunctionById(int courseId, int modalityId) throws IOException {
        String payload = lambdaService.invokeLambda("get-course-modality-junction-by-id", "{\"courseId\": " + courseId + ", \"modalityId\": " + modalityId + "}");
        return objectMapper.readValue(payload, CourseModalityJunction.class);
    }

    public CourseModalityJunction createCourseModalityJunction(CourseModalityJunction courseModalityJunction) throws IOException {
        String payload = lambdaService.invokeLambda("create-course-modality-junction", objectMapper.writeValueAsString(courseModalityJunction));
        return objectMapper.readValue(payload, CourseModalityJunction.class);
    }

    public void deleteCourseModalityJunction(int courseId, int modalityId) throws IOException {
        lambdaService.invokeLambda("delete-course-modality-junction", "{\"courseId\": " + courseId + ", \"modalityId\": " + modalityId + "}");
    }
}
