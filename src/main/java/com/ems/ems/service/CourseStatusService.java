package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.CourseStatus;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CourseStatusService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public CourseStatusService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<CourseStatus> getAllCourseStatuses() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-course-statuses", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<CourseStatus>>() {});
    }

    public CourseStatus getCourseStatusById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-course-status-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, CourseStatus.class);
    }

    public CourseStatus createCourseStatus(CourseStatus courseStatus) throws IOException {
        String payload = lambdaService.invokeLambda("create-course-status", objectMapper.writeValueAsString(courseStatus));
        return objectMapper.readValue(payload, CourseStatus.class);
    }

    public CourseStatus updateCourseStatus(int id, CourseStatus courseStatus) throws IOException {
        String payload = lambdaService.invokeLambda("update-course-status", objectMapper.writeValueAsString(courseStatus));
        return objectMapper.readValue(payload, CourseStatus.class);
    }

    public void deleteCourseStatus(int id) throws IOException {
        lambdaService.invokeLambda("delete-course-status", String.valueOf(id));
    }
}
