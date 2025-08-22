package com.ems.ems.controller;

import com.ems.ems.model.Modality;
import com.ems.ems.service.ModalityService;
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
@RequestMapping("/modalities")
public class ModalityController {

    private final ModalityService modalityService;

    public ModalityController(ModalityService modalityService) {
        this.modalityService = modalityService;
    }

    @GetMapping
    public List<Modality> getAllModalities() throws IOException {
        return modalityService.getAllModalities();
    }

    @GetMapping("/{id}")
    public Modality getModalityById(@PathVariable int id) throws IOException {
        return modalityService.getModalityById(id);
    }

    @PostMapping
    public Modality createModality(@RequestBody Modality modality) throws IOException {
        return modalityService.createModality(modality);
    }

    @PutMapping("/{id}")
    public Modality updateModality(@PathVariable int id, @RequestBody Modality modality) throws IOException {
        return modalityService.updateModality(id, modality);
    }

    @DeleteMapping("/{id}")
    public void deleteModality(@PathVariable int id) throws IOException {
        modalityService.deleteModality(id);
    }
}
