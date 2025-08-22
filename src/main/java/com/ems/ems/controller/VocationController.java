package com.ems.ems.controller;

import com.ems.ems.model.Vocation;
import com.ems.ems.service.VocationService;
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
@RequestMapping("/vocations")
public class VocationController {

    private final VocationService vocationService;

    public VocationController(VocationService vocationService) {
        this.vocationService = vocationService;
    }

    @GetMapping
    public List<Vocation> getAllVocations() throws IOException {
        return vocationService.getAllVocations();
    }

    @GetMapping("/{id}")
    public Vocation getVocationById(@PathVariable int id) throws IOException {
        return vocationService.getVocationById(id);
    }

    @PostMapping
    public Vocation createVocation(@RequestBody Vocation vocation) throws IOException {
        return vocationService.createVocation(vocation);
    }

    @PutMapping("/{id}")
    public Vocation updateVocation(@PathVariable int id, @RequestBody Vocation vocation) throws IOException {
        return vocationService.updateVocation(id, vocation);
    }

    @DeleteMapping("/{id}")
    public void deleteVocation(@PathVariable int id) throws IOException {
        vocationService.deleteVocation(id);
    }
}
