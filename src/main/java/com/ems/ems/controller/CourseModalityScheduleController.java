package com.ems.ems.controller;

import com.ems.ems.model.CourseModalitySchedule;
import com.ems.ems.service.CourseModalityScheduleService;
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
@RequestMapping("/course-modality-schedules")
public class CourseModalityScheduleController {

    private final CourseModalityScheduleService courseModalityScheduleService;

    public CourseModalityScheduleController(CourseModalityScheduleService courseModalityScheduleService) {
        this.courseModalityScheduleService = courseModalityScheduleService;
    }

    @GetMapping
    public List<CourseModalitySchedule> getAllCourseModalitySchedules() throws IOException {
        return courseModalityScheduleService.getAllCourseModalitySchedules();
    }

    @GetMapping("/{id}")
    public CourseModalitySchedule getCourseModalityScheduleById(@PathVariable int id) throws IOException {
        return courseModalityScheduleService.getCourseModalityScheduleById(id);
    }

    @PostMapping
    public CourseModalitySchedule createCourseModalitySchedule(@RequestBody CourseModalitySchedule courseModalitySchedule) throws IOException {
        return courseModalityScheduleService.createCourseModalitySchedule(courseModalitySchedule);
    }

    @PutMapping("/{id}")
    public CourseModalitySchedule updateCourseModalitySchedule(@PathVariable int id, @RequestBody CourseModalitySchedule courseModalitySchedule) throws IOException {
        return courseModalityScheduleService.updateCourseModalitySchedule(id, courseModalitySchedule);
    }

    @DeleteMapping("/{id}")
    public void deleteCourseModalitySchedule(@PathVariable int id) throws IOException {
        courseModalityScheduleService.deleteCourseModalitySchedule(id);
    }
}
