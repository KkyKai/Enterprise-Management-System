package com.ems.ems.service;

import com.ems.ems.lambda.LambdaService;
import com.ems.ems.model.Course;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CourseService {

    private final LambdaService lambdaService;
    private final ObjectMapper objectMapper;

    public CourseService(LambdaService lambdaService, ObjectMapper objectMapper) {
        this.lambdaService = lambdaService;
        this.objectMapper = objectMapper;
    }

    public List<Course> getAllCourses() throws IOException {
        String payload = lambdaService.invokeLambda("get-all-courses", "{}");
        return objectMapper.readValue(payload, new TypeReference<List<Course>>() {});
    }

    public Course getCourseById(int id) throws IOException {
        String payload = lambdaService.invokeLambda("get-course-by-id", String.valueOf(id));
        return objectMapper.readValue(payload, Course.class);
    }

    public Course createCourse(Course course) throws IOException {
        String payload = lambdaService.invokeLambda("create-course", objectMapper.writeValueAsString(course));
        return objectMapper.readValue(payload, Course.class);
    }

    public Course updateCourse(int id, Course course) throws IOException {
        String payload = lambdaService.invokeLambda("update-course", objectMapper.writeValueAsString(course));
        return objectMapper.readValue(payload, Course.class);
    }

    public void deleteCourse(int id) throws IOException {
        lambdaService.invokeLambda("delete-course", String.valueOf(id));
    }
}
