package com.ems.ems.controller;

import com.ems.ems.model.CourseStatus;
import com.ems.ems.service.CourseStatusService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/course-statuses")
public class CourseStatusController {

    private final CourseStatusService courseStatusService;

    public CourseStatusController(CourseStatusService courseStatusService) {
        this.courseStatusService = courseStatusService;
    }

    @GetMapping
    public List<CourseStatus> getAllCourseStatuses() throws IOException {
        return courseStatusService.getAllCourseStatuses();
    }

    @GetMapping("/{id}")
    public CourseStatus getCourseStatusById(@PathVariable int id) throws IOException {
        return courseStatusService.getCourseStatusById(id);
    }

    @PostMapping
    public CourseStatus createCourseStatus(@RequestBody CourseStatus courseStatus) throws IOException {
        return courseStatusService.createCourseStatus(courseStatus);
    }

    @PutMapping("/{id}")
    public CourseStatus updateCourseStatus(@PathVariable int id, @RequestBody CourseStatus courseStatus) throws IOException {
        return courseStatusService.updateCourseStatus(id, courseStatus);
    }

    @DeleteMapping("/{id}")
    public void deleteCourseStatus(@PathVariable int id) throws IOException {
        courseStatusService.deleteCourseStatus(id);
    }
}
