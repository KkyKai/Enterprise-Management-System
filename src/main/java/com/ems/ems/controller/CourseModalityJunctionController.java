package com.ems.ems.controller;

import com.ems.ems.model.CourseModalityJunction;
import com.ems.ems.service.CourseModalityJunctionService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/course-modality-junctions")
public class CourseModalityJunctionController {

    private final CourseModalityJunctionService courseModalityJunctionService;

    public CourseModalityJunctionController(CourseModalityJunctionService courseModalityJunctionService) {
        this.courseModalityJunctionService = courseModalityJunctionService;
    }

    @GetMapping
    public List<CourseModalityJunction> getAllCourseModalityJunctions() throws IOException {
        return courseModalityJunctionService.getAllCourseModalityJunctions();
    }

    @GetMapping("/{courseId}/{modalityId}")
    public CourseModalityJunction getCourseModalityJunctionById(@PathVariable int courseId, @PathVariable int modalityId) throws IOException {
        return courseModalityJunctionService.getCourseModalityJunctionById(courseId, modalityId);
    }

    @PostMapping
    public CourseModalityJunction createCourseModalityJunction(@RequestBody CourseModalityJunction courseModalityJunction) throws IOException {
        return courseModalityJunctionService.createCourseModalityJunction(courseModalityJunction);
    }

    @DeleteMapping("/{courseId}/{modalityId}")
    public void deleteCourseModalityJunction(@PathVariable int courseId, @PathVariable int modalityId) throws IOException {
        courseModalityJunctionService.deleteCourseModalityJunction(courseId, modalityId);
    }
}
