package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.CourseModalitySchedule;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CourseModalityScheduleService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public CourseModalityScheduleService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<CourseModalitySchedule> getAllCourseModalitySchedules() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-course-modality-schedules", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<CourseModalitySchedule>>() {});
    }

    public CourseModalitySchedule getCourseModalityScheduleById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-course-modality-schedule-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, CourseModalitySchedule.class);
    }

    public CourseModalitySchedule createCourseModalitySchedule(CourseModalitySchedule courseModalitySchedule) throws IOException {
        String payload = lambdaService.invokeLambda("create-course-modality-schedule", objectMapper.writeValueAsString(courseModalitySchedule));
        return objectMapper.readValue(payload, CourseModalitySchedule.class);
    }

    public CourseModalitySchedule updateCourseModalitySchedule(int id, CourseModalitySchedule courseModalitySchedule) throws IOException {
        String payload = lambdaService.invokeLambda("update-course-modality-schedule", objectMapper.writeValueAsString(courseModalitySchedule));
        return objectMapper.readValue(payload, CourseModalitySchedule.class);
    }

    public void deleteCourseModalitySchedule(int id) throws IOException {
        lambdaService.invokeLambda("delete-course-modality-schedule", String.valueOf(id));
    }
}
